import React, { useState } from 'react';
import { CharityBeneficiary, SupportedLanguage } from '../types';
import {
  Heart,
  ShieldCheck,
  MapPin,
  Download,
  X,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Globe,
  Sparkles
} from 'lucide-react';

interface CharityImpactProps {
  charities: CharityBeneficiary[];
  totalProceedsNgn: number;
  totalDistributedNgn: number;
  currentLang: SupportedLanguage;
}

export const CharityImpact: React.FC<CharityImpactProps> = ({
  charities,
  totalProceedsNgn,
  totalDistributedNgn,
  currentLang: _currentLang
}) => {
  const [selectedCharity, setSelectedCharity] = useState<CharityBeneficiary | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const undistributedNgn = totalProceedsNgn - totalDistributedNgn;

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#eadcfa] text-xs font-bold text-[#8b2fc9] font-mono uppercase tracking-wider shadow-2xs">
          <span>💜</span>
          <span>100% of Proceeds Go Directly to Charity & NGOs ❤️</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#1e1035] tracking-tight font-heading">
          YOUR VOICE. THEIR FUTURE.
        </h2>
        <p className="text-sm sm:text-base text-[#6b5887] leading-relaxed font-normal">
          Every single Naira contributed in Nigeria Decides 2027 (100% of all proceeds) directly funds registered Nigerian orphanages, motherless babies' homes, and youth empowerment NGOs across the federation!
        </p>
      </div>

      {/* OFFICIAL SPONSORING NGO: TAPAM (The Awaken Pan African Movement) */}
      <div className="relative rounded-[36px] bg-gradient-to-br from-white via-[#faf5ff] to-[#f5ebff] border-2 border-[#8b2fc9]/40 p-6 sm:p-10 shadow-[0_16px_48px_rgba(139,47,201,0.12)] overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#8b2fc9]/20 to-[#f59e0b]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-[#10b981]/20 to-[#8b2fc9]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          {/* Emboldened TAPAM Logo Container */}
          <div className="flex flex-col items-center text-center shrink-0">
            {/* Pill label directly above logo */}
            <span className="px-3.5 py-1 mb-3 rounded-full bg-[#1e1035] text-white text-[11px] font-mono font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5 border border-purple-300/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>OFFICIAL SPONSORING NGO LOGO</span>
            </span>

            {/* Emboldened Logo Box with Glowing Double Border */}
            <a
              href="https://www.tapam.org/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Official TAPAM Website (tapam.org)"
              className="group relative p-2.5 rounded-3xl bg-white border-4 border-[#8b2fc9] shadow-[0_12px_36px_rgba(139,47,201,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_48px_rgba(139,47,201,0.5)] block cursor-pointer"
            >
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-white flex items-center justify-center p-2 border-2 border-amber-300/60 shadow-inner">
                <img
                  src="/images/tapam-logo.jpg"
                  alt="TAPAM - The Awaken Pan African Movement Official Logo"
                  className="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-1 transition-transform"
                />
              </div>

              {/* Verified NGO Watermark Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 text-white text-[10px] font-bold font-mono uppercase tracking-wider shadow-md whitespace-nowrap flex items-center gap-1 border border-white">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span>SOLE CHARITY SPONSOR</span>
              </div>
            </a>

            <div className="mt-5 text-center">
              <p className="text-xs font-mono font-bold text-[#1e1035] uppercase tracking-wide">
                The Awaken Pan African Movement
              </p>
              <a
                href="https://www.tapam.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-extrabold text-[#8b2fc9] hover:text-[#e040fb] hover:underline inline-flex items-center gap-1 mt-0.5"
              >
                <span>www.tapam.org</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Sponsoring NGO Official Notification Details */}
          <div className="flex-1 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono uppercase tracking-wider text-[11px]">
                THE ONLY NGO SPONSORING THIS WEBSITE · SOLE HUMANITARIAN PARTNER
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#1e1035] tracking-tight font-heading leading-tight">
              Charity Initiative Exclusively Sponsored by TAPAM
            </h3>

            <div className="space-y-3 text-sm text-[#4c3b63] leading-relaxed">
              <p className="font-medium bg-white/70 p-4 rounded-2xl border border-purple-100 shadow-2xs">
                📢 <strong className="text-[#1e1035]">Official Sponsorship Notification:</strong> The only NGO sponsoring this platform's charity initiative is <strong className="text-[#8b2fc9]">TAPAM (The Awaken Pan African Movement)</strong>. In humanitarian alliance with the <strong className="text-[#1e1035]">Cultural Heritage and Youth Empowerment Foundation (CHYEF)</strong> — registered under Nigerian law — TAPAM proudly sponsors our charitable mission to ensure that 100% of all citizen contributions directly reach vulnerable children, motherless babies' homes, and registered orphanages across Nigeria.
              </p>

              <p className="text-xs text-[#6b5887]">
                TAPAM is dedicated to pan-African civic enlightenment, youth empowerment, cultural heritage safeguarding, and direct grassroots poverty alleviation. Through this partnership, every single Naira raised through voter participation is directed to independently audited Nigerian orphanages with zero administrative deductions.
              </p>
            </div>

            {/* Official Website Link & Verification Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://www.tapam.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-[0_6px_20px_rgba(139,47,201,0.35)] transition-all cursor-pointer hover:scale-102"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Official TAPAM Website (tapam.org)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://www.tapam.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-white hover:bg-[#faf5ff] border border-[#eadcfa] text-[#1e1035] font-semibold text-xs transition-colors shadow-2xs"
              >
                <span className="text-[#8b2fc9] font-mono font-bold">Official URL:</span>
                <span className="font-mono text-[#8b2fc9] underline decoration-purple-300">https://www.tapam.org/</span>
              </a>
            </div>

            {/* Sub-badge acknowledging governance */}
            <div className="pt-2 text-[11px] text-[#7d6c96] flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8b2fc9]" />
              <span>
                Not owned by federal government or INEC but owned by Democratic Nigerians · Humanitarian wing registered under Nigerian law.
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Feature Showcase Grid: Photo + Financial Ledger Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: High-Impact Photography of Community Center & Children Outreach */}
        <div className="lg:col-span-5 relative rounded-[32px] overflow-hidden bg-white border border-[#eadcfa] shadow-[0_12px_36px_rgba(162,56,245,0.12)] group">
          <img
            src="/images/charity_outreach_1794058203228.jpg"
            alt="Compassionate Nigerian caregivers and children in a sunlit community learning center"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 min-h-[300px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1035]/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#e040fb] block mb-1">
              Direct Beneficiary Verification
            </span>
            <h4 className="text-base font-extrabold font-heading">
              Empowering Nigeria's Vulnerable Children
            </h4>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              Every grant recipient is vetted through CAC Registered Trustees filings, site visits, and independent auditor confirmation.
            </p>
          </div>
        </div>

        {/* Right: Financial Ledger Dashboard styled with Screenshot aesthetic */}
        <div className="lg:col-span-7 rounded-[32px] bg-white border border-[#eadcfa] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0e4fc]">
            <div>
              <h3 className="text-lg font-bold text-[#1e1035] flex items-center gap-2 font-heading">
                <ShieldCheck className="w-5 h-5 text-[#8b2fc9]" />
                <span>Independent Charity Fund Ledger</span>
              </h3>
              <p className="text-xs text-[#6b5887] mt-0.5">
                Independently audited by Apex Africa Assurance LLP · Monthly Public Verification
              </p>
            </div>

            <button
              onClick={() => {
                const rows = [
                  'Charity_Organisation,CAC_Reg_Number,State,Allocated_NGN,Disbursed_NGN,Status',
                  ...charities.map(c => `"${c.name}","${c.cacNumber}","${c.state}",${c.allocatedAmountNgn},${c.disbursedAmountNgn},"${c.lastDisbursementDate}"`)
                ].join('\n');
                const encodedUri = encodeURI('data:text/csv;charset=utf-8,' + rows);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', 'Nigeria_Decides_2027_Charity_Audit.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#faf5ff] hover:bg-[#f5ebff] text-xs font-semibold text-[#8b2fc9] border border-[#eadcfa] cursor-pointer transition-colors shadow-2xs self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-[#8b2fc9]" />
              <span>Download Ledger (CSV)</span>
            </button>
          </div>

          {/* 3 Metric Cards styled like Screenshot with 3D icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-[22px] bg-[#faf8fe] border border-[#eadcfa] shadow-2xs">
              <span className="text-[11px] text-[#6b5887] block mb-1 font-medium">
                Total Charitable Proceeds
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#1e1035] font-mono">
                ₦{totalProceedsNgn.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#8b2fc9] font-semibold block mt-1">
                100% of All Proceeds Donated
              </span>
            </div>

            <div className="p-4 rounded-[22px] bg-[#faf8fe] border border-[#eadcfa] shadow-2xs">
              <span className="text-[11px] text-[#6b5887] block mb-1 font-medium">
                Disbursed to Children Homes
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#8b2fc9] font-mono">
                ₦{totalDistributedNgn.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#6b5887] block mt-1">
                {totalProceedsNgn > 0 ? `${((totalDistributedNgn / totalProceedsNgn) * 100).toFixed(1)}% Payout Ratio` : '100% Escrow Reserve'}
              </span>
            </div>

            <div className="p-4 rounded-[22px] bg-[#faf8fe] border border-[#eadcfa] shadow-2xs">
              <span className="text-[11px] text-[#6b5887] block mb-1 font-medium">
                Committed Escrow Reserve
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#a238f5] font-mono">
                ₦{undistributedNgn.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#6b5887] block mt-1">
                Scheduled for Next Cycle
              </span>
            </div>
          </div>

          <div className="text-xs text-[#8c7da3] pt-2 border-t border-[#f0e4fc] flex items-center justify-between">
            <span>Escrow Held at Stanbic IBTC Trustees Limited</span>
            <span className="font-mono text-[#8b2fc9] font-bold">Audit Ref: APX-2026-NG</span>
          </div>
        </div>

      </div>

      {/* Directory of Verified Beneficiary Charities */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-black text-[#1e1035] font-heading">
              Verified Beneficiary Organisations
            </h3>
            <p className="text-xs text-[#6b5887]">
              Only organisations with verified Corporate Affairs Commission (CAC) Registered Trustees certificates receive disbursements.
            </p>
          </div>

          <button
            onClick={() => setShowApplyModal(true)}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#faf5ff] border border-[#eadcfa] text-xs font-semibold text-[#8b2fc9] flex items-center gap-1.5 cursor-pointer self-start sm:self-auto transition-colors shadow-2xs"
          >
            <span>Apply as an NGO Partner</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {charities.map((ch) => (
            <div
              key={ch.id}
              className="rounded-[28px] bg-white border border-[#eadcfa] p-6 flex flex-col justify-between hover:border-[#8b2fc9] hover:shadow-[0_12px_36px_rgba(162,56,245,0.12)] transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#f5ecff] text-[#8b2fc9] border border-[#eadcfa]">
                    {ch.category}
                  </span>
                  <span className="text-[11px] font-mono font-semibold text-[#8c7da3]">
                    {ch.cacNumber}
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#1e1035] font-heading">
                  {ch.name}
                </h4>

                <div className="flex items-center gap-1 text-xs text-[#6b5887] mt-1 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8c7da3]" />
                  <span>{ch.location}</span>
                </div>

                <p className="text-xs text-[#6b5887] line-clamp-3 leading-relaxed">
                  {ch.mission}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f0e4fc] space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6b5887]">Children Supported:</span>
                  <strong className="text-[#1e1035] font-mono">{ch.beneficiariesCount}</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6b5887]">Direct Grant Disbursed:</span>
                  <strong className="text-[#8b2fc9] font-mono font-bold">₦{ch.disbursedAmountNgn.toLocaleString()}</strong>
                </div>

                <button
                  onClick={() => setSelectedCharity(ch)}
                  className="w-full mt-2 py-2.5 rounded-full bg-[#faf5ff] hover:bg-[#f5ebff] border border-[#eadcfa] text-[#8b2fc9] text-xs font-semibold transition-colors cursor-pointer"
                >
                  View Verification Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charity Details Modal */}
      {selectedCharity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1035]/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-5 my-6">
            <div className="flex items-start justify-between pb-3 border-b border-[#f0e4fc]">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-[#8b2fc9] block">
                  {selectedCharity.category} · CAC Verified
                </span>
                <h3 className="text-xl font-bold text-[#1e1035] font-heading">
                  {selectedCharity.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCharity(null)}
                className="p-1 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#6b5887]">
              <div>
                <span className="font-bold text-[#1e1035] block mb-0.5">Facility Location:</span>
                <p>{selectedCharity.location} ({selectedCharity.state})</p>
              </div>

              <div>
                <span className="font-bold text-[#1e1035] block mb-0.5">Active Impact Project:</span>
                <p className="bg-[#faf8fe] p-3 rounded-2xl border border-[#eadcfa] text-[#1e1035] leading-relaxed">
                  {selectedCharity.currentProject}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-[#faf8fe] border border-[#eadcfa]">
                  <span className="text-[10px] text-[#8c7da3] uppercase font-mono block">Registered Trustees</span>
                  <span className="font-bold font-mono text-[#1e1035] text-xs">{selectedCharity.cacNumber}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#faf8fe] border border-[#eadcfa]">
                  <span className="text-[10px] text-[#8c7da3] uppercase font-mono block">Audited Grant Disbursed</span>
                  <span className="font-bold font-mono text-[#8b2fc9] text-xs">₦{selectedCharity.disbursedAmountNgn.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#f0e4fc] flex justify-end">
              <button
                onClick={() => setSelectedCharity(null)}
                className="px-5 py-2.5 bg-[#1e1035] hover:bg-slate-800 text-white rounded-full text-xs font-semibold cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply as NGO Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1035]/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-4 my-6">
            <div className="flex items-start justify-between pb-3 border-b border-[#f0e4fc]">
              <div>
                <h3 className="text-xl font-bold text-[#1e1035] font-heading">
                  NGO Beneficiary Accreditation
                </h3>
                <p className="text-xs text-[#6b5887]">Apply for grant consideration in the next allocation cycle.</p>
              </div>
              <button
                onClick={() => {
                  setShowApplyModal(false);
                  setApplicationSubmitted(false);
                }}
                className="p-1 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="p-6 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#8b2fc9] mx-auto" />
                <h4 className="font-bold text-[#1e1035] text-sm">Application Received</h4>
                <p className="text-xs text-[#6b5887] leading-relaxed">
                  Your organization's CAC credentials have been submitted to Apex Africa Assurance LLP for vetting. We will reach out within 14 business days.
                </p>
                <button
                  onClick={() => {
                    setShowApplyModal(false);
                    setApplicationSubmitted(false);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#8b2fc9] to-[#e040fb] text-white rounded-full text-xs font-bold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setApplicationSubmitted(true);
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block font-semibold text-[#1e1035] mb-1">Organization Name</label>
                  <input required placeholder="e.g. Hope Orphanage Foundation" className="w-full px-3 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-xl text-[#1e1035]" />
                </div>
                <div>
                  <label className="block font-semibold text-[#1e1035] mb-1">CAC Registration (IT Number)</label>
                  <input required placeholder="CAC/IT/NO: 0000" className="w-full px-3 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-xl text-[#1e1035]" />
                </div>
                <div>
                  <label className="block font-semibold text-[#1e1035] mb-1">Operating State</label>
                  <input required placeholder="e.g. Lagos, Abuja, Kano" className="w-full px-3 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-xl text-[#1e1035]" />
                </div>
                <div>
                  <label className="block font-semibold text-[#1e1035] mb-1">Official Contact Email</label>
                  <input type="email" required placeholder="contact@charity.org.ng" className="w-full px-3 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-xl text-[#1e1035]" />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-bold rounded-full text-xs uppercase cursor-pointer shadow-[0_4px_16px_rgba(162,56,245,0.3)]"
                >
                  Submit for CAC Vetting
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
