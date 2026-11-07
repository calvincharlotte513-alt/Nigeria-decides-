import React from 'react';
import {
  Home,
  Trophy,
  Users,
  MapPin,
  Heart,
  HelpCircle,
  Vote,
  Crown,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface BottomMenuBarProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onOpenVoteModal: () => void;
  onOpenLeaderPopup?: () => void;
  onOpenLegalNotice?: () => void;
}

export const BottomMenuBar: React.FC<BottomMenuBarProps> = ({
  activeTab,
  onNavigate,
  onOpenVoteModal,
  onOpenLeaderPopup,
  onOpenLegalNotice
}) => {
  const navTabs = [
    {
      id: 'home',
      label: 'Game Home',
      shortLabel: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'results',
      label: 'Standings',
      shortLabel: 'Board',
      icon: Trophy,
      badge: 'LIVE'
    },
    {
      id: 'candidates',
      label: 'Candidates',
      shortLabel: 'Players',
      icon: Users,
      badge: null
    },
    {
      id: 'states',
      label: '36 States',
      shortLabel: 'States',
      icon: MapPin,
      badge: null
    },
    {
      id: 'charity',
      label: 'Charity & NGOs',
      shortLabel: 'Charity',
      icon: Heart,
      badge: '100%'
    },
    {
      id: 'about',
      label: 'Game Rules',
      shortLabel: 'Rules',
      icon: HelpCircle,
      badge: null
    }
  ];

  return (
    <div className="fixed bottom-3 sm:bottom-5 inset-x-0 z-40 pointer-events-none px-3 sm:px-4 flex justify-center">
      {/* Floating Glassmorphic Dock Container */}
      <nav
        aria-label="Bottom Navigation Menu"
        className="pointer-events-auto max-w-4xl w-full sm:w-auto bg-white/92 backdrop-blur-xl border border-[#d8b4fe]/60 shadow-[0_16px_48px_rgba(139,47,201,0.22)] rounded-[26px] sm:rounded-full p-1.5 sm:p-2 flex items-center justify-between sm:justify-center gap-1 sm:gap-2 transition-all duration-300 ring-1 ring-purple-100"
      >
        {/* Left Nav Items: Home, Standings, Candidates */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navTabs.slice(0, 3).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl sm:rounded-full flex flex-col sm:flex-row items-center gap-1 transition-all cursor-pointer select-none group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f3e8ff] to-[#fce7f3] text-[#8b2fc9] font-extrabold shadow-2xs'
                    : 'text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 sm:w-4 sm:h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#8b2fc9] stroke-[2.5]' : 'text-[#6b5887]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-gradient-to-r from-[#10b981] to-[#059669] text-white text-[8px] font-mono font-bold leading-none animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs tracking-tight whitespace-nowrap">
                  <span className="sm:hidden">{item.shortLabel}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
                {isActive && (
                  <span className="sm:hidden absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#8b2fc9]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Central Prominent "CAST CHOICE / PLAY" Action Pill */}
        <div className="px-1 shrink-0">
          <button
            onClick={onOpenVoteModal}
            className="group relative flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_6px_22px_rgba(162,56,245,0.45)] active:scale-95 cursor-pointer ring-2 ring-white/80"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
              <Vote className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[11px] sm:text-xs font-black font-heading tracking-wide">
                PLAY & VOTE
              </span>
              <span className="text-[8px] sm:text-[9px] text-amber-200 font-mono font-bold mt-0.5 hidden xs:inline">
                FROM ₦1,000 · 100% CHARITY
              </span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow hidden sm:inline" />
          </button>
        </div>

        {/* Right Nav Items: 36 States, Charity & NGOs, Rules */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navTabs.slice(3).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl sm:rounded-full flex flex-col sm:flex-row items-center gap-1 transition-all cursor-pointer select-none group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f3e8ff] to-[#fce7f3] text-[#8b2fc9] font-extrabold shadow-2xs'
                    : 'text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 sm:w-4 sm:h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#8b2fc9] stroke-[2.5]' : 'text-[#6b5887]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1 py-0.2 rounded-full bg-gradient-to-r from-[#e040fb] to-[#ec4899] text-white text-[8px] font-mono font-bold leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs tracking-tight whitespace-nowrap">
                  <span className="sm:hidden">{item.shortLabel}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </span>
                {isActive && (
                  <span className="sm:hidden absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#8b2fc9]" />
                )}
              </button>
            );
          })}

          {/* Quick Leader Trigger Icon on large screens */}
          {onOpenLeaderPopup && (
            <button
              onClick={onOpenLeaderPopup}
              title="View Current Poll Leader"
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-[#faf5ff] hover:bg-[#f3e8ff] text-[#f59e0b] border border-[#eadcfa] transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4 fill-[#f59e0b]" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};
