import React, { useState } from 'react';
import { VoterReceipt } from '../types';
import {
  ShieldCheck,
  Search,
  Copy,
  Check,
  Calendar,
  MapPin,
  RefreshCw,
  AlertCircle,
  X,
  ChevronRight
} from 'lucide-react';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToResults: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  isOpen,
  onClose,
  onNavigateToResults
}) => {
  const [query, setQuery] = useState('');
  const [receipt, setReceipt] = useState<VoterReceipt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setReceipt(null);

    if (!query.trim()) {
      setErrorMsg('Please enter a reference code or phone number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/voter/lookup?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || data.error || 'No verified ballot found.');
        setIsLoading(false);
        return;
      }

      setReceipt(data);
    } catch {
      setErrorMsg('Failed to connect to verification ledger.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyRef = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1035]/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-[0_20px_70px_rgba(124,58,237,0.2)] space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#f0e4fc]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#f5ecff] flex items-center justify-center text-[#8b2fc9]">
              <ShieldCheck className="w-5 h-5 text-[#8b2fc9]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1e1035] font-heading">
                Citizen Ballot Verification Ledger
              </h3>
              <p className="text-xs text-[#6b5887]">
                Verify your recorded civic reference and cryptographic receipt
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleLookup} className="space-y-3">
          <label className="block text-xs font-semibold text-[#1e1035]">
            Enter Participation Reference or Verified Phone/Email:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8c7da3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. NG27-LA-8492-B7F1 or 0803..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#faf8fe] border border-[#eadcfa] rounded-full text-xs text-[#1e1035] placeholder-[#8c7da3] focus:outline-none focus:border-[#8b2fc9] font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-gradient-to-r from-[#8b2fc9] to-[#e040fb] hover:opacity-95 text-white font-extrabold text-xs rounded-full transition-all cursor-pointer flex items-center gap-1.5 font-heading uppercase shadow-xs"
            >
              {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Verify</span>}
            </button>
          </div>
          <span className="text-[11px] text-[#8c7da3] block">
            Tip: Enter the reference code issued upon completing your ballot submission.
          </span>
        </form>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Receipt Card */}
        {receipt && (
          <div className="p-5 rounded-[24px] bg-[#faf8fe] border border-[#eadcfa] space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#f0e4fc] pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8b2fc9] font-bold">
                CIVIC BALLOT VERIFIED
              </span>
              <span className="text-xs text-[#8c7da3] font-mono">
                NDPR ENCRYPTED
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-[#eadcfa]">
              <span className="font-mono font-bold text-sm sm:text-base text-[#1e1035]">
                {receipt.referenceCode}
              </span>
              <button
                onClick={() => copyRef(receipt.referenceCode)}
                className="p-1.5 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff]"
              >
                {copied ? <Check className="w-4 h-4 text-[#8b2fc9]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-[#6b5887]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8c7da3]" />
                <span>State: <strong className="text-[#1e1035]">{receipt.stateName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8c7da3]" />
                <span>Recorded: <strong className="text-[#1e1035]">{new Date(receipt.timestamp).toLocaleDateString()}</strong></span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#eadcfa] flex items-center justify-between text-xs">
              <span className="text-[#6b5887]">Financial Backing Volume:</span>
              <span className="font-mono font-bold text-[#8b2fc9] text-sm">
                ₦{receipt.donationAmount ? receipt.donationAmount.toLocaleString() : '1,000'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f5ecff] border border-[#eadcfa] text-[11px] text-[#1e1035] leading-relaxed">
              {receipt.notice}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToResults();
                }}
                className="text-xs text-[#8b2fc9] hover:underline font-bold"
              >
                View Live Standings
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#1e1035] hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Close Ledger
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
