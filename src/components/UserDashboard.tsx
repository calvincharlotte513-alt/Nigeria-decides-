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
  X
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Citizen Ballot Verification Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Verify your recorded civic reference and cryptographic receipt
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <form onSubmit={handleLookup} className="space-y-3">
          <label className="block text-xs font-semibold text-slate-700">
            Enter Participation Reference or Verified Phone/Email:
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. NG27-LA-8492-B7F1 or 0803..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 font-heading uppercase"
            >
              {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Verify</span>}
            </button>
          </div>
          <span className="text-[11px] text-slate-500 block">
            Tip: Enter the reference code issued upon completing your ballot submission.
          </span>
        </form>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Receipt Card */}
        {receipt && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                CIVIC BALLOT VERIFIED
              </span>
              <span className="text-xs text-slate-500 font-mono">
                NDPR ENCRYPTED
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
              <span className="font-mono font-bold text-sm sm:text-base text-slate-900">
                {receipt.referenceCode}
              </span>
              <button
                onClick={() => copyRef(receipt.referenceCode)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>State: <strong className="text-slate-900">{receipt.stateName}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Recorded: <strong className="text-slate-900">{new Date(receipt.timestamp).toLocaleDateString()}</strong></span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Financial Backing Volume:</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">
                ₦{receipt.donationAmount ? receipt.donationAmount.toLocaleString() : '1,000'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 leading-relaxed">
              {receipt.notice}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  onClose();
                  onNavigateToResults();
                }}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-bold underline"
              >
                View Live Standings
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
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
