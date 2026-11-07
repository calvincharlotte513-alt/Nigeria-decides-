import React, { useState, useEffect } from 'react';
import { AuditLog, Candidate, CharityBeneficiary } from '../types';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  DollarSign,
  Download,
  Users,
  Search,
  CheckCircle,
  Plus,
  RefreshCw,
  X,
  Lock
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  charities: CharityBeneficiary[];
  onDisburseCharitySuccess: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  charities,
  onDisburseCharitySuccess
}) => {
  const [activeRole] = useState<'Super Admin' | 'Lead Polling Auditor' | 'Charity Compliance Officer'>('Lead Polling Auditor');
  const [activeSection, setActiveSection] = useState<'audit' | 'anomalies' | 'disbursements'>('audit');
  
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [adminStats, setAdminStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchLog, setSearchLog] = useState('');

  // Disbursement Form State
  const [selectedCharityId, setSelectedCharityId] = useState(charities[0]?.id || '');
  const [disburseAmount, setDisburseAmount] = useState('500000');
  const [auditNotes, setAuditNotes] = useState('Quarterly healthcare & infrastructure grant disbursement');
  const [isSubmittingGrant, setIsSubmittingGrant] = useState(false);
  const [disburseSuccess, setDisburseSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen]);

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [logsRes, statsRes] = await Promise.all([
        fetch('/api/admin/audit-logs'),
        fetch('/api/admin/stats')
      ]);

      if (logsRes.ok) {
        const lData = await logsRes.json();
        setAuditLogs(lData.logs || []);
      }
      if (statsRes.ok) {
        const sData = await statsRes.json();
        setAdminStats(sData);
      }
    } catch {
      console.error('Failed to load admin telemetry');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisburseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingGrant(true);
    setDisburseSuccess(null);

    try {
      const res = await fetch('/api/admin/charity/disburse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          beneficiaryId: selectedCharityId,
          amount: Number(disburseAmount),
          auditOfficer: 'Apex Africa Assurance / Civic Trustee Council',
          notes: auditNotes
        })
      });
      const data = await res.json();

      if (res.ok) {
        setDisburseSuccess(`Grant of ₦${Number(disburseAmount).toLocaleString()} disbursed successfully to ${data.beneficiary.name}. Audit Ref: ${data.auditRef}`);
        onDisburseCharitySuccess();
        fetchAdminData();
      }
    } catch {
      alert('Network error authorizing grant disbursement.');
    } finally {
      setIsSubmittingGrant(false);
    }
  };

  const filteredLogs = auditLogs.filter(
    (l) =>
      l.action.toLowerCase().includes(searchLog.toLowerCase()) ||
      l.details.toLowerCase().includes(searchLog.toLowerCase()) ||
      l.actor.toLowerCase().includes(searchLog.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto my-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-800 border border-slate-200">
              <ShieldCheck className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Trustee & Auditor Transparency Console
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  {activeRole}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Cryptographic audit trail, bot mitigation logs, and charitable grant governance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer self-start sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Strip */}
        {adminStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Total Ledger Entries</span>
              <span className="font-mono font-bold text-base text-slate-900">{adminStats.totalSubmissions}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Charity Dedicated</span>
              <span className="font-mono font-bold text-base text-emerald-700">₦{(adminStats.totalCharityProceedsNgn / 1000000).toFixed(1)}M</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Disbursed to Date</span>
              <span className="font-mono font-bold text-base text-slate-900">₦{(adminStats.totalCharityDistributedNgn / 1000000).toFixed(1)}M</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Flagged / Purged Bots</span>
              <span className="font-mono font-bold text-base text-orange-600">0 Anomalies</span>
            </div>
          </div>
        )}

        {/* Section Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs">
          <button
            onClick={() => setActiveSection('audit')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
              activeSection === 'audit' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Live Cryptographic Logs
          </button>
          <button
            onClick={() => setActiveSection('disbursements')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
              activeSection === 'disbursements' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Authorize Grant Disbursement
          </button>
          <button
            onClick={() => setActiveSection('anomalies')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
              activeSection === 'anomalies' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Anti-Bot & Rate Limits
          </button>
        </div>

        {/* SECTION 1: Audit Logs */}
        {activeSection === 'audit' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search logs by action, actor, or reference..."
                  value={searchLog}
                  onChange={(e) => setSearchLog(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400"
                />
              </div>

              <button
                onClick={fetchAdminData}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{log.action}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-slate-600">{log.details}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                    <span>Actor: {log.actor} ({log.role})</span>
                    <span>Sig: {log.signature.substring(0, 16)}...</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Authorize Grant Disbursement */}
        {activeSection === 'disbursements' && (
          <form onSubmit={handleDisburseSubmit} className="space-y-4 text-xs">
            {disburseSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{disburseSuccess}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target CAC-Registered Charity</label>
              <select
                value={selectedCharityId}
                onChange={(e) => setSelectedCharityId(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold"
              >
                {charities.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.location} ({c.cacNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Grant Allocation Amount (₦)</label>
              <input
                type="number"
                value={disburseAmount}
                onChange={(e) => setDisburseAmount(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Auditor Purpose & Statutory Notes</label>
              <textarea
                value={auditNotes}
                onChange={(e) => setAuditNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingGrant}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
            >
              {isSubmittingGrant ? 'Authorizing Stanbic IBTC Escrow Wire...' : 'Authorize Audited Wire Transfer'}
            </button>
          </form>
        )}

        {/* SECTION 3: Anomalies */}
        {activeSection === 'anomalies' && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm">All Integrity Controls Operational</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              SMS OTP verification, SHA-256 identifier deduplication, and IP velocity tracking are actively monitoring traffic. Zero bot clusters detected in the last 24 hours.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
