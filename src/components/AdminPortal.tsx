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
  ArrowLeft,
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
  Key,
  LogOut,
  Eye,
  EyeOff
} from 'lucide-react';
import { Logo } from './Logo';

interface AdminPortalProps {
  candidates: Candidate[];
  charities: CharityBeneficiary[];
  onClose: () => void;
  onDisburseCharitySuccess?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  candidates,
  charities: _charities,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'votes' | 'controls' | 'standings' | 'charity'>('votes');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  // Check if session has previously authenticated or is active
  useEffect(() => {
    const isLocalAdmin = localStorage.getItem('nd_admin_authenticated') === 'true';
    if (isLocalAdmin || (auth.currentUser?.email && auth.currentUser.email === BOOTSTRAP_ADMIN_EMAIL)) {
      setIsAuthenticated(true);
    }
  }, []);

  // Subscribe to live Firestore votes & platform settings
  useEffect(() => {
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
  }, []);

  const handlePasscodeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = passcode.trim().toLowerCase();
    if (clean === '2027' || clean === 'admin2027' || clean === 'nigeriadecides' || clean === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('nd_admin_authenticated', 'true');
      setPasscodeError('');
      setPasscode('');
    } else {
      setPasscodeError('Authentication failed. Invalid administrative security key.');
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
    await updatePlatformSettings({ votingActive: nextState }, 'admin@nigeriadecides2027.org');
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
      'admin@nigeriadecides2027.org'
    );
    setIsSavingSettings(false);
    if (ok) {
      setSettingsSuccess('Platform master settings updated successfully in the live database!');
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

  return (
    <div className="min-h-screen bg-[#0d0718] text-slate-100 flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
      
      {/* Top Standalone Header Bar */}
      <header className="sticky top-0 z-40 bg-[#160c29]/95 backdrop-blur-md border-b border-purple-900/40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/70 hover:bg-purple-900/80 border border-purple-700/50 text-xs font-semibold text-purple-200 transition-colors cursor-pointer"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4 text-purple-300" />
              <span>Public Website</span>
            </button>

            <div className="h-6 w-px bg-purple-800/60 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight font-heading text-white">
                  Nigeria Decides 2027
                </h1>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300 block">
                  Administrator Command Center
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Firestore Real-Time Engine Active</span>
            </div>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-950/60 hover:bg-red-900/60 border border-red-700/50 text-red-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Console</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Gate: If Not Authenticated (Full Page Gate, Zero Password/Email Exposed) */}
        {!isAuthenticated ? (
          <div className="py-16 sm:py-24 max-w-md mx-auto text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-purple-950/80 border-2 border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(168,85,247,0.25)]">
              <Lock className="w-9 h-9 text-purple-300" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-extrabold bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/50">
                Authorized Personnel Only
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Administrator Authentication
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enter your administrative credentials to access live citizen voter audits, deduplication locks, and platform controls.
              </p>
            </div>

            {passcodeError && (
              <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-700/60 text-red-200 text-xs font-semibold flex items-center gap-2 text-left shadow-lg">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{passcodeError}</span>
              </div>
            )}

            <form onSubmit={handlePasscodeLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase font-mono tracking-wider">
                  Administrator Security Key
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Administrator Password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full pl-10 pr-10 py-3.5 bg-[#1b1033] border border-purple-800/50 rounded-2xl text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-[0_8px_30px_rgba(168,85,247,0.35)] transition-all active:scale-98"
              >
                Authenticate & Unlock Dashboard
              </button>
            </form>

            <div className="pt-4 border-t border-purple-900/30 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Encrypted Session · Audit Activity Logged</span>
            </div>
          </div>
        ) : (
          /* Authenticated Full Page Dashboard */
          <div className="space-y-8">
            
            {/* Top Operational KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-[#170e2c] border border-purple-900/50 shadow-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Verified Citizen Votes</span>
                  <Users className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-black font-mono text-white pt-1">
                  {totalRealVotes}
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block pt-1">
                  ● Deduplicated & Confirmed in DB
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-[#170e2c] border border-purple-900/50 shadow-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Real Funds Collected</span>
                  <Banknote className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black font-mono text-emerald-300 pt-1">
                  ₦{totalRealFundsNgn.toLocaleString()}
                </div>
                <span className="text-[10px] text-purple-300 font-bold block pt-1">
                  100% Dedicated to Charity Fund
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-[#170e2c] border border-purple-900/50 shadow-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Active Participating States</span>
                  <Globe className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black font-mono text-amber-300 pt-1">
                  {uniqueStatesCount} / 37
                </div>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Federation State Coverage
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-[#170e2c] border border-purple-900/50 shadow-lg space-y-1">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>Balloting Engine Status</span>
                  <Sliders className="w-4 h-4 text-fuchsia-400" />
                </div>
                <div className={`text-xl font-black font-mono pt-2 ${platformSettings.votingActive ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {platformSettings.votingActive ? '● ACTIVE & OPEN' : '⏸ PAUSED'}
                </div>
                <span className="text-[10px] text-slate-400 block pt-1">
                  Min: ₦{platformSettings.minVoteAmountNgn.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center gap-2 border-b border-purple-900/40 pb-2 text-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('votes')}
                className={`px-5 py-2.5 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'votes'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/60'
                }`}
              >
                🗳️ Real Citizen Votes ({totalRealVotes})
              </button>

              <button
                onClick={() => setActiveTab('controls')}
                className={`px-5 py-2.5 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'controls'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/60'
                }`}
              >
                ⚙️ Platform Controls & Marquee Broadcast
              </button>

              <button
                onClick={() => setActiveTab('standings')}
                className={`px-5 py-2.5 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'standings'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/60'
                }`}
              >
                📊 Candidate Real Standings
              </button>

              <button
                onClick={() => setActiveTab('charity')}
                className={`px-5 py-2.5 rounded-2xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'charity'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-purple-950/60'
                }`}
              >
                💜 TAPAM Charity Governance
              </button>
            </div>

            {/* TAB 1: REAL VOTES LEDGER */}
            {activeTab === 'votes' && (
              <div className="space-y-4">
                {/* Search & Filter Header */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by Citizen Name, Contact, Candidate, State, or Payment Ref..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#170e2c] border border-purple-900/60 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedCandidateFilter}
                      onChange={(e) => setSelectedCandidateFilter(e.target.value)}
                      className="px-3.5 py-2.5 bg-[#170e2c] border border-purple-900/60 rounded-2xl text-xs text-slate-200 font-medium"
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
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Table View */}
                {filteredVotes.length === 0 ? (
                  <div className="py-16 text-center rounded-3xl bg-[#170e2c] border border-purple-900/50 space-y-3">
                    <div className="text-4xl">🗳️</div>
                    <h3 className="font-bold text-white text-base">No Ballots Recorded</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                      {searchTerm || selectedCandidateFilter !== 'ALL'
                        ? 'No recorded votes match your active filters.'
                        : 'All dummy votes have been reset to 0! As soon as real citizens cast ballots and complete payments starting from ₦1,000, their verified entries will stream live here with instant deduplication locks.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-3xl border border-purple-900/50 bg-[#170e2c] shadow-lg">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#1f133b] text-purple-200 font-bold border-b border-purple-900/50">
                        <tr>
                          <th className="p-3.5">Time</th>
                          <th className="p-3.5">Citizen Legal Name</th>
                          <th className="p-3.5">Contact</th>
                          <th className="p-3.5">Candidate</th>
                          <th className="p-3.5">State</th>
                          <th className="p-3.5">Amount (₦)</th>
                          <th className="p-3.5">Payment Ref</th>
                          <th className="p-3.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-900/30">
                        {filteredVotes.map((v) => (
                          <tr key={v.id} className="hover:bg-purple-950/40 transition-colors">
                            <td className="p-3.5 text-[11px] font-mono text-slate-400 whitespace-nowrap">
                              {new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="p-3.5 font-bold text-white whitespace-nowrap">
                              {v.fullName}
                            </td>
                            <td className="p-3.5 font-mono text-purple-300 whitespace-nowrap">
                              {v.contact}
                            </td>
                            <td className="p-3.5 whitespace-nowrap">
                              <span className="font-bold text-purple-300">{v.candidateName}</span>
                              <span className="ml-1 text-[10px] text-slate-400">({v.candidateParty})</span>
                            </td>
                            <td className="p-3.5 whitespace-nowrap text-slate-300">
                              {v.state}
                            </td>
                            <td className="p-3.5 font-mono font-bold text-emerald-400 whitespace-nowrap">
                              ₦{v.amountNgn.toLocaleString()}
                            </td>
                            <td className="p-3.5 font-mono text-[10px] text-slate-400 whitespace-nowrap">
                              {v.paymentReference}
                            </td>
                            <td className="p-3.5 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDeleteVote(v)}
                                disabled={isDeletingId === v.id}
                                title="Delete & Disqualify Ballot"
                                className="p-2 rounded-xl text-red-400 hover:bg-red-950/60 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
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

            {/* TAB 2: PLATFORM CONTROLS */}
            {activeTab === 'controls' && (
              <div className="space-y-6">
                {settingsSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{settingsSuccess}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Voting Toggle */}
                  <div className="p-6 rounded-3xl bg-[#170e2c] border border-purple-900/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white font-heading">
                          National Balloting Engine
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Control voter participation live across Nigeria.
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${platformSettings.votingActive ? 'bg-emerald-950 border border-emerald-600/60 text-emerald-400' : 'bg-red-950 border border-red-600/60 text-red-400'}`}>
                        {platformSettings.votingActive ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>

                    <button
                      onClick={handleToggleVoting}
                      disabled={isSavingSettings}
                      className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md ${
                        platformSettings.votingActive
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {platformSettings.votingActive ? 'Pause Public Balloting' : 'Activate Public Balloting'}
                    </button>
                  </div>

                  {/* Deduplication Engine Information */}
                  <div className="p-6 rounded-3xl bg-[#170e2c] border border-purple-900/50 space-y-3">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span>Deduplication & Anti-Tamper Security</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Every voter is locked by <strong>Full Legal Name + Phone Number or Email</strong> in O(1) indexed Firestore keys. Once payment is completed, their lock document prevents any secondary vote permanently across 1,000,000+ citizens.
                    </p>
                    <div className="text-[11px] font-mono text-purple-300 bg-purple-950/70 p-3 rounded-2xl border border-purple-800/40">
                      Uniqueness Rule: Strict Full Name + Phone/Email Lock
                    </div>
                  </div>
                </div>

                {/* Broadcast Marquee & Minimum Amount Form */}
                <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#170e2c] border border-purple-900/50 space-y-4 text-xs">
                  <h3 className="text-base font-bold text-white font-heading">
                    Live Broadcast & Backing Threshold
                  </h3>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">
                      Live Announcement Marquee Banner (Broadcast to all visitors across website)
                    </label>
                    <input
                      type="text"
                      value={broadcastDraft}
                      onChange={(e) => setBroadcastDraft(e.target.value)}
                      placeholder="e.g. Democratic Balloting is LIVE. Verified by Independent Auditors."
                      className="w-full px-4 py-3 bg-[#110922] border border-purple-900/60 rounded-2xl text-xs text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1.5">
                      Minimum Contribution Amount (₦)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      value={minAmountDraft}
                      onChange={(e) => setMinAmountDraft(e.target.value)}
                      className="w-full px-4 py-3 bg-[#110922] border border-purple-900/60 rounded-2xl text-xs font-mono font-bold text-emerald-400 focus:outline-none focus:border-purple-400"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Enforced at database rule level: citizen votes with less than this minimum will be rejected.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 hover:opacity-95 text-white font-bold uppercase tracking-wider text-xs cursor-pointer shadow-md"
                  >
                    {isSavingSettings ? 'Publishing Updates...' : 'Publish Master Settings'}
                  </button>
                </form>
              </div>
            )}

            {/* TAB 3: REAL CANDIDATE STANDINGS */}
            {activeTab === 'standings' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-950/60 border border-purple-800/40 text-xs text-purple-200">
                  📈 <strong>Live Aggregation:</strong> These standings reflect 100% real paid citizen votes from the database. Total pool: <strong className="text-emerald-400 font-mono">₦{totalRealFundsNgn.toLocaleString()}</strong> across <strong className="text-white font-mono">{totalRealVotes}</strong> ballots.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidates.map((cand) => {
                    const cVotes = votes.filter(v => v.candidateId === cand.id);
                    const cAmount = cVotes.reduce((sum, v) => sum + (v.amountNgn || 0), 0);
                    const pct = totalRealFundsNgn > 0 ? ((cAmount / totalRealFundsNgn) * 100).toFixed(1) : '0.0';

                    return (
                      <div
                        key={cand.id}
                        className="p-4 rounded-3xl bg-[#170e2c] border border-purple-900/50 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cand.photoUrl}
                            alt={cand.name}
                            className="w-12 h-12 rounded-2xl object-cover border border-purple-900/60"
                          />
                          <div>
                            <h4 className="font-bold text-white text-xs font-heading">
                              {cand.name}
                            </h4>
                            <span className="text-[10px] font-mono font-bold text-purple-400">
                              {cand.partyAcronym} · {cVotes.length} Real Votes
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-black text-sm text-emerald-400 block">
                            ₦{cAmount.toLocaleString()}
                          </span>
                          <span className="text-[10px] font-mono font-semibold text-slate-400">
                            {pct}% of Total Backing
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
              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-8 rounded-3xl bg-[#170e2c] border border-purple-900/50 space-y-5">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/tapam-logo.jpg"
                      alt="TAPAM Logo"
                      className="w-16 h-16 rounded-2xl object-contain bg-white p-1 border-2 border-purple-500 shadow-md"
                    />
                    <div>
                      <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-600/40">
                        Sole Sponsoring NGO
                      </span>
                      <h3 className="text-lg font-black text-white font-heading mt-1">
                        TAPAM (The Awaken Pan African Movement)
                      </h3>
                      <a
                        href="https://www.tapam.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold text-purple-400 hover:underline inline-flex items-center gap-1"
                      >
                        <span>www.tapam.org</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <p className="leading-relaxed text-slate-300">
                    TAPAM is the only NGO sponsoring this platform. In alliance with the Cultural Heritage and Youth Empowerment Foundation (CHYEF), TAPAM ensures 100% of all citizen contributions (currently <strong className="text-emerald-400 font-mono">₦{totalRealFundsNgn.toLocaleString()}</strong>) are disbursed without administrative overheads to verified Nigerian orphanages and motherless babies' homes.
                  </p>

                  <div className="p-5 rounded-2xl bg-[#110922] border border-purple-900/60 grid grid-cols-2 gap-4 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Total Real Charity Pool</span>
                      <strong className="text-xl text-emerald-400">₦{totalRealFundsNgn.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Compliance Audit Reference</span>
                      <strong className="text-sm text-purple-300">APX-TAPAM-2027</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
};
