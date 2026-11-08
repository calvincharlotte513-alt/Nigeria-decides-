import React, { useState } from 'react';
import { Scale, X, ShieldCheck, Heart, Gamepad2, CheckCircle2, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1e1035]/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f0e4fc]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#f5ecff] flex items-center justify-center text-[#8b2fc9] text-xl">
              🎮
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1e1035] font-heading flex items-center gap-1.5">
                <span>Nigeria Decides 2027 Game Rules & Notice</span>
              </h3>
              <p className="text-xs text-[#6b5887]">
                Independent community simulation · 100% of proceeds to Charity & NGOs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#6b5887] hover:text-[#1e1035] rounded-full hover:bg-[#faf5ff] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-[#f0e4fc] text-xs overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'disclaimer' ? 'text-[#8b2fc9] border-b-2 border-[#8b2fc9]' : 'text-[#6b5887] hover:text-[#1e1035]'
            }`}
          >
            Not Owned by Govt or INEC Notice
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'methodology' ? 'text-[#8b2fc9] border-b-2 border-[#8b2fc9]' : 'text-[#6b5887] hover:text-[#1e1035]'
            }`}
          >
            How the Game Works
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'privacy' ? 'text-[#8b2fc9] border-b-2 border-[#8b2fc9]' : 'text-[#6b5887] hover:text-[#1e1035]'
            }`}
          >
            Voter Privacy & Hashing
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-2 px-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'terms' ? 'text-[#8b2fc9] border-b-2 border-[#8b2fc9]' : 'text-[#6b5887] hover:text-[#1e1035]'
            }`}
          >
            100% Charity Commitment
          </button>
        </div>

        {/* Tab Content */}
        <div className="text-xs text-[#6b5887] leading-relaxed space-y-4">
          {activeTab === 'disclaimer' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 font-medium space-y-1">
                <span className="font-extrabold text-[#1e1035] block text-sm">
                  ⚠️ Clear Independence Declaration
                </span>
                <p>
                  Nigeria Decides 2027 is <strong>not owned by federal government or INEC but owned by Democratic Nigerians</strong>.
                </p>
              </div>
              <p>
                1. <strong>A Simple Civic Game:</strong> This platform is only a simple, fun community game to help Nigerians express their choice of candidate before the main election takes place. It does not replace or conduct official constitutional election balloting.
              </p>
              <p>
                2. <strong>Equal Candidacy:</strong> All registered presidential candidates are presented neutrally and equally. There is zero partisan affiliation or official government endorsement.
              </p>
              <p>
                3. <strong>Charity First:</strong> 100% of all financial proceeds contributed through this game go directly to vetted, registered Nigerian orphanages, motherless babies' homes, and youth empowerment NGOs under public audit.
              </p>
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="space-y-3">
              <p>
                1. <strong>Backing & Board Standings:</strong> In this decision game, participants back their candidate starting from ₦1,000. Standings on the national board and state leaderboards are ranked by the total volume of financial backing contributed by citizens.
              </p>
              <p>
                2. <strong>One Verified Citizen, One Ballot:</strong> Participants authenticate via one-time SMS or Email OTP. Once verified, each contact is hashed with SHA-256 to ensure genuine deduplication without bots.
              </p>
              <p>
                3. <strong>Anonymous Cryptographic Receipt:</strong> You receive an instant verification reference code (e.g. NG27-LAG-8492-B7F1). Your candidate choice remains secret while letting you verify your participation anytime in the dashboard.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <p>
                1. <strong>Strict Data Privacy:</strong> Your phone number or email is one-way hashed using SHA-256 with cryptographic salt. Plaintext contact data is never stored, sold, or shared with political candidates or third parties.
              </p>
              <p>
                2. <strong>Ballot Secrecy:</strong> Your specific candidate choice is strictly confidential to protect your privacy and democratic freedom of expression.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 text-[#1e1035] space-y-1">
                <span className="font-extrabold text-[#8b2fc9] block flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                  <span>100% NGO & Charity Allocation Guarantee</span>
                </span>
                <p className="text-[#55456e]">
                  Every single Naira raised through this game is channeled directly into verified Nigerian charitable organizations, orphanages, and grassroots youth NGOs.
                </p>
              </div>
              <p>
                Disbursements are tracked with full public audit trails, CAC registration numbers, and downloadable CSV ledgers so every citizen can inspect the real-world impact.
              </p>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#f0e4fc] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider cursor-pointer font-heading"
          >
            Got it, Let's Play!
          </button>
        </div>

      </div>
    </div>
  );
};
