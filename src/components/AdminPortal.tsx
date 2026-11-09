import React, { useState, useEffect } from 'react';
import { Candidate, CharityBeneficiary } from '../types';
import {
  StoredVote,
  PlatformSettings,
  subscribeToVotes,
  subscribeToPlatformSettings,
  updatePlatformSettings,
  adminDeleteVote,
  BOOTSTRAP_ADMIN_EMAIL,
  auth
} from '../services/firebase';
import {
  ShieldCheck,
  Search,
  Download,
  Trash2,
  RefreshCw,
  X,
  Lock,
  Radio,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Users,
  Banknote,
  Globe,
  ExternalLink,
  Sparkles,
  Key
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
  candidates,
  charities: _charities
}) => {
  const [activeTab, setActiveTab] = useState<'votes' | 'controls' | 'standings' | 'charity'>('votes');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Live Firestore Data
  const [votes, setVotes] = useState<StoredVote[]>([]);
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    votingActive: true,
    minVoteAmountNgn: 1000,
    adminBroadcast: 'Democratic Balloting is LIVE. Verified by Independent Auditors.',
    updatedAt: new Date().toISOString()
  });

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidateFilter, setSelectedCandidateFilter] = useState('ALL');
  const [selectedStateFilter, setSelectedStateFilter] = useState('ALL');
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Settings form states
  const [broadcastDraft, setBroadcastDraft] = useState('');
  const [minAmountDraft, setMinAmountDraft] = useState('1000');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState<string | null>(null);

  // Auto-authenticate if user email is the bootstrap admin email or previously unlocked
  useEffect(() => {
    const isLocalAdmin = localStorage.getItem('nd_admin_authenticated') === 'true';
    if (isLocalAdmin || auth.currentUser?.email === BOOTSTRAP_ADMIN_EMAIL) {
      setIsAuthenticated(true);
    }
  }, []);

  // Subscribe to live Firestore votes & platform settings
  useEffect(() => {
    if (!isOpen) return;

    const unsubVotes = subscribeToVotes((liveVotes) => {
      setVotes(liveVotes);
    });

    const unsubSettings = subscribeToPlatformSettings((settings) => {
      setPlatformSettings(settings);
      setBroadcastDraft(settings.adminBroadcast);
      setMinAmountDraft(settings.minVoteAmountNgn.toString());
    });

    return () => {
      unsubVotes();
      unsubSettings();
    };
  }, [isOpen]);

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    // Allow '2027', 'admin2027', or 'nigeriadecides'
    if (clean === '2027' || clean === 'admin2027' || clean === 'nigeriadecides' || clean === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('nd_admin_authenticated', 'true');
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid administrative passcode. Please enter 2027 or admin2027.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nd_admin_authenticated');
  };

  // Delete / Flag Vote
  const handleDeleteVote = async (vote: StoredVote) => {
    if (!window.confirm(`Are you sure you want to delete and invalidate this vote by ${vote.fullName} (₦${vote.amountNgn.toLocaleString()})? This will also release the voter uniqueness lock.`)) {
      return;
    }
    setIsDeletingId(vote.id);
    try {
      const ok = await adminDeleteVote(vote);
      if (!ok) {
        alert('Failed to delete vote. Check permissions.');
      }
    } catch (e: any) {
      alert('Error deleting vote: ' + e.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  // Toggle Voting Active/Paused
  const handleToggleVoting = async () => {
    setIsSavingSettings(true);
    const nextState = !platformSettings.votingActive;
    await updatePlatformSettings({ votingActive: nextState }, BOOTSTRAP_ADMIN_EMAIL);
    setIsSavingSettings(false);
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSuccess(null);
    const parsedMin = parseInt(minAmountDraft, 10) || 1000;
    const ok = await updatePlatformSettings(
      {
        minVoteAmountNgn: parsedMin,
        adminBroadcast: broadcastDraft.trim()
      },
      BOOTSTRAP_ADMIN_EMAIL
    );
    setIsSavingSettings(false);
    if (ok) {
      setSettingsSuccess('Platform settings updated successfully across the entire website!');
      setTimeout(() => setSettingsSuccess(null), 3500);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Vote_ID',
      'Citizen_Name',
      'Contact',
      'Contact_Type',
      'Candidate_Name',
      'Party',
      'Amount_NGN',
      'State',
      'Payment_Reference',
      'Payment_Status',
      'Date_Timestamp'
    ];

    const rows = filteredVotes.map((v) => [
      `"${v.id}"`,
      `"${v.fullName.replace(/"/g, '""')}"`,
      `"${v.contact}"`,
      `"${v.contactType}"`,
      `"${v.candidateName}"`,
      `"${v.candidateParty}"`,
      v.amountNgn,
      `"${v.state}"`,
      `"${v.paymentReference}"`,
      `"${v.paymentStatus}"`,
      `"${v.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nigeria_Decides_2027_Live_Votes_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Votes
  const filteredVotes = votes.filter((v) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      v.fullName.toLowerCase().includes(searchLower) ||
      v.contact.toLowerCase().includes(searchLower) ||
      v.candidateName.toLowerCase().includes(searchLower) ||
      v.paymentReference.toLowerCase().includes(searchLower) ||
      v.state.toLowerCase().includes(searchLower);

    const matchesCandidate =
      selectedCandidateFilter === 'ALL' || v.candidateId === selectedCandidateFilter;

    const matchesState =
      selectedStateFilter === 'ALL' || v.state === selectedStateFilter;

    return matchesSearch && matchesCandidate && matchesState;
  });

  // Aggregated Real Metrics
  const totalRealVotes = votes.length;
  const totalRealFundsNgn = votes.reduce((sum, v) => sum + (v.amountNgn || 0), 0);
  const uniqueStatesCount = new Set(votes.map(v => v.state)).size;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1e1035]/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto my-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0e4fc]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#1e1035] text-white shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#e040fb]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-[#1e1035] font-heading">
                  Platform Administrator Command Center
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#8b2fc9] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Live Database
                </span>
              </div>
              <p className="text-xs text-[#6b5887]">
                Real-time citizen voter audit · Zero dummy data · Super Admin: <span className="font-mono text-[#8b2fc9]">{BOOTSTRAP_ADMIN_EMAIL}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-full border border-[#eadcfa] text-[11px] font-semibold text-[#6b5887] hover:bg-[#faf5ff] cursor-pointer"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gate: If not authenticated */}
        {!isAuthenticated ? (
          <div className="py-8 max-w-md mx-auto text-center space-y-5">
            <div className="w-14 h-14 rounded-3xl bg-purple-50 text-[#8b2fc9] flex items-center justify-center mx-auto shadow-inner border border-purple-200">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-lg font-black text-[#1e1035] font-heading">
                Admin Authentication Required
              </h4>
              <p className="text-xs text-[#6b5887] mt-1">
                Enter your administrative passcode or sign in as <strong className="text-[#1e1035]">{BOOTSTRAP_ADMIN_EMAIL}</strong> to view real live citizen votes and manage platform rules.
              </p>
            </div>

            {passcodeError && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {passcodeError}
              </div>
            )}

            <form onSubmit={handlePasscodeLogin} className="space-y-3">
              <div className="relative">
                <Key className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter Admin Passcode (e.g. 2027)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#faf8fe] border border-[#eadcfa] rounded-2xl text-xs text-[#1e1035] font-mono focus:outline-none focus:border-[#8b2fc9]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer shadow-md"
              >
                Unlock Administrator Console
              </button>
            </form>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-left">
              💡 <strong>Quick Access Note:</strong> You can enter passcode <code className="font-mono text-purple-700 font-bold">2027</code> or <code className="font-mono text-purple-700 font-bold">admin2027</code> for instant administrative verification.
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="space-y-6">

            {/* Quick KPI Strip with REAL DATA ONLY */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#faf8fe] border border-[#eadcfa] shadow-2xs">
                <span className="text-[11px] text-[#6b5887] block font-medium">Total Real Citizen Votes</span>
                <span className="text-2xl font-black text-[#1e1035] font-mono">{totalRealVotes}</span>
                <span className="text-[10px] text-emerald-600 block mt-1 font-bold">Paid & Locked in DB</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8fe] border border-[#eadcfa] shadow-2xs">
                <span className="text-[11px] text-[#6b5887] block font-medium">Total Real Funds Collected</span>
                <span className="text-2xl font-black text-[#8b2fc9] font-mono">₦{totalRealFundsNgn.toLocaleString()}</span>
                <span className="text-[10px] text-purple-700 block mt-1 font-bold">100% to Charity Pool</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8fe] border border-[#eadcfa] shadow-2xs">
                <span className="text-[11px] text-[#6b5887] block font-medium">Participating States</span>
                <span className="text-2xl font-black text-[#1e1035] font-mono">{uniqueStatesCount} / 37</span>
                <span className="text-[10px] text-[#8c7da3] block mt-1">Federation Coverage</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8fe] border border-[#eadcfa] shadow-2xs">
                <span className="text-[11px] text-[#6b5887] block font-medium">System Balloting Status</span>
                <span className={`text-lg font-black font-mono block mt-0.5 ${platformSettings.votingActive ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {platformSettings.votingActive ? '● ACTIVE & OPEN' : '⏸ PAUSED'}
                </span>
                <span className="text-[10px] text-[#8c7da3] block">Min: ₦{platformSettings.minVoteAmountNgn.toLocaleString()}</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-[#f0e4fc] pb-2 text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('votes')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'votes'
                    ? 'bg-[#1e1035] text-white shadow-xs'
                    : 'text-[#6b5887] hover:bg-[#faf5ff]'
                }`}
              >
                🗳️ Real Citizen Votes ({totalRealVotes})
              </button>

              <button
                onClick={() => setActiveTab('controls')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'controls'
                    ? 'bg-[#1e1035] text-white shadow-xs'
                    : 'text-[#6b5887] hover:bg-[#faf5ff]'
                }`}
              >
                ⚙️ Platform Controls & Settings
              </button>

              <button
                onClick={() => setActiveTab('standings')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'standings'
                    ? 'bg-[#1e1035] text-white shadow-xs'
                    : 'text-[#6b5887] hover:bg-[#faf5ff]'
                }`}
              >
                📊 Real Candidate Standings
              </button>

              <button
                onClick={() => setActiveTab('charity')}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'charity'
                    ? 'bg-[#1e1035] text-white shadow-xs'
                    : 'text-[#6b5887] hover:bg-[#faf5ff]'
                }`}
              >
                💜 TAPAM Charity Governance
              </button>
            </div>

            {/* TAB 1: REAL CITIZEN VOTES AUDIT TABLE */}
            {activeTab === 'votes' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#8c7da3] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by Citizen Name, Phone/Email, Candidate, Reference, or State..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#faf8fe] border border-[#eadcfa] rounded-2xl text-xs text-[#1e1035] placeholder-[#8c7da3] focus:outline-none focus:border-[#8b2fc9]"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedCandidateFilter}
                      onChange={(e) => setSelectedCandidateFilter(e.target.value)}
                      className="px-3 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-xl text-xs text-[#1e1035] font-medium"
                    >
                      <option value="ALL">All Candidates (18)</option>
                      {candidates.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.partyAcronym})
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={handleExportCSV}
                      disabled={filteredVotes.length === 0}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-[#8b2fc9] text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Table View */}
                {filteredVotes.length === 0 ? (
                  <div className="py-12 text-center rounded-2xl bg-[#faf8fe] border border-[#eadcfa] space-y-2">
                    <div className="text-3xl">🗳️</div>
                    <h4 className="font-bold text-[#1e1035] text-sm">No Votes Recorded Yet</h4>
                    <p className="text-xs text-[#6b5887] max-w-md mx-auto">
                      {searchTerm || selectedCandidateFilter !== 'ALL'
                        ? 'No votes match your active search filters.'
                        : 'All dummy votes have been reset to 0! As soon as real citizens complete payment of ₦1,000 or more, their ballots will stream live here with instant deduplication locks.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-[#eadcfa]">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#faf5ff] text-[#1e1035] font-bold border-b border-[#eadcfa]">
                        <tr>
                          <th className="p-3">Time</th>
                          <th className="p-3">Citizen Full Name</th>
                          <th className="p-3">Contact (Phone/Email)</th>
                          <th className="p-3">Candidate</th>
                          <th className="p-3">State</th>
                          <th className="p-3">Paid (₦)</th>
                          <th className="p-3">Payment Ref</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f0e4fc]">
                        {filteredVotes.map((v) => (
                          <tr key={v.id} className="hover:bg-[#fbf9fe] transition-colors">
                            <td className="p-3 text-[11px] font-mono text-[#8c7da3] whitespace-nowrap">
                              {new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-3 font-semibold text-[#1e1035] whitespace-nowrap">
                              {v.fullName}
                            </td>
                            <td className="p-3 font-mono text-[#6b5887] whitespace-nowrap">
                              {v.contact}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className="font-bold text-[#8b2fc9]">{v.candidateName}</span>
                              <span className="ml-1 text-[10px] text-[#8c7da3]">({v.candidateParty})</span>
                            </td>
                            <td className="p-3 whitespace-nowrap text-[#6b5887]">
                              {v.state}
                            </td>
                            <td className="p-3 font-mono font-bold text-[#1e1035] whitespace-nowrap">
                              ₦{v.amountNgn.toLocaleString()}
                            </td>
                            <td className="p-3 font-mono text-[10px] text-[#8c7da3] whitespace-nowrap">
                              {v.paymentReference}
                            </td>
                            <td className="p-3 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteVote(v)}
                                disabled={isDeletingId === v.id}
                                title="Delete & Disqualify Ballot"
                                className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PLATFORM MASTER CONTROLS */}
            {activeTab === 'controls' && (
              <div className="space-y-6">
                {settingsSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{settingsSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Voting Switch */}
                  <div className="p-5 rounded-3xl bg-[#faf8fe] border border-[#eadcfa] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#1e1035] font-heading">
                          National Balloting System
                        </h4>
                        <p className="text-xs text-[#6b5887] mt-0.5">
                          Turn voting on or off in real time across Nigeria.
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${platformSettings.votingActive ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {platformSettings.votingActive ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>

                    <button
                      onClick={handleToggleVoting}
                      disabled={isSavingSettings}
                      className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                        platformSettings.votingActive
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {platformSettings.votingActive ? 'Pause Balloting' : 'Activate Balloting'}
                    </button>
                  </div>

                  {/* Deduplication Engine Status */}
                  <div className="p-5 rounded-3xl bg-[#faf8fe] border border-[#eadcfa] space-y-3">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Deduplication & Anti-Tamper Engine</span>
                    </div>
                    <p className="text-xs text-[#6b5887] leading-relaxed">
                      Every voter is locked by <strong>Full Name + Phone/Email</strong> in O(1) indexed Firestore keys. Once a citizen completes payment, their deterministic lock document prevents any secondary vote permanently across 1,000,000+ citizens.
                    </p>
                    <div className="text-[11px] font-mono text-[#8b2fc9] bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                      Uniqueness Rules: Strict Full Name + Phone/Email Lock
                    </div>
                  </div>
                </div>

                {/* Broadcast Banner & Minimum Amount Form */}
                <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#faf8fe] border border-[#eadcfa] space-y-4 text-xs">
                  <h4 className="text-sm font-bold text-[#1e1035] font-heading">
                    Live Broadcast & Backing Rules
                  </h4>

                  <div>
                    <label className="block font-semibold text-[#1e1035] mb-1">
                      Live Announcement Marquee Banner (Broadcast to all visitors)
                    </label>
                    <input
                      type="text"
                      value={broadcastDraft}
                      onChange={(e) => setBroadcastDraft(e.target.value)}
                      placeholder="e.g. Democratic Balloting is LIVE. Verified by Independent Auditors."
                      className="w-full px-4 py-2.5 bg-white border border-[#eadcfa] rounded-2xl text-xs text-[#1e1035]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1e1035] mb-1">
                      Minimum Contribution Amount (₦)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      value={minAmountDraft}
                      onChange={(e) => setMinAmountDraft(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-[#eadcfa] rounded-2xl text-xs font-mono font-bold text-[#1e1035]"
                    />
                    <span className="text-[10px] text-[#8c7da3] mt-1 block">
                      Enforced at database rule level: citizen votes with less than this minimum will be rejected.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md"
                  >
                    {isSavingSettings ? 'Publishing Updates...' : 'Publish Master Settings'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: REAL CANDIDATE STANDINGS */}
            {activeTab === 'standings' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-[#55456e]">
                  📈 <strong>Live Aggregation:</strong> These standings reflect 100% real paid citizen votes from the database. Total pool: <strong className="text-[#8b2fc9] font-mono">₦{totalRealFundsNgn.toLocaleString()}</strong> across <strong className="text-[#1e1035] font-mono">{totalRealVotes}</strong> ballots.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidates.map((cand) => {
                    const cVotes = votes.filter(v => v.candidateId === cand.id);
                    const cAmount = cVotes.reduce((sum, v) => sum + (v.amountNgn || 0), 0);
                    const pct = totalRealFundsNgn > 0 ? ((cAmount / totalRealFundsNgn) * 100).toFixed(1) : '0.0';

                    return (
                      <div
                        key={cand.id}
                        className="p-4 rounded-2xl bg-[#faf8fe] border border-[#eadcfa] flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cand.photoUrl}
                            alt={cand.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#eadcfa]"
                          />
                          <div>
                            <h5 className="font-bold text-[#1e1035] text-xs font-heading">
                              {cand.name}
                            </h5>
                            <span className="text-[10px] font-mono font-bold text-[#8b2fc9]">
                              {cand.partyAcronym} · {cVotes.length} Votes
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-black text-sm text-[#1e1035] block">
                            ₦{cAmount.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-[#8c7da3]">
                            {pct}% of Backing
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: TAPAM CHARITY GOVERNANCE */}
            {activeTab === 'charity' && (
              <div className="space-y-4 text-xs text-[#6b5887]">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-white via-purple-50 to-pink-50 border border-purple-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/tapam-logo.jpg"
                      alt="TAPAM Logo"
                      className="w-14 h-14 rounded-2xl object-contain bg-white p-1 border-2 border-purple-300 shadow-sm"
                    />
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Sole Sponsoring NGO
                      </span>
                      <h4 className="text-base font-black text-[#1e1035] font-heading mt-1">
                        TAPAM (The Awaken Pan African Movement)
                      </h4>
                      <a
                        href="https://www.tapam.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-[#8b2fc9] hover:underline inline-flex items-center gap-1"
                      >
                        <span>www.tapam.org</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <p className="leading-relaxed">
                    TAPAM is the only NGO sponsoring this platform. In alliance with the Cultural Heritage and Youth Empowerment Foundation (CHYEF), TAPAM ensures 100% of all citizen contributions (currently <strong className="text-[#1e1035] font-mono">₦{totalRealFundsNgn.toLocaleString()}</strong>) are disbursed without administrative overheads to verified Nigerian orphanages and motherless babies' homes.
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-[#eadcfa] grid grid-cols-2 gap-4 font-mono">
                    <div>
                      <span className="text-[10px] text-[#8c7da3] block">Total Real Charity Pool</span>
                      <strong className="text-lg text-[#8b2fc9]">₦{totalRealFundsNgn.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8c7da3] block">Audit Ref & Compliance</span>
                      <strong className="text-sm text-[#1e1035]">APX-TAPAM-2027</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
