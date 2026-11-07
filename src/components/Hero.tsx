import React, { useState, useEffect } from 'react';
import { PollStats, SupportedLanguage, Candidate } from '../types';
import {
  ArrowRight,
  Clock,
  Crown,
  Heart,
  Gamepad2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Award,
  ChevronRight,
  Building2,
  Users
} from 'lucide-react';

interface HeroProps {
  stats: PollStats | null;
  candidates?: Candidate[];
  currentLang: SupportedLanguage;
  onCastVote: () => void;
  onExploreCandidates: () => void;
  onViewResults: () => void;
  onOpenMethodology: () => void;
  onOpenLeaderPopup?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  stats,
  candidates = [],
  currentLang: _currentLang,
  onCastVote,
  onExploreCandidates,
  onViewResults,
  onOpenMethodology,
  onOpenLeaderPopup
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

  const leader = stats?.currentPollLeader;

  return (
    <section className="relative overflow-hidden pt-4 pb-10 sm:pt-6 sm:pb-14 lg:pt-10 lg:pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Playful Pill Notice Ribbon: Not Govt / Not INEC / 100% Charity */}
        <div className="mb-5 flex flex-wrap justify-center items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#eadcfa] text-xs text-[#6b5887] shadow-sm flex-wrap justify-center text-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="font-extrabold text-[#1e1035] font-heading flex items-center gap-1">
              <span>🎮</span>
              <span>THE 2027 CIVIC GAME</span>
            </span>
            <span className="text-[#8b2fc9] font-bold hidden sm:inline">· Community Pre-Election Simulation ·</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <Heart className="w-3 h-3 fill-emerald-500" />
              <span>100% Proceeds to Charity</span>
            </span>
          </div>
        </div>

        {/* 2-Column Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Free, Beautiful & Playful Headline */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            <div className="space-y-2 sm:space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 via-pink-50 to-amber-100 border border-purple-200/60 text-[10px] sm:text-[11px] font-mono font-black text-[#8b2fc9] tracking-wider uppercase">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                <span>HELP NIGERIA DECIDE BEFORE THE MAIN ELECTION</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-[#1e1035] tracking-tight leading-[1.1] sm:leading-[1.05] font-heading">
                WHO WOULD YOU <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-[#059669] to-[#047857]">
                  CHOOSE TO LEAD?
                </span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb]">
                  PLAY & VOTE! 🇳🇬
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-lg text-[#55456e] max-w-2xl leading-relaxed mx-auto lg:mx-0 font-medium">
              A playful, independent community game to help Nigerians decide their leader before the 2027 election. Pick your candidate, power up their position on the board from ₦1,000, and make a massive difference — <strong className="text-[#1e1035] font-extrabold underline decoration-emerald-400 decoration-2">100% of all proceeds go straight to verified Nigerian orphanages and grassroots NGOs!</strong>
            </p>

            {/* Clear "Not Government / Not INEC" Transparency Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-[22px] bg-white/80 backdrop-blur-md border border-[#eadcfa] text-xs text-[#55456e] flex items-start gap-2.5 sm:gap-3 shadow-2xs">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 text-sm sm:text-base">
                💡
              </div>
              <div className="text-left space-y-0.5 min-w-0">
                <span className="font-extrabold text-[#1e1035] block text-xs sm:text-sm">
                  100% Independent Citizen Game · Not INEC or Government Owned
                </span>
                <p className="text-[10px] sm:text-[11px] text-[#6b5887] leading-relaxed">
                  This platform is a private civic simulation and charity initiative. We are not affiliated with the Nigerian government or INEC. Standings are ranked by total community financial backing, and every single Naira raised is donated to vetted children's homes and community NGOs.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onCastVote}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-black text-xs sm:text-sm tracking-wide transition-all shadow-[0_8px_25px_rgba(162,56,245,0.38)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-heading uppercase group"
              >
                <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>PLAY & VOTE (FROM ₦1,000)</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onExploreCandidates}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/90 hover:bg-white text-[#1e1035] font-bold text-xs sm:text-sm border border-[#eadcfa] hover:border-[#8b2fc9] transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>EXPLORE CANDIDATES</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-4 text-[11px] sm:text-xs text-[#6b5887]">
              <span className="flex items-center gap-1 font-semibold text-[#1e1035]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                <span>OTP Verified & Deduplicated</span>
              </span>
              <span className="text-[#d8c5f5] hidden sm:inline">·</span>
              <span className="flex items-center gap-1 font-semibold text-[#8b2fc9]">
                <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 shrink-0" />
                <span>100% Proceeds to Charity & NGOs</span>
              </span>
              <span className="text-[#d8c5f5] hidden sm:inline">·</span>
              <span className="flex items-center gap-1 font-semibold text-[#f59e0b]">
                <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-500 shrink-0" />
                <span>Leader Determined by Total ₦</span>
              </span>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Playful Cards */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            
            {/* Visual Container */}
            <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden bg-white/90 border border-[#eadcfa] shadow-[0_16px_40px_rgba(162,56,245,0.14)] group">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src="/images/hero_civic_tech_1794056620627.jpg"
                  alt="Lagos civic tech hub analyzing Nigerian election public opinion data"
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient scrim with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1035]/90 via-[#1e1035]/20 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase font-mono tracking-wider font-bold text-[#e040fb] mb-0.5">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                      <span>THE PEOPLE'S CHOICE ARENA</span>
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold font-heading truncate">
                      Real-Time 36 States Sentiment Game
                    </h3>
                  </div>
                  <button
                    onClick={onViewResults}
                    className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-[11px] sm:text-xs font-bold transition-colors cursor-pointer border border-white/20 shrink-0"
                  >
                    View Board 🏆
                  </button>
                </div>
              </div>
            </div>

            {/* Split Info Cards: Election Countdown + Current Leader */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              
              {/* Countdown Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl sm:rounded-[26px] bg-white/90 backdrop-blur-md border border-[#eadcfa] space-y-2 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-[#6b5887]">
                  <span className="font-bold flex items-center gap-1.5 text-[#1e1035]">
                    <Clock className="w-3.5 h-3.5 text-[#8b2fc9]" />
                    <span>2027 Countdown</span>
                  </span>
                  <span className="text-[10px] font-mono text-purple-600 font-bold">Feb 27, 2027</span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                  <div className="p-1 sm:p-1.5 rounded-xl bg-purple-50/80 border border-purple-100 min-w-0">
                    <span className="text-sm sm:text-base font-black text-[#1e1035] block tabular-nums">{timeLeft.days}</span>
                    <span className="text-[9px] uppercase text-[#8c7da3] font-sans">Days</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-xl bg-purple-50/80 border border-purple-100 min-w-0">
                    <span className="text-sm sm:text-base font-black text-[#1e1035] block tabular-nums">{timeLeft.hours}</span>
                    <span className="text-[9px] uppercase text-[#8c7da3] font-sans">Hrs</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-xl bg-purple-50/80 border border-purple-100 min-w-0">
                    <span className="text-sm sm:text-base font-black text-[#1e1035] block tabular-nums">{timeLeft.minutes}</span>
                    <span className="text-[9px] uppercase text-[#8c7da3] font-sans">Min</span>
                  </div>
                  <div className="p-1 sm:p-1.5 rounded-xl bg-purple-50/80 border border-purple-100 min-w-0">
                    <span className="text-sm sm:text-base font-black text-[#1e1035] block tabular-nums">{timeLeft.seconds}</span>
                    <span className="text-[9px] uppercase text-[#8c7da3] font-sans">Sec</span>
                  </div>
                </div>
              </div>

              {/* Current Standing Leader Card */}
              <div
                onClick={onOpenLeaderPopup}
                className="p-3.5 sm:p-4 rounded-2xl sm:rounded-[26px] bg-gradient-to-br from-amber-50/90 via-white/90 to-purple-50/90 backdrop-blur-md border border-amber-200/80 space-y-2 shadow-2xs cursor-pointer hover:border-[#8b2fc9] transition-all group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b] group-hover:rotate-12 transition-transform" />
                    <span>Current Board Leader</span>
                  </span>
                  <span className="text-[10px] font-mono font-black text-[#8b2fc9] group-hover:underline">POPUP &rarr;</span>
                </div>

                {leader ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl overflow-hidden shrink-0 border border-[#eadcfa] bg-[#faf5ff] shadow-xs">
                      <img
                        src={leader.photoUrl}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-[#1e1035] truncate font-heading group-hover:text-[#8b2fc9] transition-colors">
                        {leader.name}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-[#8b2fc9]">
                        ₦{(leader.totalAmountNgn / 1000000).toFixed(1)}M Backed
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 py-0.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0 text-xs">
                      🎮
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#1e1035] block leading-tight">Board is Live & Ready</span>
                      <span className="text-[10px] text-[#8b2fc9] font-semibold">Vote from ₦1k to claim the #1 spot!</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* 4-Column Playful Metric Strip with Glassmorphism */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#ebdffa]/80 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[26px] bg-white/85 backdrop-blur-md border border-[#eadcfa] shadow-2xs space-y-0.5 sm:space-y-1">
            <span className="text-[11px] sm:text-xs text-[#6b5887] font-semibold block flex items-center gap-1 truncate">
              <span>💰</span>
              <span>Total Backing</span>
            </span>
            <div className="text-lg sm:text-3xl font-black text-[#1e1035] font-mono tracking-tight">
              ₦{stats && stats.totalPoolAmountNgn > 0 ? (stats.totalPoolAmountNgn / 1000000).toFixed(1) + 'M' : '0.00'}
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#8b2fc9] font-bold block truncate">
              100% to Charities & NGOs
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[26px] bg-white/85 backdrop-blur-md border border-[#eadcfa] shadow-2xs space-y-0.5 sm:space-y-1">
            <span className="text-[11px] sm:text-xs text-[#6b5887] font-semibold block flex items-center gap-1 truncate">
              <span>👥</span>
              <span>Citizens</span>
            </span>
            <div className="text-lg sm:text-3xl font-black text-[#1e1035] font-mono tracking-tight">
              {stats?.totalVerifiedParticipants?.toLocaleString() || '0'}
            </div>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-bold block truncate">
              OTP Verified
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[26px] bg-white/85 backdrop-blur-md border border-[#eadcfa] shadow-2xs space-y-0.5 sm:space-y-1">
            <span className="text-[11px] sm:text-xs text-[#6b5887] font-semibold block flex items-center gap-1 truncate">
              <span>🗺️</span>
              <span>Federation</span>
            </span>
            <div className="text-lg sm:text-3xl font-black text-[#1e1035] font-mono tracking-tight">
              36 States + FCT
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#a238f5] font-semibold block truncate">
              All 6 Geopolitical Zones
            </span>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl sm:rounded-[26px] bg-white/85 backdrop-blur-md border border-pink-200/80 shadow-2xs space-y-0.5 sm:space-y-1 bg-gradient-to-br from-white/90 to-pink-50/70">
            <span className="text-[11px] sm:text-xs text-[#6b5887] font-semibold block flex items-center gap-1 truncate">
              <span>❤️</span>
              <span>Charity Fund</span>
            </span>
            <div className="text-lg sm:text-3xl font-black text-pink-600 font-mono tracking-tight">
              100% Proceeds
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#8b2fc9] font-bold block truncate">
              Vetted Nigerian Homes
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
