import React from 'react';
import { Candidate } from '../types';
import { INITIAL_CANDIDATES } from '../data/initialData';
import {
  Vote,
  ShieldCheck,
  TrendingUp,
  Award,
  Crown,
  Heart,
  ChevronRight,
  Sparkles,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

interface AspirantsShowcaseProps {
  candidates: Candidate[];
  totalPoolAmountNgn: number;
  onVoteCandidate: (candidateId: string) => void;
}

// Fixed sequence starting explicitly from Tinubu and following all 18 candidates requested
const PRIORITY_ORDER = [
  'tinubu-bola',       // 1. Bola Ahmed Tinubu (APC - Kashim Shettima)
  'atiku-abubakar',    // 2. Atiku Abubakar (ADC - Rotimi Amaechi)
  'obi-peter',         // 3. Peter Obi (NDC - Rabiu Kwankwaso)
  'okereke-sunday',    // 4. Sunday Chibuzo Okereke (LP - Hajja Bintu Konto)
  'onor-sandy',        // 5. Sandy Ojang Onor (PDP - Umaru Babangida)
  'omoaje-rufai',      // 6. Rufai Adekunle Omo-Aje (AA - Shehu Hussaini)
  'aliyu-abbas',       // 7. Abbas-Bin Aliyu (ADP - Ike Chinazam)
  'kabiru-yusuf',      // 8. Yusuf Kabiru (APP - Peace Egobia)
  'sowore-omoyele',    // 9. Omoyele Sowore (AAC - Haruna Garba Magashi)
  'makinde-seyi',      // 10. Oluseyi Abiodun Makinde (APM - Musa Lawal Daura)
  'adenuga-sunday',    // 11. Sunday Adenuga (BP - Usman Turaki Mustapha)
  'adebisi-moses',     // 12. Moses Olusoji Adebisi (DLA - Nafisat Usaku Abubakar)
  'okwori-ada',        // 13. Ada Elizabeth Fredrick Okwori (NDP - Uchenna Anthony Chukwuemeka)
  'okereke-nkem',      // 14. Nkem Esther Okereke (NRM - Nasir Muhammed Sulaiman)
  'duke-donald',       // 15. Donald Duke (PRP - Kabiru Rabiu)
  'adebayo-adewole',   // 16. Adewole Ebenezer Adebayo (SDP - Usman Muhammed Bugaje)
  'agada-peter',       // 17. Peter Ada Agada (YPP - Patience Ndidi Key)
  'nwanyanwu-daniel'   // 18. Daniel Daberechukwu Nwanyanwu (ZLP - Hassan Khalid)
];

export const AspirantsShowcase: React.FC<AspirantsShowcaseProps> = ({
  candidates,
  totalPoolAmountNgn,
  onVoteCandidate
}) => {
  // Always ensure all 18 candidates are available even on Vercel static deployments
  const activeCandidates = candidates && candidates.length > 0 ? candidates : INITIAL_CANDIDATES;

  // Sort candidates so Asiwaju Bola Ahmed Tinubu is first, followed by all 18 aspirants
  const orderedCandidates = [...activeCandidates].sort((a, b) => {
    const idxA = PRIORITY_ORDER.indexOf(a.id);
    const idxB = PRIORITY_ORDER.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return b.totalAmountNgn - a.totalAmountNgn;
  });

  // Identify who currently leads nationwide based on total ₦ raised
  const currentOverallLeader = [...activeCandidates].sort((a, b) => b.totalAmountNgn - a.totalAmountNgn)[0];

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white/95 via-[#faf5ff]/80 to-white/90 border-b border-[#ebdffa]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 via-purple-50 to-amber-50 border border-[#eadcfa] text-[11px] font-mono font-bold tracking-wider uppercase text-[#1e1035] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#8b2fc9]" />
            <span>2027 NIGERIAN PRESIDENTIAL RACE · STANDINGS POWERED BY ₦ BACKING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e1035] tracking-tight font-heading">
            2027 Presidential Aspirants
          </h2>

          <p className="text-sm sm:text-base text-[#55456e] leading-relaxed">
            Standings and winner are determined by <strong>total financial backing (₦)</strong> raised by citizens nationwide. 
            <strong> 100% of proceeds are donated to registered Nigerian charities, motherless babies' homes, and orphanages.</strong> 
            Vote directly for your candidate below starting from <strong>₦1,000</strong>!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs text-[#6b5887] font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#eadcfa] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Aspirants
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#eadcfa] shadow-2xs">
              <TrendingUp className="w-3.5 h-3.5 text-[#0284c7]" />
              Ranked by Total Backing (₦)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#eadcfa] shadow-2xs">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              100% Charity Proceeds
            </span>
          </div>
        </div>

        {/* Aspirants Grid: Big Images, Current Party, Current Vice President, and Direct Vote */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orderedCandidates.map((candidate, index) => {
            const isOverallLeader = currentOverallLeader && currentOverallLeader.id === candidate.id;
            const percentage = totalPoolAmountNgn > 0
              ? ((candidate.totalAmountNgn / totalPoolAmountNgn) * 100).toFixed(1)
              : '0.0';

            return (
              <div
                key={candidate.id}
                className={`group relative rounded-[32px] bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isOverallLeader
                    ? 'border-[#f59e0b] shadow-[0_16px_50px_rgba(245,158,11,0.18)] ring-2 ring-[#f59e0b]/40'
                    : 'border-[#eadcfa] hover:border-[#8b2fc9] shadow-[0_12px_36px_rgba(162,56,245,0.08)] hover:shadow-[0_20px_50px_rgba(162,56,245,0.16)]'
                }`}
              >
                {/* Party Color Accent Top Stripe */}
                <div
                  className="h-2 w-full transition-all duration-300"
                  style={{ backgroundColor: candidate.partyColor }}
                />

                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-6">
                  
                  {/* Card Header & Big Candidate Portrait */}
                  <div className="space-y-4">
                    
                    {/* Header Badges: Ballot sequence & Leader badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#faf5ff] border border-[#eadcfa] text-[11px] font-mono font-black text-[#581c87]">
                        <span>ASPIRANT #{index + 1}</span>
                      </span>

                      {isOverallLeader ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[11px] font-bold text-amber-900 shadow-2xs animate-pulse">
                          <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>LEADER BY ₦ BACKING</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    {/* BIG CANDIDATE IMAGE */}
                    <div className="relative w-full h-72 sm:h-80 rounded-[24px] overflow-hidden bg-[#faf5ff] border border-[#eadcfa] shadow-sm">
                      <img
                        src={candidate.photoUrl}
                        alt={candidate.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        referrerPolicy="no-referrer"
                      />

                      {/* Subtle Bottom Image Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Overlay Party Acronym Ribbon */}
                      <div className="absolute top-3 right-3">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-mono font-black text-white shadow-md border border-white/30 backdrop-blur-md"
                          style={{ backgroundColor: candidate.partyColor }}
                        >
                          {candidate.partyAcronym}
                        </span>
                      </div>

                      {/* Overlay Candidate Name on bottom of image for instant recognition */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs uppercase font-mono font-bold tracking-wider text-amber-300 drop-shadow-sm">
                          {candidate.party}
                        </p>
                        <h3 className="text-xl font-black font-heading tracking-tight drop-shadow-md">
                          {candidate.name}
                        </h3>
                      </div>
                    </div>

                    {/* Aspirant Key Credentials: Party & Vice President */}
                    <div className="space-y-2.5 pt-1">
                      
                      {/* Current Party */}
                      <div className="flex items-start gap-2 text-xs">
                        <span className="font-bold text-[#8c7da3] shrink-0 uppercase tracking-wider text-[10px] pt-0.5">
                          Party:
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className="font-black px-2 py-0.5 rounded text-[11px] text-white"
                            style={{ backgroundColor: candidate.partyColor }}
                          >
                            {candidate.partyAcronym}
                          </span>
                          <span className="font-bold text-[#1e1035]">
                            {candidate.party}
                          </span>
                        </div>
                      </div>

                      {/* Current Vice President / Running Mate */}
                      <div className="p-3 rounded-2xl bg-[#faf5ff] border border-[#eadcfa] flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                          <UserCheck className="w-3.5 h-3.5 text-[#8b2fc9]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase font-mono font-bold text-[#7a6496] tracking-wider">
                            {candidate.id === 'tinubu-bola'
                              ? 'Current Vice President of Nigeria'
                              : 'Vice President'}
                          </p>
                          <p className="text-xs font-black text-[#1e1035] leading-snug">
                            {candidate.runningMate}
                          </p>
                        </div>
                      </div>

                    </div>

                    {/* Financial Backing & Polling Metric */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-purple-50/40 to-white border border-[#eadcfa] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#6b5887]">Total Backing Raised:</span>
                        <span className="text-base font-black text-[#1e1035] font-mono">
                          ₦{candidate.totalAmountNgn.toLocaleString()}
                        </span>
                      </div>

                      {/* Progress Bar of Pool */}
                      <div className="w-full bg-[#eadcfa]/70 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${Math.max(5, Number(percentage))}%`,
                            backgroundColor: candidate.partyColor
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#7a6496]">
                        <span>{percentage}% of national pool</span>
                        <span>{candidate.votes.toLocaleString()} verified votes</span>
                      </div>
                    </div>

                  </div>

                  {/* DIRECT VOTING ACTION BUTTON UNDER ASPIRANT */}
                  <div className="pt-2">
                    <button
                      onClick={() => onVoteCandidate(candidate.id)}
                      className="w-full py-4 px-6 rounded-full font-black text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-[0_8px_25px_rgba(162,56,245,0.25)] hover:shadow-[0_12px_32px_rgba(162,56,245,0.4)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer text-white group-hover:opacity-100 font-heading"
                      style={{
                        background: `linear-gradient(135deg, ${candidate.partyColor}, #8b2fc9)`
                      }}
                    >
                      <Vote className="w-4 h-4 shrink-0" />
                      <span>Vote Directly for {candidate.name.split(' ')[0]} {candidate.name.split(' ').slice(-1)[0]}</span>
                    </button>
                    <p className="text-[10px] text-center text-[#7a6496] mt-2 font-mono">
                      Minimum ₦1,000 · 100% Donated to Charity
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
