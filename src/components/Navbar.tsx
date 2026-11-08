import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { Logo } from './Logo';
import {
  Globe,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Crown,
  Heart,
  Vote,
  ShieldCheck,
  Search
} from 'lucide-react';

interface NavbarProps {
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onOpenVoteModal: () => void;
  onOpenUserDashboard: () => void;
  onOpenAdminPortal: () => void;
  onOpenLeaderPopup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  activeTab,
  onNavigate,
  onOpenVoteModal,
  onOpenUserDashboard,
  onOpenAdminPortal,
  onOpenLeaderPopup
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Game Hub', emoji: '🎮' },
    { id: 'results', label: 'Standings', emoji: '🏆' },
    { id: 'candidates', label: 'Candidates', emoji: '👥' },
    { id: 'states', label: '36 States', emoji: '🗺️' },
    { id: 'charity', label: 'Charity Impact (100%)', emoji: '💝' },
    { id: 'about', label: 'Game Rules & Info', emoji: '💡' }
  ];

  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'English',
    yo: 'Èdè Yorùbá',
    ha: 'Harshen Hausa',
    ig: 'Asụsụ Igbo',
    pcm: 'Naija Pidgin'
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Top Playful Independence & Charity Notice Bar in Vibrant Purple */}
      <div className="w-full bg-[#581c87] bg-gradient-to-r from-[#4c1d95] via-[#6b21a8] to-[#4c1d95] text-white py-1.5 px-3 sm:px-6 shadow-sm border-b border-purple-700/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-center sm:text-left">
          {/* Main civic notice with pulse badge */}
          <div className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/25 text-emerald-300 font-mono text-[9px] sm:text-[10px] font-black border border-emerald-400/40 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>INDEPENDENT CIVIC GAME</span>
            </span>
            <span className="text-purple-100 text-[10px] sm:text-xs font-medium">
              <strong className="text-white font-bold">Not owned by federal government or INEC but owned by Democratic Nigerians</strong> · Just a fun, simple game to help Nigerians decide their leader before 2027! 🇳🇬
            </span>
          </div>

          {/* Charity 100% notice */}
          <div className="flex items-center justify-center gap-1.5 text-amber-300 font-bold text-[10px] sm:text-[11px] shrink-0">
            <Heart className="w-3.5 h-3.5 text-pink-300 fill-pink-400 shrink-0" />
            <span>100% of proceeds go directly to Charities &amp; NGOs!</span>
          </div>
        </div>
      </div>

      {/* Main Frosted Nav Container */}
      <div className="w-full bg-white/85 backdrop-blur-md border-b border-[#ebdffa]/80 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 h-16 sm:h-20">
          
          {/* Brand Logo with World-Class SVG */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group focus:outline-none cursor-pointer"
              title="Nigeria Decides 2027 - Home"
            >
              <Logo variant="full" size="md" />
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-[#6b5887]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-full transition-all cursor-pointer text-xs font-bold flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#f3e8ff] to-[#fce7f3] text-[#8b2fc9] shadow-2xs'
                      : 'text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff]'
                  }`}
                >
                  <span className="text-xs">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Poll Leader Quick Trigger Pill (Tablet / Desktop only) */}
            {onOpenLeaderPopup && (
              <button
                onClick={onOpenLeaderPopup}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 group-hover:rotate-12 transition-transform" />
                <span>Current Leader</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Select Language"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-[#6b5887] hover:text-[#1e1035] bg-white/90 border border-[#eadcfa] hover:border-[#d9c4f7] transition-all cursor-pointer shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-[#8b2fc9]" />
                <span className="uppercase font-mono text-[11px] font-bold">{currentLang}</span>
                <ChevronDown className="w-3 h-3 text-[#8c7da3]" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#eadcfa] rounded-2xl shadow-xl py-1.5 z-50">
                  {(Object.keys(languageLabels) as SupportedLanguage[]).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => {
                        onSelectLang(lng);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                        currentLang === lng
                          ? 'bg-[#f5ecff] text-[#8b2fc9] font-bold'
                          : 'text-[#6b5887] hover:bg-[#faf5ff] hover:text-[#1e1035]'
                      }`}
                    >
                      <span>{languageLabels[lng]}</span>
                      {currentLang === lng && <CheckCircle2 className="w-3.5 h-3.5 text-[#8b2fc9]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Check Receipt / Ballot Button */}
            <button
              onClick={onOpenUserDashboard}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 hover:bg-slate-50 text-[#6b5887] hover:text-[#1e1035] font-semibold text-xs border border-[#eadcfa] transition-colors cursor-pointer shadow-2xs"
            >
              <Search className="w-3.5 h-3.5 text-[#8b2fc9]" />
              <span>Verify Receipt</span>
            </button>

            {/* Primary CTA: Vote Gradient Pill */}
            <button
              onClick={onOpenVoteModal}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(162,56,245,0.35)] active:scale-95 flex items-center gap-1.5 cursor-pointer font-heading shrink-0"
            >
              <Vote className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
              <span>Vote</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
