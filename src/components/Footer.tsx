import React from 'react';
import { SupportedLanguage } from '../types';
import { Logo } from './Logo';
import { Heart, ShieldCheck, Gamepad2, Sparkles, Building2, ExternalLink } from 'lucide-react';

interface FooterProps {
  currentLang: SupportedLanguage;
  onNavigate: (tabId: string) => void;
  onOpenMethodology: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang: _currentLang,
  onNavigate,
  onOpenMethodology,
  onOpenPrivacy,
  onOpenTerms
}) => {
  return (
    <footer className="relative border-t border-[#ebdffa] bg-white/80 backdrop-blur-md text-[#6b5887] text-xs z-10">
      {/* Top rainbow gradient line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#10b981] via-[#8b2fc9] to-[#f59e0b]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" size="md" />

            <p className="text-xs text-[#6b5887] leading-relaxed max-w-sm">
              A playful, independent community game created to help Nigerians decide their preferred leader ahead of the 2027 general election. Completely independent, community-driven, and designed to spread democratic joy.
            </p>

            {/* Sponsoring NGO Notice Box */}
            <div className="p-4 rounded-[22px] bg-gradient-to-br from-purple-50/90 to-pink-50/90 border border-purple-200/60 text-xs text-[#1e1035] space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[#8b2fc9] font-black font-mono uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span>100% PROCEEDS TO CHARITY</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  SPONSORED BY TAPAM
                </span>
              </div>
              <p className="text-[#55456e] text-[11px] leading-relaxed">
                The only NGO sponsoring this platform is <strong>TAPAM (The Awaken Pan African Movement)</strong>. 100% of all proceeds directly empower verified Nigerian orphanages and motherless babies' homes.
              </p>
              <a
                href="https://www.tapam.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8b2fc9] hover:underline"
              >
                <span>Visit TAPAM: www.tapam.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Game Navigation */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e1035] flex items-center gap-1">
              <span>🎮</span>
              <span>The Game</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Game Home & Highlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('poll')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Play & Cast Your Ballot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Live Crowd Standings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('candidates')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Meet the 2027 Contenders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('states')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  36 States & FCT Map
                </button>
              </li>
            </ul>
          </div>

          {/* Social Impact Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e1035] flex items-center gap-1">
              <span>💝</span>
              <span>100% Charity Fund</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('charity')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Vetted Orphanages Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('charity')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Audited Disbursement Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('charity')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Apply as a Nigerian NGO
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('charity')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Download Charity Audit (CSV)
                </button>
              </li>
            </ul>
          </div>

          {/* Game Rules & Independence */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e1035] flex items-center gap-1">
              <span>💡</span>
              <span>Independence & Rules</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Not Owned by Govt or INEC Notice
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenMethodology}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  How Standings are Calculated
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Privacy & Anonymous Ballot
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Clear Independence Notice Callout Banner */}
        <div className="pt-6 border-t border-[#ebdffa]">
          <div className="p-4 rounded-[24px] bg-[#faf5ff] border border-purple-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <p className="text-[11px] text-[#55456e] leading-relaxed max-w-4xl">
                <strong>Important Notice:</strong> Nigeria Decides 2027 is a completely independent community simulation game. <strong>Not owned by federal government or INEC but owned by Democratic Nigerians, and does not conduct official election balloting.</strong> Its purpose is to give Nigerians a fun, playful way to decide their choice of candidate before the election, while directing 100% of all generated proceeds to vetted Nigerian charities and grassroots NGOs.
              </p>
            </div>
            <span className="text-[11px] font-mono text-purple-700 font-bold shrink-0">
              Community Powered · 100% Charity
            </span>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-4 border-t border-[#ebdffa] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8c7da3]">
          <div>
            © {new Date().getFullYear()} Nigeria Decides 2027: The People's Choice Game. Created with love for Nigeria 🇳🇬.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenTerms} className="hover:text-[#1e1035]">INEC Disclaimer</button>
            <span>·</span>
            <button onClick={onOpenPrivacy} className="hover:text-[#1e1035]">Privacy</button>
            <span>·</span>
            <button onClick={onOpenMethodology} className="hover:text-[#1e1035]">Rules & Calculation</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
