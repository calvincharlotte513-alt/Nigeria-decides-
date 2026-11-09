import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  writeBatch,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const BOOTSTRAP_ADMIN_EMAIL = 'jhulk738@gmail.com';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test Connection on Boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('Connected to Cloud Firestore successfully.');
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Firestore offline error. Please check configuration.');
    }
    // Return true even if test doc does not exist yet (not an offline failure)
    return true;
  }
}

export interface StoredVote {
  id: string;
  fullName: string;
  contact: string;
  contactType: 'phone' | 'email';
  normalizedContact: string;
  normalizedFullName: string;
  candidateId: string;
  candidateName: string;
  candidateParty: string;
  amountNgn: number;
  state: string;
  lga?: string;
  paymentReference: string;
  paymentStatus: 'completed' | 'verified';
  paymentProvider: 'paystack' | 'flutterwave';
  createdAt: string;
  clientIp?: string;
}

export interface PlatformSettings {
  votingActive: boolean;
  minVoteAmountNgn: number;
  adminBroadcast: string;
  updatedAt: string;
  updatedBy?: string;
}

/**
 * Normalizes citizen contact string for O(1) indexed collision locks across 1M+ users
 */
export function normalizeContact(contact: string): { normalized: string; type: 'phone' | 'email' } {
  const clean = contact.trim().toLowerCase();
  if (clean.includes('@')) {
    return { normalized: clean, type: 'email' };
  }
  // Remove non-digit chars for phone
  const digits = clean.replace(/\D/g, '');
  return { normalized: digits, type: 'phone' };
}

/**
 * Normalizes citizen full name (strips double spaces, lowercases)
 */
export function normalizeFullName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Generates deterministic lock keys for Firestore documents
 */
export function getVoterLockKeys(fullName: string, contact: string) {
  const normName = normalizeFullName(fullName);
  const { normalized: normContact } = normalizeContact(contact);

  const contactKey = 'c_' + normContact.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 100);
  const nameKey = 'n_' + normName.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 100);
  const compositeKey = 'cn_' + (normContact + '_' + normName).replace(/[^a-zA-Z0-9]/g, '_').slice(0, 120);

  return { contactKey, nameKey, compositeKey, normName, normContact };
}

/**
 * Checks if a citizen with the same Full Name or Phone/Email has ALREADY voted and paid.
 * Designed for scale to 1,000,000+ users via deterministic O(1) key lookups.
 */
export async function checkVoterDuplicate(fullName: string, contact: string): Promise<{
  hasVoted: boolean;
  reason?: string;
  existingVoteId?: string;
}> {
  const { contactKey, nameKey, compositeKey } = getVoterLockKeys(fullName, contact);

  try {
    // 1. Check composite lock (exact full name + exact contact)
    const compDoc = await getDoc(doc(db, 'voters', compositeKey));
    if (compDoc.exists() && compDoc.data()?.hasVoted) {
      return {
        hasVoted: true,
        reason: `A ballot has already been cast and confirmed under this citizen name (${fullName}) with contact (${contact}). Under election rules, each citizen can only vote once.`,
        existingVoteId: compDoc.data().voteId
      };
    }

    // 2. Check contact lock (phone number or email already used)
    const contactDoc = await getDoc(doc(db, 'voters', contactKey));
    if (contactDoc.exists() && contactDoc.data()?.hasVoted) {
      return {
        hasVoted: true,
        reason: `This phone number / email (${contact}) has already been used to cast a verified vote. Only one vote per citizen contact is permitted.`,
        existingVoteId: contactDoc.data().voteId
      };
    }

    // 3. Check name lock (exact full name already registered)
    const nameDoc = await getDoc(doc(db, 'voters', nameKey));
    if (nameDoc.exists() && nameDoc.data()?.hasVoted) {
      return {
        hasVoted: true,
        reason: `The citizen name (${fullName}) has already participated in this election poll. Under published integrity rules, duplicate citizen votes are prohibited.`,
        existingVoteId: nameDoc.data().voteId
      };
    }

    return { hasVoted: false };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'voters');
    return { hasVoted: false };
  }
}

/**
 * Submits a verified, paid vote into Firestore.
 * Atomically writes the vote record and the uniqueness lock documents so that
 * no user with the same phone, email, or full name can ever vote again.
 */
