export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyAcronym: string;
  partyColor: string;
  age: number;
  runningMate: string;
  photoUrl: string;
  biography: string;
  experience: string[];
  manifestoPillars: { title: string; description: string }[];
  officialWebsite?: string;
  verifiedStatus: boolean;
  votes: number;
  totalAmountNgn: number;
  percentage?: number;
}

export interface StatePollData {
  stateCode: string;
  stateName: string;
  zone: 'North Central' | 'North East' | 'North West' | 'South East' | 'South South' | 'South West';
  participants: number;
  totalAmountNgn: number;
  candidateVotes: Record<string, number>;
  candidateAmounts: Record<string, number>;
  leadingCandidateId: string;
  topCivicIssue: string;
  leadingCandidateName?: string;
  leadingCandidateParty?: string;
  leadingCandidateColor?: string;
}

export interface PollStats {
  totalVerifiedParticipants: number;
  totalStatesParticipating: number;
  totalCandidates: number;
  totalPoolAmountNgn: number;
  currentPollLeader?: Candidate | null;
  totalCharityProceedsNgn: number;
  totalCharityDistributedNgn: number;
  undistributedFundsNgn: number;
  lastUpdated: string;
  electionTargetDate: string;
  isOfficialElection: boolean;
  disclaimer: string;
}

export interface CharityBeneficiary {
  id: string;
  name: string;
  category: 'Orphanage' | 'Motherless Babies Home' | 'Civic Education NGO' | 'Youth Empowerment';
  location: string;
  state: string;
  cacNumber: string;
  verifiedDate: string;
  verificationBadge: boolean;
  mission: string;
  currentProject: string;
  beneficiariesCount: number;
  allocatedAmountNgn: number;
  disbursedAmountNgn: number;
  lastDisbursementDate: string;
  proofDocumentUrl: string;
}

export interface AuditLog {
  id: string;
  action: string;
  actor: string;
  role: string;
  details: string;
  timestamp: string;
  signature: string;
}

export interface VoterReceipt {
  found: boolean;
  referenceCode: string;
  stateName: string;
  maskedIdentifier: string;
  timestamp: string;
  verificationMethod: string;
  donationAmount: number;
  paymentProvider?: string;
  status: string;
  notice: string;
}

export type SupportedLanguage = 'en' | 'yo' | 'ha' | 'ig' | 'pcm';
