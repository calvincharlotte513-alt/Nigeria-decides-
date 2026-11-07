import React from 'react';
import { SupportedLanguage } from '../types';
import { ShieldCheck, HeartHandshake, ExternalLink } from 'lucide-react';

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
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 text-xs">
      {/* 4-Color Stripe */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-emerald-600" />
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-amber-800" />
        <div className="w-16 bg-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-600 to-orange-500 p-[1.5px] shadow-xs">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <span className="font-black text-white text-sm">
                    ND
                  </span>
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 font-heading">
                  Nigeria Decides
                </span>
                <span className="text-sm font-mono font-bold text-orange-600">2027</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              The sovereign independent pre-election public opinion engine for the Federal Republic of Nigeria. Empowering citizens to express verified democratic choices ahead of the 2027 general elections. Standings and rankings are determined by verified citizen financial backing.
            </p>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
              <span className="text-emerald-700 font-bold block font-mono uppercase text-[10px] tracking-wider">
                CIVIC CREED
              </span>
              <p className="text-slate-900 font-semibold font-heading">
                "YOUR VOICE. YOUR CHOICE. NIGERIA'S FUTURE."
              </p>
            </div>
          </div>

          {/* Polling Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Civic Polling
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('poll')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  Presidential Pre-Election Poll
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('candidates')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  Verified Candidates Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  Live National Standings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('states')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  36 States & FCT Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Social Impact */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Social Impact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('charity')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  Vetted Orphanages Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('charity')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  Audited Disbursement Ledger
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('charity')}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  CAC Accreditation Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Governance & Integrity
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenMethodology}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  Audit & Polling Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  NDPR Privacy Standards
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-emerald-700 transition-colors cursor-pointer text-left"
                >
                  Statutory INEC Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdminPortal}
                  className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-left"
                >
                  Trustee / Auditor Sign-In
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Independence Disclaimer Banner */}
        <div className="pt-8 border-t border-slate-200">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 leading-relaxed max-w-4xl">
                <strong>Statutory Notice:</strong> Nigeria Decides 2027 is an independent civic research and public opinion platform. It is NOT affiliated with the Independent National Electoral Commission (INEC) and does not conduct official election balloting. Standings and poll victory are determined by total citizen financial backing.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">
              CAC / IT Accreditation Registered
            </span>
          </div>
        </div>

        {/* Copyright & Disclaimer Line */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Nigeria Decides 2027 Civic Foundation. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-slate-800">Privacy Policy</button>
            <span>·</span>
            <button onClick={onOpenTerms} className="hover:text-slate-800">Terms of Participation</button>
            <span>·</span>
            <button onClick={onOpenMethodology} className="hover:text-slate-800">Methodology</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
