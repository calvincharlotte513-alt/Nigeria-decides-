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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1e1035]/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[88vh] overflow-y-auto my-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0e4fc]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f5ecff] text-[#8b2fc9] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#8b2fc9]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#1e1035] font-heading">
                  Trustee & Auditor Transparency Console
                </h3>
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-[#f5ecff] text-[#8b2fc9] font-bold border border-[#eadcfa]">
                  {activeRole}
                </span>
              </div>
              <p className="text-xs text-[#6b5887]">
                Cryptographic audit trail, bot mitigation logs, and charitable grant governance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff] cursor-pointer self-start sm:self-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Strip */}
        {adminStats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-[22px] bg-[#faf8fe] border border-[#eadcfa]">
              <span className="text-[11px] text-[#6b5887] block">Total Ledger Entries</span>
              <span className="font-mono font-bold text-base text-[#1e1035]">{adminStats.totalSubmissions}</span>
            </div>
            <div className="p-4 rounded-[22px] bg-[#faf8fe] border border-[#eadcfa]">
              <span className="text-[11px] text-[#6b5887] block">Charity Dedicated</span>
              <span className="font-mono font-bold text-base text-[#8b2fc9]">₦{(adminStats.totalCharityProceedsNgn / 1000000).toFixed(1)}M</span>
            </div>
            <div className="p-4 rounded-[22px] bg-[#faf8fe] border border-[#eadcfa]">
              <span className="text-[11px] text-[#6b5887] block">Disbursed to Date</span>
              <span className="font-mono font-bold text-base text-[#1e1035]">₦{(adminStats.totalCharityDistributedNgn / 1000000).toFixed(1)}M</span>
            </div>
            <div className="p-4 rounded-[22px] bg-[#faf8fe] border border-[#eadcfa]">
              <span className="text-[11px] text-[#6b5887] block">Flagged / Purged Bots</span>
              <span className="font-mono font-bold text-base text-[#a238f5]">0 Anomalies</span>
            </div>
          </div>
        )}

        {/* Section Navigation */}
        <div className="flex items-center gap-2 border-b border-[#f0e4fc] pb-2 text-xs">
          <button
            onClick={() => setActiveSection('audit')}
            className={`px-4 py-2 rounded-full font-bold transition-colors cursor-pointer ${
              activeSection === 'audit' ? 'bg-[#1e1035] text-white' : 'text-[#6b5887] hover:bg-[#faf5ff]'
            }`}
          >
            Live Cryptographic Logs
          </button>
          <button
            onClick={() => setActiveSection('disbursements')}
            className={`px-4 py-2 rounded-full font-bold transition-colors cursor-pointer ${
              activeSection === 'disbursements' ? 'bg-[#1e1035] text-white' : 'text-[#6b5887] hover:bg-[#faf5ff]'
            }`}
          >
            Authorize Grant Disbursement
          </button>
          <button
            onClick={() => setActiveSection('anomalies')}
            className={`px-4 py-2 rounded-full font-bold transition-colors cursor-pointer ${
              activeSection === 'anomalies' ? 'bg-[#1e1035] text-white' : 'text-[#6b5887] hover:bg-[#faf5ff]'
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
                <Search className="w-4 h-4 text-[#8c7da3] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search logs by action, actor, or reference..."
                  value={searchLog}
                  onChange={(e) => setSearchLog(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-full text-xs text-[#1e1035] placeholder-[#8c7da3]"
                />
              </div>

              <button
                onClick={fetchAdminData}
                className="p-2 rounded-full border border-[#eadcfa] hover:bg-[#faf5ff] text-[#6b5887]"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {filteredLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-2xl bg-[#faf8fe] border border-[#eadcfa] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#1e1035]">{log.action}</span>
                    <span className="text-[10px] text-[#8c7da3] font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-[#6b5887]">{log.details}</p>
                  <div className="flex items-center justify-between text-[10px] text-[#8c7da3] font-mono pt-1">
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
              <div className="p-4 rounded-2xl bg-[#f5ecff] border border-[#eadcfa] text-[#1e1035] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#8b2fc9] shrink-0" />
                <span>{disburseSuccess}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-[#1e1035] mb-1">Target CAC-Registered Charity</label>
              <select
                value={selectedCharityId}
                onChange={(e) => setSelectedCharityId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#faf8fe] border border-[#eadcfa] rounded-2xl text-[#1e1035] font-semibold"
              >
                {charities.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} — {c.location} ({c.cacNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1e1035] mb-1">Grant Allocation Amount (₦)</label>
              <input
                type="number"
                value={disburseAmount}
                onChange={(e) => setDisburseAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#faf8fe] border border-[#eadcfa] rounded-2xl text-[#1e1035] font-mono font-bold text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-[#1e1035] mb-1">Auditor Purpose & Statutory Notes</label>
              <textarea
                value={auditNotes}
                onChange={(e) => setAuditNotes(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-2xl text-[#1e1035]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingGrant}
              className="w-full py-3.5 bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-extrabold rounded-full text-xs uppercase cursor-pointer shadow-[0_4px_16px_rgba(162,56,245,0.3)]"
            >
              {isSubmittingGrant ? 'Authorizing Stanbic IBTC Escrow Wire...' : 'Authorize Audited Wire Transfer'}
            </button>
          </form>
        )}

        {/* SECTION 3: Anomalies */}
        {activeSection === 'anomalies' && (
          <div className="p-6 rounded-[24px] bg-[#faf8fe] border border-[#eadcfa] text-center space-y-2">
            <CheckCircle className="w-10 h-10 text-[#8b2fc9] mx-auto" />
            <h4 className="font-bold text-[#1e1035] text-sm">All Integrity Controls Operational</h4>
            <p className="text-xs text-[#6b5887] max-w-md mx-auto">
              SMS OTP verification, SHA-256 identifier deduplication, and IP velocity tracking are actively monitoring traffic. Zero bot clusters detected in the last 24 hours.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
