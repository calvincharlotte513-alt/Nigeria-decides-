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
    <div className="fixed bottom-0 inset-x-0 z-40 pointer-events-none">
      {/* Mobile: full-width tab bar pinned to bottom edge */}
      <nav
        aria-label="Bottom Navigation Menu"
        className="pointer-events-auto w-full bg-white/95 backdrop-blur-xl border-t border-[#d8b4fe]/60 shadow-[0_-8px_32px_rgba(139,47,201,0.18)] sm:hidden flex items-stretch justify-around px-1 py-1 pb-safe"
        style={{ paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}
      >
        {/* Mobile: 7 items — 3 left + PLAY center + 3 right, icons + labels */}
        {navTabs.slice(0, 3).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-1 py-1 min-w-[44px] flex-1 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-[#8b2fc9]' : 'text-[#9986b5]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full bg-emerald-500 text-white text-[7px] font-bold leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-bold leading-none tracking-tight ${isActive ? 'text-[#8b2fc9]' : 'text-[#9986b5]'}`}>
                {item.shortLabel}
              </span>
              {isActive && <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-[#8b2fc9]" />}
            </button>
          );
        })}

        {/* Center PLAY button on mobile */}
        <button
          onClick={onOpenVoteModal}
          className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 flex-1 cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8b2fc9] to-[#e040fb] flex items-center justify-center shadow-[0_4px_16px_rgba(162,56,245,0.5)] -mt-4">
            <Vote className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <span className="text-[9px] font-black text-[#8b2fc9] leading-none tracking-tight mt-0.5">VOTE</span>
        </button>

        {navTabs.slice(3).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 px-1 py-1 min-w-[44px] flex-1 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-[#8b2fc9]' : 'text-[#9986b5]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full bg-pink-500 text-white text-[7px] font-bold leading-tight">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[9px] font-bold leading-none tracking-tight ${isActive ? 'text-[#8b2fc9]' : 'text-[#9986b5]'}`}>
                {item.shortLabel}
              </span>
              {isActive && <span className="absolute bottom-0.5 w-4 h-0.5 rounded-full bg-[#8b2fc9]" />}
            </button>
          );
        })}
      </nav>

      {/* Tablet/Desktop: floating pill dock */}
      <div className="hidden sm:flex justify-center pb-5 px-4">
        <nav
          aria-label="Bottom Navigation Menu"
          className="pointer-events-auto bg-white/92 backdrop-blur-xl border border-[#d8b4fe]/60 shadow-[0_16px_48px_rgba(139,47,201,0.22)] rounded-full px-2 py-2 flex items-center justify-center gap-1.5 ring-1 ring-purple-100"
        >
          {navTabs.slice(0, 3).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f3e8ff] to-[#fce7f3] text-[#8b2fc9] font-extrabold shadow-sm'
                    : 'text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8b2fc9] stroke-[2.5]' : 'text-[#6b5887]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1 rounded-full bg-emerald-500 text-white text-[8px] font-mono font-bold leading-none animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}

          {/* Central CTA */}
          <div className="px-1">
            <button
              onClick={onOpenVoteModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] text-white font-black text-xs uppercase tracking-wider shadow-[0_6px_22px_rgba(162,56,245,0.45)] active:scale-95 cursor-pointer ring-2 ring-white/80 hover:opacity-95 transition-all"
            >
              <Vote className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>PLAY &amp; VOTE</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>

          {navTabs.slice(3).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-all cursor-pointer group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#f3e8ff] to-[#fce7f3] text-[#8b2fc9] font-extrabold shadow-sm'
                    : 'text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8b2fc9] stroke-[2.5]' : 'text-[#6b5887]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1 rounded-full bg-pink-500 text-white text-[8px] font-mono font-bold leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}

          {onOpenLeaderPopup && (
            <button
              onClick={onOpenLeaderPopup}
              title="View Current Poll Leader"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4 fill-amber-500 text-amber-500" />
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