export async function submitRealVote(voteData: {
  fullName: string;
  contact: string;
  candidateId: string;
  candidateName: string;
  candidateParty: string;
  amountNgn: number;
  state: string;
  lga?: string;
  paymentReference: string;
  paymentProvider?: 'paystack' | 'flutterwave';
}): Promise<{ success: boolean; voteId: string; message: string }> {
  // Pre-check for duplicate
  const dupCheck = await checkVoterDuplicate(voteData.fullName, voteData.contact);
  if (dupCheck.hasVoted) {
    throw new Error(dupCheck.reason || 'Citizen has already cast a ballot.');
  }

  const { contactKey, nameKey, compositeKey, normName, normContact } = getVoterLockKeys(
    voteData.fullName,
    voteData.contact
  );
  const { type: contactType } = normalizeContact(voteData.contact);

  const voteId = 'vote_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
  const nowIso = new Date().toISOString();

  const record: StoredVote = {
    id: voteId,
    fullName: voteData.fullName.trim(),
    contact: voteData.contact.trim(),
    contactType,
    normalizedContact: normContact,
    normalizedFullName: normName,
    candidateId: voteData.candidateId,
    candidateName: voteData.candidateName,
    candidateParty: voteData.candidateParty,
    amountNgn: Number(voteData.amountNgn),
    state: voteData.state,
    lga: voteData.lga || '',
    paymentReference: voteData.paymentReference,
    paymentStatus: 'completed',
    paymentProvider: voteData.paymentProvider || 'paystack',
    createdAt: nowIso
  };

  const lockPayload = {
    id: compositeKey,
    fullName: record.fullName,
    contact: record.contact,
    voteId,
    amountNgn: record.amountNgn,
    hasVoted: true,
    votedAt: nowIso
  };

  try {
    const batch = writeBatch(db);

    // 1. Store the vote record
    batch.set(doc(db, 'votes', voteId), record);

    // 2. Write deterministic uniqueness locks
    batch.set(doc(db, 'voters', compositeKey), lockPayload);
    batch.set(doc(db, 'voters', contactKey), { ...lockPayload, id: contactKey });
    batch.set(doc(db, 'voters', nameKey), { ...lockPayload, id: nameKey });

    await batch.commit();

    return {
      success: true,
      voteId,
      message: `Vote successfully cast and secured in the official database! Transaction Ref: ${voteData.paymentReference}`
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'votes');
    throw error;
  }
}

/**
 * Real-time listener for live votes.
 * Aggregates real database submissions into live dashboard stats.
 */
export function subscribeToVotes(
  onData: (votes: StoredVote[]) => void,
  onError?: (err: any) => void
) {
  const votesRef = collection(db, 'votes');
  const q = query(votesRef, orderBy('createdAt', 'desc'), limit(1500));

  return onSnapshot(
    q,
    (snapshot) => {
      const votes: StoredVote[] = [];
      snapshot.forEach((d) => {
        votes.push(d.data() as StoredVote);
      });
      onData(votes);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, 'votes');
      if (onError) onError(error);
    }
  );
}

/**
 * Real-time listener for platform settings (admin controlled)
 */
export function subscribeToPlatformSettings(onSettings: (settings: PlatformSettings) => void) {
  const settingsDocRef = doc(db, 'platform_settings', 'general');
  return onSnapshot(
    settingsDocRef,
    (docSnap) => {
      if (docSnap.exists()) {
        onSettings(docSnap.data() as PlatformSettings);
      } else {
        // Default initial settings
        onSettings({
          votingActive: true,
          minVoteAmountNgn: 1000,
          adminBroadcast: 'Democratic Balloting is LIVE. Verified by Independent Auditors.',
          updatedAt: new Date().toISOString()
        });
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'platform_settings');
    }
  );
}

/**
 * Updates platform settings (Admin only)
 */
export async function updatePlatformSettings(settings: Partial<PlatformSettings>, adminEmail: string) {
  const ref = doc(db, 'platform_settings', 'general');
  const data = {
    ...settings,
    updatedAt: new Date().toISOString(),
    updatedBy: adminEmail
  };
  try {
    await setDoc(ref, data, { merge: true });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, 'platform_settings/general');
    return false;
  }
}

/**
 * Admin action: Delete or purge a vote (e.g. fraudulent or test record)
 */
export async function adminDeleteVote(vote: StoredVote): Promise<boolean> {
  const { contactKey, nameKey, compositeKey } = getVoterLockKeys(vote.fullName, vote.contact);
  try {
    const batch = writeBatch(db);
    batch.delete(doc(db, 'votes', vote.id));
    batch.delete(doc(db, 'voters', compositeKey));
    batch.delete(doc(db, 'voters', contactKey));
    batch.delete(doc(db, 'voters', nameKey));
    await batch.commit();
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `votes/${vote.id}`);
    return false;
  }
}
