import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { Globe, Menu, X, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSelectLang,
  activeTab,
  onNavigate,
  onOpenVoteModal,
  onOpenUserDashboard,
  onOpenAdminPortal
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
    { id: 'about', label: 'About & Methodology' }
  ];

  const languageLabels: Record<SupportedLanguage, string> = {
    en: 'English',
    yo: 'Èdè Yorùbá',
    ha: 'Harshen Hausa',
    ig: 'Asụsụ Igbo',
    pcm: 'Naija Pidgin'
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      {/* Top 3-color sovereign accent ribbon: Green - Orange - Brown - Black */}
      <div className="h-[3px] w-full flex">
        <div className="flex-1 bg-emerald-600" />
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-amber-800" />
        <div className="w-16 bg-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Zone 1: World-Class Brand Wordmark */}
        <div className="flex items-center gap-3.5 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            {/* Bespoke Geometric Emblem */}
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-orange-500 to-amber-800 p-[1.5px] shadow-sm group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className="font-black text-white text-base tracking-tight font-heading">
                  ND
                </span>
                <span className="absolute bottom-1 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 ring-2 ring-slate-950" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 group-hover:text-emerald-700 transition-colors whitespace-nowrap font-heading">
                  Nigeria Decides
                </span>
                <span className="text-sm font-mono font-black text-orange-600 tracking-wider">
                  2027
                </span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-[0.18em] text-slate-500 font-bold -mt-0.5">
                PRE-ELECTION CIVIC POLL · MIN ₦1,000
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Single-line Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer text-[13px] tracking-normal relative ${
                activeTab === item.id
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Language, Verification & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Language Switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span className="uppercase font-mono text-[11px] font-bold">{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-slate-200 rounded-2xl shadow-xl py-1.5 z-50">
                {(Object.keys(languageLabels) as SupportedLanguage[]).map((lng) => (
                  <button
                    key={lng}
                    onClick={() => {
                      onSelectLang(lng);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                      currentLang === lng
                        ? 'bg-emerald-50 text-emerald-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    <span>{languageLabels[lng]}</span>
                    {currentLang === lng && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Check Receipt / Ballot Button */}
          <button
            onClick={onOpenUserDashboard}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer"
          >
            <span>Verify Receipt</span>
          </button>

          {/* Primary CTA Button: Cast Your Vote */}
          <button
            onClick={onOpenVoteModal}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-2 cursor-pointer font-heading"
          >
            <span>Cast Ballot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenUserDashboard();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold text-center"
            >
              Verify Voter Receipt
            </button>
            <button
              onClick={() => {
                onOpenAdminPortal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-xl text-slate-500 text-[11px] text-center"
            >
              Auditor / Trustee Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
