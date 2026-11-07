import React from 'react';
import { Candidate } from '../types';
import {
  X,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight
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
  totalVerifiedParticipants,
  onCastVote,
  onExploreResults
}) => {
  if (!isOpen || !leader) return null;

  const percentage = totalPoolAmountNgn > 0
    ? Number(((leader.totalAmountNgn / totalPoolAmountNgn) * 100).toFixed(1))
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a0b2e]/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      
      {/* Soft violet backdrop ambient radial */}
      <div className="relative w-full max-w-lg bg-white border border-[#eadcfa] rounded-[32px] shadow-[0_20px_70px_rgba(124,58,237,0.22)] overflow-hidden my-6">
        
        {/* Soft pastel header ambient band */}
        <div className="relative bg-gradient-to-br from-[#faf4ff] via-[#f5ebff] to-[#fbf0ff] px-6 sm:px-8 pt-7 pb-6 border-b border-[#f0e4fc]">
          
          {/* Top Row: Breadcrumb & Close Button */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8b2fc9]">
              <span>National Poll</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className="text-[#6b5887]">Live Leaderboard</span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#6b5887] hover:text-[#1e1035] border border-[#eadcfa] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b2fc9] text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Current Poll Leader</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1035] tracking-tight font-heading">
              {leader.name}
            </h2>
            <p className="text-xs text-[#6b5887] font-medium">
              Leading the 2027 Nationwide Pre-Election Presidential Standings
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Candidate Profile Spotlight Card */}
          <div className="p-5 rounded-[24px] bg-[#fdfbfe] border border-[#eadcfa] flex items-center gap-4.5 shadow-xs">
            <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-[20px] overflow-hidden shrink-0 border-2 border-white shadow-md bg-[#faf4ff]">
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

              <h3 className="text-base font-bold text-[#1e1035] font-heading leading-tight truncate">
                {leader.name}
              </h3>

              <p className="text-[11px] text-[#6b5887] truncate">
                Running Mate: <strong className="text-[#1e1035]">{leader.runningMate}</strong>
              </p>

              <div className="text-[11px] text-[#8b2fc9] font-bold font-mono">
                #{1} Nationwide by Total ₦ Contributed
              </div>
            </div>
          </div>

          {/* Progress / Goal Bar Card (Styled like Screenshot's Campaign Progress Card) */}
          <div className="p-5 rounded-[24px] bg-gradient-to-b from-[#faf5ff] to-[#fbf8fe] border border-[#eadcfa] space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1e1035] font-heading flex items-center gap-1.5">
                <span>National Financial Lead</span>
                <span className="px-2 py-0.5 rounded-full bg-[#8b2fc9]/10 text-[#8b2fc9] text-[10px] font-mono font-bold">
                  Active
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

            <div className="flex items-center justify-between text-[11px] text-[#6b5887] pt-1">
              <span>Candidate Pool: <strong className="text-[#1e1035] font-mono">₦{(leader.totalAmountNgn / 1000000).toFixed(1)}M</strong></span>
              <span>National Pool: <strong className="text-[#1e1035] font-mono">₦{(totalPoolAmountNgn / 1000000).toFixed(1)}M</strong></span>
            </div>
          </div>

          {/* 2-Metric Split Cards matching Screenshot (9 Million / 1 Million with 3D Heart & Crown) */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-[22px] bg-white border border-[#eadcfa] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#1e1035] font-mono block">
                  ₦{(leader.totalAmountNgn / 1000000).toFixed(1)}M
                </span>
                <span className="text-[11px] text-[#6b5887] font-semibold block mt-0.5">
                  Financial Support
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8b2fc9] to-[#d946ef] flex items-center justify-center text-white text-base shadow-sm shrink-0">
                💜
              </div>
            </div>

            <div className="p-4 rounded-[22px] bg-white border border-[#eadcfa] flex items-center justify-between shadow-2xs">
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#1e1035] font-mono block">
                  {leader.votes.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#6b5887] font-semibold block mt-0.5">
                  Verified Citizens
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] flex items-center justify-center text-white text-base shadow-sm shrink-0">
                👑
              </div>
            </div>
          </div>

          {/* Statutory Win Explanation */}
          <p className="text-[11px] text-[#6b5887] text-center leading-relaxed">
            In Nigeria Decides 2027, the winner is calculated based on cumulative citizen financial backing (min ₦1,000). 30% of proceeds support verified Nigerian orphanages.
          </p>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* Gradient Primary Button matching Screenshot */}
            <button
              onClick={() => {
                onClose();
                onCastVote();
              }}
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_8px_25px_rgba(162,56,245,0.35)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer font-heading"
            >
              <span>Back a Candidate (From ₦1,000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Clear Close Button */}
            <button
              onClick={onClose}
              className="w-full py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-[#6b5887] hover:text-[#1e1035] font-bold text-xs transition-colors cursor-pointer text-center"
            >
              Close Announcement
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
