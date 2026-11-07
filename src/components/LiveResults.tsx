import React, { useState } from 'react';
import { Candidate, StatePollData } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import {
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface LiveResultsProps {
  candidates: Candidate[];
  states: StatePollData[];
  onSelectState: (stateCode: string) => void;
  onCastVote: () => void;
}

export const LiveResults: React.FC<LiveResultsProps> = ({
  candidates,
  states,
  onSelectState,
  onCastVote
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'zones'>('overview');

  const totalPoolAmountNgn = candidates.reduce((sum, c) => sum + (c.totalAmountNgn || 0), 0);
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  // Compute percentages by TOTAL AMOUNT (as win is calculated based on amount)
  const chartData = [...candidates].map(c => {
    const amt = c.totalAmountNgn || 0;
    const pct = totalPoolAmountNgn > 0 ? Number(((amt / totalPoolAmountNgn) * 100).toFixed(1)) : 0;
    return {
      name: c.partyAcronym,
      fullName: c.name,
      party: c.party,
      amountNgn: amt,
      amountMillions: Number((amt / 1000000).toFixed(1)),
      votes: c.votes,
      percentage: pct,
      color: c.partyColor
    };
  }).sort((a, b) => b.amountNgn - a.amountNgn);

  // 7-day trend history demonstration data
  const trendData = [
    { day: '6d ago', Obi: 27.2, Tinubu: 26.5, Atiku: 21.0, Kwankwaso: 13.5, Others: 11.8 },
    { day: '5d ago', Obi: 27.8, Tinubu: 26.8, Atiku: 20.8, Kwankwaso: 13.4, Others: 11.2 },
    { day: '4d ago', Obi: 28.1, Tinubu: 26.2, Atiku: 20.5, Kwankwaso: 13.2, Others: 12.0 },
    { day: '3d ago', Obi: 28.5, Tinubu: 26.0, Atiku: 20.2, Kwankwaso: 12.9, Others: 12.4 },
    { day: '2d ago', Obi: 28.9, Tinubu: 26.4, Atiku: 20.0, Kwankwaso: 12.6, Others: 12.1 },
    { day: 'Yesterday', Obi: 29.4, Tinubu: 26.3, Atiku: 19.8, Kwankwaso: 12.5, Others: 12.0 },
    { day: 'Live Today', Obi: 29.7, Tinubu: 26.1, Atiku: 19.6, Kwankwaso: 12.4, Others: 12.2 }
  ];

  // Geopolitical zones summary
  const zoneStats: Record<string, { totalAmount: string; leader: string }> = {
    'North Central': { totalAmount: '₦38.2M', leader: 'Peter Obi / Bola Tinubu (Competitive)' },
    'North East': { totalAmount: '₦29.4M', leader: 'Atiku Abubakar (PDP Lead)' },
    'North West': { totalAmount: '₦58.1M', leader: 'Bola Tinubu / Rabiu Kwankwaso' },
    'South East': { totalAmount: '₦41.5M', leader: 'Peter Obi (LP Lead)' },
    'South South': { totalAmount: '₦33.8M', leader: 'Peter Obi (LP Lead)' },
    'South West': { totalAmount: '₦51.9M', leader: 'Bola Tinubu (APC Lead)' }
  };

  const filteredStates = selectedZone === 'All'
    ? states
    : states.filter(s => s.zone === selectedZone);

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-white">
      
      {/* Title & Live Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
              Win Calculated by Financial Backing
            </span>
            <span className="text-xs text-slate-500">· 100% Verified Public Ledger</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Live National Presidential Standings
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Real-time standings ranked by total financial backing (₦) contributed across all 36 states and the FCT.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-mono">Updated: Just Now</span>
          </div>

          <button
            onClick={onCastVote}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            Back Candidate (₦)
          </button>
        </div>
      </div>

      {/* Segmented View Control */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          National Overview
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'trends'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          7-Day Trend
        </button>
        <button
          onClick={() => setActiveTab('zones')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'zones'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Geopolitical Zones
        </button>
      </div>

      {/* TAB 1: National Overview (Ranked by Amount) */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Main 2-Column Split: Bar Chart + Candidate Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Bar Chart of Total Financial Backing */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 font-heading">
                    Financial Backing by Candidate (₦ Millions)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Leader is determined strictly by cumulative financial volume.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 uppercase font-mono block">National Pool</span>
                  <span className="text-sm font-mono font-black text-emerald-700">
                    ₦{(totalPoolAmountNgn / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#64748b', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      unit="M"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-lg text-xs space-y-1">
                              <p className="font-bold text-slate-900">{data.fullName} ({data.name})</p>
                              <p className="text-emerald-700 font-mono font-extrabold">₦{data.amountNgn.toLocaleString()}</p>
                              <p className="text-slate-500">{data.percentage}% of national backing</p>
                              <p className="text-slate-400">{data.votes.toLocaleString()} verified ballots</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="amountMillions" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200 text-xs text-slate-500">
                <span>Total Ballots Cast: <strong>{totalVotes.toLocaleString()}</strong></span>
                <span className="text-emerald-700 font-semibold">Rankings updated live on verified transactions</span>
              </div>
            </div>

            {/* Right: National Leaderboard Cards */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-base font-extrabold text-slate-900 font-heading mb-1">
                National Standings (Ranked by ₦ Backing)
              </h3>

              {chartData.map((cand, idx) => {
                const fullCand = candidates.find(c => c.partyAcronym === cand.name);
                return (
                  <div
                    key={cand.name}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      idx === 0
                        ? 'bg-amber-50/40 border-amber-300 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        idx === 0 ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{idx + 1}
                      </div>

                      {fullCand && (
                        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                          <img
                            src={fullCand.photoUrl}
                            alt={cand.fullName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-900 truncate font-heading">
                            {cand.fullName}
                          </h4>
                          <span
                            className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
                            style={{ backgroundColor: `${cand.color}15`, color: cand.color }}
                          >
                            {cand.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {cand.votes.toLocaleString()} verified citizens
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-black text-slate-900 font-mono">
                        ₦{(cand.amountNgn / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs font-bold text-emerald-700 font-mono">
                        {cand.percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: 7-Day Trend Line Chart */}
      {activeTab === 'trends' && (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="pb-2 border-b border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900 font-heading">
              7-Day Polling Momentum (% Share of Financial Backing)
            </h3>
            <p className="text-xs text-slate-500">
              Tracks how public backing has shifted over the past 7 daily polling cycles.
            </p>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fill: '#334155', fontSize: 12 }} />
                <YAxis unit="%" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '12px' }}
                />
                <Line type="monotone" dataKey="Obi" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Tinubu" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Atiku" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Kwankwaso" stroke="#ea580c" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Others" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-slate-200 text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" /> Peter Obi (LP)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-sky-700">
              <span className="w-3 h-3 rounded-full bg-sky-600 inline-block" /> Bola Tinubu (APC)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-red-700">
              <span className="w-3 h-3 rounded-full bg-red-600 inline-block" /> Atiku Abubakar (PDP)
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-orange-700">
              <span className="w-3 h-3 rounded-full bg-orange-600 inline-block" /> Rabiu Kwankwaso (NNPP)
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: Geopolitical Zones Summary */}
      {activeTab === 'zones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(zoneStats).map(([zoneName, zdata]) => (
              <div key={zoneName} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="text-xs uppercase font-mono font-bold text-orange-600 block">
                  {zoneName}
                </span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {zdata.totalAmount}
                </div>
                <div className="text-xs text-slate-600">
                  Leading Consensus: <strong className="text-slate-900 block">{zdata.leader}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Filter States within Zone */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h4 className="text-base font-bold text-slate-900 font-heading">
                State Breakdown by Contribution Volume
              </h4>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
              >
                <option value="All">All 6 Zones</option>
                <option value="North Central">North Central</option>
                <option value="North East">North East</option>
                <option value="North West">North West</option>
                <option value="South East">South East</option>
                <option value="South South">South South</option>
                <option value="South West">South West</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredStates.slice(0, 12).map((s) => (
                <div
                  key={s.stateCode}
                  onClick={() => onSelectState(s.stateCode)}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-500 cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 font-heading">{s.stateName}</span>
                    <span className="font-mono text-[10px] text-slate-500">{s.stateCode}</span>
                  </div>
                  <div className="text-sm font-extrabold text-emerald-700 font-mono">
                    ₦{(s.totalAmountNgn / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {s.participants.toLocaleString()} voters
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
