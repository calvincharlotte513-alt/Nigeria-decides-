import React, { useState } from 'react';
import { Scale, X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'disclaimer' | 'methodology' | 'privacy' | 'terms';
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'disclaimer'
}) => {
  const [activeTab, setActiveTab] = useState<'disclaimer' | 'methodology' | 'privacy' | 'terms'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Legal Framework, Trust & Methodology
              </h3>
              <p className="text-xs text-slate-500">
                Operating rules, independence declaration, and civic privacy standards
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 text-xs overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'disclaimer' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            INEC Independence Disclaimer
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'methodology' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Audited Methodology
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'privacy' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            NDPR Privacy Standard
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'terms' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Terms of Participation
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-xs text-slate-700 leading-relaxed space-y-4">
          {activeTab === 'disclaimer' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 font-semibold">
                This platform is an independent public opinion research instrument and NOT an official election platform.
              </div>
              <p>
                1. <strong>Statutory Independence:</strong> Nigeria Decides 2027 is operated independently by civic technologists and social research professionals. It is not owned, endorsed, supervised, or affiliated with the Independent National Electoral Commission (INEC) of Nigeria.
              </p>
              <p>
                2. <strong>Opinion vs. Official Elections:</strong> Ballots cast here constitute an expression of verified citizen sentiment and financial backing ahead of 2027. Under no circumstances do these results supersede or substitute constitutional ballots cast in INEC general elections.
              </p>
              <p>
                3. <strong>Strict Neutrality:</strong> All registered candidates appear with equal prominence, alphabetical or uniform presentation, and without algorithmic bias or political endorsements.
              </p>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="space-y-3">
              <p>
                1. <strong>Financial-Backing Win Determination:</strong> In Nigeria Decides 2027, candidate standings and victory are calculated based on the cumulative financial volume (₦) contributed by verified citizens. The minimum contribution is ₦1,000 per ballot.
              </p>
              <p>
                2. <strong>One Citizen, One Verified Ballot:</strong> Each citizen verifies their identity through SMS or Email OTP. Once verified, subsequent attempts to cast a duplicate ballot from that identifier are rejected by cryptographic hash.
              </p>
              <p>
                3. <strong>Tamper-Proof Receipt:</strong> Upon ballot completion, the participant receives a cryptographic reference code (e.g. NG27-LAG-8492-B7F1) enabling independent verification in the public ledger without disclosing their candidate choice.
              </p>
              <p>
                4. <strong>30% Charitable Stewardship:</strong> 30% of all contribution proceeds are held in escrow and disbursed directly to CAC-registered orphanages, motherless babies homes, and youth organizations.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <p>
                1. <strong>Nigeria Data Protection Regulation (NDPR) Compliance:</strong> We adhere strictly to NDPR mandates. No personal identification data (phone, email) is stored in plaintext.
              </p>
              <p>
                2. <strong>One-Way Hashing:</strong> Identifiers are hashed using SHA-256 with cryptographic salt. We do not sell, rent, or share voter data with political campaigns or third parties.
              </p>
              <p>
                3. <strong>Data Minimization:</strong> We only collect information strictly required to prevent automated bot manipulation and enforce deduplication.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3">
              <p>
                1. <strong>Eligibility:</strong> Open to Nigerian citizens of voting age (18 years and older).
              </p>
              <p>
                2. <strong>Anti-Manipulation:</strong> The platform employs rate-limiting, IP deduplication, and anomaly detection. Automated scripts, bots, or fraudulent transactions are permanently purged from the tally.
              </p>
              <p>
                3. <strong>Transparency:</strong> All charitable disbursements are publicly auditable and verified by Apex Africa Assurance LLP.
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>
    </div>
  );
};
