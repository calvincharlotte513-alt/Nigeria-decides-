import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { Globe, Menu, X, ChevronDown, CheckCircle2, ArrowRight, Award, Crown } from 'lucide-react';

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
    { id: 'home', label: 'Home' },
    { id: 'poll', label: 'Presidential Poll' },
    { id: 'candidates', label: 'Candidates' },
    { id: 'results', label: 'Live Standings' },
    { id: 'states', label: 'State Polls' },
    { id: 'charity', label: 'Charity Impact' },
    { id: 'about', label: 'Methodology' }
  ];

  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'English',
    yo: 'Èdè Yorùbá',
    ha: 'Harshen Hausa',
    ig: 'Asụsụ Igbo',
    pcm: 'Naija Pidgin'
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#ebdffa] bg-[#faf7fd]/95 backdrop-blur-md transition-all shadow-xs">
      
      {/* Top micro purple-pink gradient bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb]" />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Zone 1: World-Class Brand Wordmark */}
        <div className="flex items-center gap-3.5 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            {/* Soft Lilac & Violet Emblem */}
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8b2fc9] via-[#a238f5] to-[#e040fb] p-[1.5px] shadow-[0_4px_14px_rgba(162,56,245,0.25)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#1e1035] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className="font-black text-white text-base tracking-tight font-heading">
                  ND
                </span>
                <span className="absolute bottom-1 right-1.5 w-1.5 h-1.5 rounded-full bg-[#e040fb] ring-2 ring-[#1e1035]" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#1e1035] group-hover:text-[#8b2fc9] transition-colors whitespace-nowrap font-heading">
                  Nigeria Decides
                </span>
                <span className="text-sm font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8b2fc9] to-[#e040fb] tracking-wider">
                  2027
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-[0.16em] text-[#8c7da3] font-bold -mt-0.5">
                PRE-ELECTION CIVIC POLL · MIN ₦1,000
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Single-line Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#6b5887]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer text-[13px] tracking-normal relative ${
                activeTab === item.id
                  ? 'text-[#8b2fc9] font-bold'
                  : 'text-[#6b5887] hover:text-[#1e1035]'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8b2fc9] to-[#e040fb] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Leader Alert, Language, Verification & Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* View Leader Trigger Pill */}
          {onOpenLeaderPopup && (
            <button
              onClick={onOpenLeaderPopup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f3e8ff] hover:bg-[#ede0fe] text-[#8b2fc9] border border-[#eadcfa] text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <Crown className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
              <span className="hidden sm:inline">Poll Leader</span>
            </button>
          )}

          {/* Language Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[#6b5887] hover:text-[#1e1035] bg-white border border-[#eadcfa] hover:border-[#d9c4f7] transition-all cursor-pointer shadow-2xs"
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
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-[#6b5887] hover:text-[#1e1035] font-semibold text-xs border border-[#eadcfa] transition-colors cursor-pointer shadow-2xs"
          >
            <span>Verify Receipt</span>
          </button>

          {/* Primary CTA Button: Gradient Pill matching Reference Screenshot */}
          <button
            onClick={onOpenVoteModal}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(162,56,245,0.3)] active:scale-95 flex items-center gap-2 cursor-pointer font-heading"
          >
            <span>Cast Ballot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white text-[#6b5887] hover:bg-slate-50 border border-[#eadcfa] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#ebdffa] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold ${
                  activeTab === item.id
                    ? 'bg-[#f5ecff] text-[#8b2fc9] font-bold'
                    : 'text-[#6b5887] hover:bg-[#faf5ff]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#f0e4fc] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenUserDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-full bg-slate-50 text-[#6b5887] text-xs font-semibold text-center border border-[#eadcfa]"
            >
              Verify Voter Receipt
            </button>
            <button
              onClick={() => {
                onOpenAdminPortal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-full text-[#8c7da3] text-[11px] text-center"
            >
              Auditor / Trustee Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
