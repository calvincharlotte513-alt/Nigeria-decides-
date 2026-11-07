import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { Logo } from './Logo';
import {
  Globe,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Crown,
  Heart,
  Gamepad2,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* Top Playful Independence & Charity Notice Bar */}
      <div className="w-full bg-gradient-to-r from-[#1e1035] via-[#3b0764] to-[#1e1035] text-white text-[11px] py-1.5 px-3 sm:px-6 shadow-sm border-b border-purple-900/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>INDEPENDENT CIVIC GAME</span>
            </span>
            <span className="text-purple-200 text-xs">
              <strong>Not owned by Nigerian Government or INEC</strong> · Just a fun, simple game to help Nigerians decide their leader before 2027! 🇳🇬
            </span>
          </div>

          <div className="flex items-center gap-2 text-amber-300 font-bold text-[10px] sm:text-[11px]">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 shrink-0" />
            <span>100% of proceeds go directly to Charities & NGOs!</span>
          </div>
        </div>
      </div>

      {/* Main Frosted Nav Container */}
      <div className="w-full bg-white/85 backdrop-blur-md border-b border-[#ebdffa]/80 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-20">
          
          {/* Brand Logo with World-Class SVG */}
          <div className="flex items-center gap-3 shrink-0">
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
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Poll Leader Quick Trigger Pill */}
            {onOpenLeaderPopup && (
              <button
                onClick={onOpenLeaderPopup}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-xs font-bold transition-all cursor-pointer shadow-2xs group"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline">Current Leader</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Select Language"
                className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#6b5887] hover:text-[#1e1035] bg-white/90 border border-[#eadcfa] hover:border-[#d9c4f7] transition-all cursor-pointer shadow-2xs"
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

            {/* Primary CTA: Play & Vote Gradient Pill */}
            <button
              onClick={onOpenVoteModal}
              className="px-4.5 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(162,56,245,0.35)] active:scale-95 flex items-center gap-2 cursor-pointer font-heading"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Play & Vote</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-full bg-white/90 text-[#6b5887] hover:bg-slate-50 border border-[#eadcfa] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-[#ebdffa] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
                  activeTab === item.id
                    ? 'bg-[#f5ecff] text-[#8b2fc9] font-bold'
                    : 'text-[#6b5887] hover:bg-[#faf5ff]'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#f0e4fc] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenUserDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-slate-50 text-[#6b5887] text-xs font-semibold text-center border border-[#eadcfa] flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-[#8b2fc9]" />
              <span>Verify Voter Receipt</span>
            </button>
            <button
              onClick={() => {
                onOpenAdminPortal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-full text-[#8c7da3] text-[11px] text-center"
            >
              Charity & Auditor Verification Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
