import React from 'react';
import { SupportedLanguage } from '../types';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

interface FooterProps {
  currentLang: SupportedLanguage;
  onNavigate: (tabId: string) => void;
  onOpenMethodology: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenAdminPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang: _currentLang,
  onNavigate,
  onOpenMethodology,
  onOpenPrivacy,
  onOpenTerms,
  onOpenAdminPortal
}) => {
  return (
    <footer className="border-t border-[#ebdffa] bg-[#faf7fd] text-[#6b5887] text-xs">
      {/* Top purple/magenta gradient line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#8b2fc9] to-[#e040fb] p-[1.5px] shadow-xs">
                <div className="w-full h-full bg-[#1e1035] rounded-[14px] flex items-center justify-center">
                  <span className="font-black text-white text-sm">
                    ND
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#1e1035] font-heading">
                  Nigeria Decides
                </span>
                <span className="text-sm font-mono font-bold text-[#8b2fc9]">2027</span>
              </div>
            </div>

            <p className="text-xs text-[#6b5887] leading-relaxed max-w-sm">
              The sovereign independent pre-election public opinion engine for the Federal Republic of Nigeria. Empowering citizens to express verified democratic choices ahead of the 2027 general elections. Standings and rankings are determined by verified citizen financial backing.
            </p>

            <div className="p-4 rounded-[22px] bg-white border border-[#eadcfa] text-xs text-[#1e1035] space-y-1 shadow-2xs">
              <span className="text-[#8b2fc9] font-bold block font-mono uppercase text-[10px] tracking-wider">
                CIVIC CREED
              </span>
              <p className="text-[#1e1035] font-semibold font-heading">
                "YOUR VOICE. YOUR CHOICE. NIGERIA'S FUTURE."
              </p>
            </div>
          </div>

          {/* Polling Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e1035]">
              Civic Polling
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('poll')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Presidential Pre-Election Poll
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('candidates')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Verified Candidates Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Live National Standings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('states')}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  36 States & FCT Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Social Impact */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e1035]">
              Social Impact
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
                  CAC Accreditation Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1e1035]">
              Governance & Integrity
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenMethodology}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Audit & Polling Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  NDPR Privacy Standards
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-[#8b2fc9] transition-colors cursor-pointer text-left"
                >
                  Statutory INEC Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdminPortal}
                  className="text-[#8c7da3] hover:text-[#1e1035] transition-colors cursor-pointer text-left"
                >
                  Trustee / Auditor Sign-In
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Independence Disclaimer Banner */}
        <div className="pt-8 border-t border-[#ebdffa]">
          <div className="p-4.5 rounded-[24px] bg-white border border-[#eadcfa] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#8b2fc9] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#6b5887] leading-relaxed max-w-4xl">
                <strong>Statutory Notice:</strong> Nigeria Decides 2027 is an independent civic research and public opinion platform. It is NOT affiliated with the Independent National Electoral Commission (INEC) and does not conduct official election balloting. Standings and poll victory are determined by total citizen financial backing.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#8c7da3] shrink-0">
              CAC / IT Accreditation Registered
            </span>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="pt-6 border-t border-[#ebdffa] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8c7da3]">
          <div>
            © {new Date().getFullYear()} Nigeria Decides 2027 Civic Foundation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-[#1e1035]">Privacy Policy</button>
            <span>·</span>
            <button onClick={onOpenTerms} className="hover:text-[#1e1035]">Terms of Participation</button>
            <span>·</span>
            <button onClick={onOpenMethodology} className="hover:text-[#1e1035]">Methodology</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
