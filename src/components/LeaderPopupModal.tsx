import React from 'react';
import { Candidate } from '../types';
import {
  X,
  ArrowRight,
  TrendingUp,
  Crown,
  Heart,
  Gamepad2,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface LeaderPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  leader: Candidate | null;
  totalPoolAmountNgn: number;
  totalVerifiedParticipants: number;
  onCastVote: () => void;
  onExploreResults: () => void;
}

export const LeaderPopupModal: React.FC<LeaderPopupModalProps> = ({
  isOpen,
  onClose,
  leader,
  totalPoolAmountNgn,
  totalVerifiedParticipants: _totalVerifiedParticipants,
  onCastVote,
  onExploreResults
}) => {
  if (!isOpen || !leader) return null;

  const percentage = totalPoolAmountNgn > 0
    ? Number(((leader.totalAmountNgn / totalPoolAmountNgn) * 100).toFixed(1))
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1a0b2e]/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      
      {/* Modal Dialog with World-Class Aesthetics */}
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-[#eadcfa] rounded-[32px] shadow-[0_24px_80px_rgba(139,47,201,0.28)] overflow-hidden my-6">
        
        {/* Playful Cheerful Header Banner */}
        <div className="relative bg-gradient-to-br from-amber-50 via-purple-50 to-pink-50 px-6 sm:px-8 pt-7 pb-6 border-b border-[#f0e4fc]">
          
          {/* Top Row: Breadcrumb & Close Button */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-amber-200/80 text-xs font-bold text-amber-900 shadow-2xs">
              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>THE 2027 CIVIC GAME</span>
              <ChevronRight className="w-3 h-3 opacity-50" />
              <span className="text-[#8b2fc9]">Live Crowd Leader</span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#6b5887] hover:text-[#1e1035] border border-[#eadcfa] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-[#8b2fc9] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>CROWD FAVORITE ON THE BOARD</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1035] tracking-tight font-heading flex items-center gap-2">
              <span>{leader.name}</span>
              <span className="text-amber-500 text-xl">👑</span>
            </h2>
            <p className="text-xs text-[#6b5887] font-medium">
              Leading the independent 2027 nationwide pre-election choice standings!
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Candidate Spotlight Card */}
          <div className="p-4 sm:p-5 rounded-[24px] bg-[#fdfbfe] border border-[#eadcfa] flex items-center gap-4 shadow-xs">
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-[20px] overflow-hidden shrink-0 border-2 border-white shadow-md bg-purple-50">
              <img
                src={leader.photoUrl}
                alt={leader.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute bottom-0 inset-x-0 h-2"
                style={{ backgroundColor: leader.partyColor }}
              />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="text-[10px] uppercase font-mono font-black px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${leader.partyColor}15`,
                    borderColor: `${leader.partyColor}40`,
                    color: leader.partyColor
                  }}
                >
                  {leader.partyAcronym}
                </span>
                <span className="text-[11px] text-[#8c7da3] font-medium">
                  Age {leader.age}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-[#1e1035] font-heading leading-tight truncate">
                {leader.name}
              </h3>

              <p className="text-[11px] text-[#6b5887] truncate">
                Running Mate: <strong className="text-[#1e1035]">{leader.runningMate}</strong>
              </p>

              <div className="text-[11px] text-[#8b2fc9] font-bold font-mono">
                #1 On National Board by Total ₦ Backed
              </div>
            </div>
          </div>

          {/* Progress / Share Bar */}
          <div className="p-4 sm:p-5 rounded-[24px] bg-gradient-to-b from-[#faf5ff] to-[#fbf8fe] border border-[#eadcfa] space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1e1035] font-heading flex items-center gap-1.5">
                <span>National Crowd Share</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  Active Leader
                </span>
              </span>
              <span className="font-mono font-black text-[#8b2fc9] text-sm">
                {percentage}% Share
              </span>
            </div>

            {/* Rounded Pill Progress Bar */}
            <div className="w-full h-3 bg-[#eadcfa]/60 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a855f7] to-[#e040fb] transition-all duration-700 shadow-xs"
                style={{ width: `${Math.min(percentage * 2, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#6b5887] pt-0.5">
              <span>Candidate Pool: <strong className="text-[#1e1035] font-mono">₦{(leader.totalAmountNgn / 1000000).toFixed(1)}M</strong></span>
              <span>Total Game Pool: <strong className="text-[#1e1035] font-mono">₦{(totalPoolAmountNgn / 1000000).toFixed(1)}M</strong></span>
            </div>
          </div>

          {/* 2-Metric Split Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-[20px] bg-white border border-[#eadcfa] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xl font-black text-[#1e1035] font-mono block">
                  ₦{(leader.totalAmountNgn / 1000000).toFixed(1)}M
                </span>
                <span className="text-[10px] text-[#6b5887] font-semibold block">
                  Total ₦ Backing
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8b2fc9] to-[#d946ef] flex items-center justify-center text-white text-sm shadow-sm shrink-0">
                💜
              </div>
            </div>

            <div className="p-3.5 rounded-[20px] bg-white border border-[#eadcfa] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xl font-black text-[#1e1035] font-mono block">
                  {leader.votes.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#6b5887] font-semibold block">
                  Verified Citizens
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-white text-sm shadow-sm shrink-0">
                👑
              </div>
            </div>
          </div>

          {/* Disclaimer & Purpose Note */}
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed text-center">
            <strong>Civic Note:</strong> This is a fun community decision game to help Nigerians decide before the main election. <strong>Not owned by Nigerian government or INEC.</strong> 100% of proceeds fund registered Nigerian charities and NGOs.
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onCastVote();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-[0_8px_25px_rgba(162,56,245,0.35)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer font-heading"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Back a Candidate (From ₦1,000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onExploreResults();
                }}
                className="flex-1 py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 text-[#1e1035] font-bold text-xs border border-[#eadcfa] transition-colors cursor-pointer text-center shadow-2xs"
              >
                View Full Standings 🏆
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#6b5887] hover:text-[#1e1035] font-bold text-xs transition-colors cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
