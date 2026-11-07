import React, { useState, useEffect } from 'react';
import { PollStats, SupportedLanguage, Candidate } from '../types';
import {
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Building2,
  Users,
  HeartHandshake
} from 'lucide-react';

interface HeroProps {
  stats: PollStats | null;
  candidates?: Candidate[];
  currentLang: SupportedLanguage;
  onCastVote: () => void;
  onExploreCandidates: () => void;
  onViewResults: () => void;
  onOpenMethodology: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  candidates = [],
  currentLang: _currentLang,
  onCastVote,
  onExploreCandidates,
  onViewResults,
  onOpenMethodology
}) => {
  // Countdown timer to Nigerian 2027 General Election (February 27, 2027)
  const targetElectionDate = new Date('2027-02-27T08:00:00Z').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetElectionDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetElectionDate]);

  const leader = stats?.currentPollLeader || candidates[0];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-white border-b border-slate-200">
      
      {/* Subtle warm architectural ambient glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-orange-50/60 to-emerald-50/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Independence Disclaimer Top Ribbon */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 shadow-xs">
            <span className="font-extrabold text-slate-900 font-heading">
              NIGERIA DECIDES 2027
            </span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-emerald-700 font-semibold">Independent Public Opinion Engine</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <button
              onClick={onOpenMethodology}
              className="text-[11px] underline text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Audited Methodology
            </button>
          </div>
        </div>

        {/* 2-Column Split: Editorial Value Proposition & Cinematic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono font-bold tracking-[0.2em] text-orange-600 block">
                NATIONWIDE PRE-ELECTION BALLOT · WIN DETERMINED BY AMOUNT
              </span>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.04] font-heading">
                YOUR VOICE.<br />
                YOUR CHOICE.<br />
                <span className="text-emerald-700">
                  NIGERIA'S FUTURE.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              Who would you choose to lead Nigeria? Make your voice count in our nationwide pre-election poll and see what Nigerians are thinking ahead of 2027. Verified citizen participation starting from ₦1,000, with election standings calculated directly from verified financial backing.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onCastVote}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer font-heading uppercase"
              >
                <span>CAST YOUR VOTE (FROM ₦1,000)</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onExploreCandidates}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 hover:border-slate-400 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>EXPLORE 2027 CANDIDATES</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SMS/Email OTP Verified</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span>Win Ranked by Contributed ₦</span>
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <HeartHandshake className="w-4 h-4 text-amber-800" />
                <span>30% Dedicated to Orphanages</span>
              </span>
            </div>

          </div>

          {/* Right Column: Multi-Image Civic Visual & Countdown Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Photorealistic Visual Container */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl group">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_civic_tech_1794056620627.jpg"
                  alt="Lagos civic tech hub analyzing Nigerian election public opinion data"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient scrim with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-orange-400 block">
                      Civic Tech Intelligence Hub
                    </span>
                    <h3 className="text-base font-extrabold font-heading">
                      Real-Time National Poll Aggregation
                    </h3>
                  </div>
                  <button
                    onClick={onViewResults}
                    className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Charts
                  </button>
                </div>
              </div>
            </div>

            {/* Split Info Cards: Election Countdown + Current Poll Leader by ₦ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* Countdown Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold flex items-center gap-1 text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    <span>2027 Countdown</span>
                  </span>
                  <span className="text-[10px] font-mono">Feb 27, 2027</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-base font-black text-slate-900 block tabular-nums">{timeLeft.days}</span>
                    <span className="text-[9px] uppercase text-slate-400 font-sans">Days</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-base font-black text-slate-900 block tabular-nums">{timeLeft.hours}</span>
                    <span className="text-[9px] uppercase text-slate-400 font-sans">Hrs</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-base font-black text-slate-900 block tabular-nums">{timeLeft.minutes}</span>
                    <span className="text-[9px] uppercase text-slate-400 font-sans">Min</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200">
                    <span className="text-base font-black text-slate-900 block tabular-nums">{timeLeft.seconds}</span>
                    <span className="text-[9px] uppercase text-slate-400 font-sans">Sec</span>
                  </div>
                </div>
              </div>

              {/* Current Standing Leader Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-emerald-800">Leading by Financial Backing</span>
                  <span className="text-[10px] font-mono font-bold text-slate-600">RANK #1</span>
                </div>

                {leader && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white">
                      <img
                        src={leader.photoUrl}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate font-heading">
                        {leader.name}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-emerald-700">
                        ₦{(leader.totalAmountNgn / 1000000).toFixed(1)}M Total Backing
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Full-Width 4-Column Metric Strip (Proof of Scale) */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium block">
              Total Citizen Financial Backing
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight">
              ₦{stats ? (stats.totalPoolAmountNgn / 1000000).toFixed(1) : '224.9'}M
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold block">
              Direct Verified Contributions
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium block">
              Total Polled Citizens
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight">
              {stats?.totalVerifiedParticipants.toLocaleString() || '149,800'}
            </div>
            <span className="text-[11px] text-slate-500 block">
              100% OTP Deduplicated
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium block">
              Federation Coverage
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight flex items-center gap-1.5">
              <span>36 States + FCT</span>
            </div>
            <span className="text-[11px] text-orange-600 font-semibold block">
              6 Geopolitical Zones Active
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-slate-500 font-medium block">
              Charity & Orphanage Allocation
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-800 font-mono tracking-tight">
              ₦{stats ? (stats.totalCharityProceedsNgn / 1000000).toFixed(2) : '18.45'}M
            </div>
            <span className="text-[11px] text-slate-500 block">
              Vetted CAC Registered Homes
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
