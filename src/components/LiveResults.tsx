import React, { useState } from 'react';
import { Candidate, StatePollData } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import {
  Clock,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Award,
  Crown
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
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-[#faf7fd]">
      
      {/* Title & Live Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ebdffa]">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b2fc9] mb-1">
            <span>Standings</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#6b5887]">Live 2027 Analytics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e1035] tracking-tight font-heading">
            Live National Presidential Standings
          </h2>
          <p className="text-sm text-[#6b5887] mt-1">
            Real-time standings ranked by total financial backing (₦) contributed across all 36 states and the FCT.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#6b5887] bg-white border border-[#eadcfa] px-3.5 py-2 rounded-full shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#8b2fc9]" />
            <span className="font-mono">Updated: Just Now</span>
          </div>

          <button
            onClick={onCastVote}
            className="px-5 py-2.5 bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-extrabold rounded-full text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(162,56,245,0.3)] cursor-pointer whitespace-nowrap"
          >
            Back Candidate (₦)
          </button>
        </div>
      </div>

      {/* Segmented View Control (Pill-styled) */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#eadcfa] w-fit text-xs font-semibold shadow-2xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#8b2fc9] text-white shadow-xs font-bold'
              : 'text-[#6b5887] hover:text-[#1e1035]'
          }`}
        >
          National Overview
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === 'trends'
              ? 'bg-[#8b2fc9] text-white shadow-xs font-bold'
              : 'text-[#6b5887] hover:text-[#1e1035]'
          }`}
        >
          7-Day Trend
        </button>
        <button
          onClick={() => setActiveTab('zones')}
          className={`px-4 py-2 rounded-full transition-all cursor-pointer ${
            activeTab === 'zones'
              ? 'bg-[#8b2fc9] text-white shadow-xs font-bold'
              : 'text-[#6b5887] hover:text-[#1e1035]'
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
            <div className="lg:col-span-7 bg-white border border-[#eadcfa] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#f0e4fc]">
                <div>
                  <h3 className="text-base font-extrabold text-[#1e1035] font-heading">
                    Financial Backing by Candidate (₦ Millions)
                  </h3>
                  <p className="text-xs text-[#6b5887]">
                    Winner is determined strictly by cumulative financial volume.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#8c7da3] uppercase font-mono block">National Pool</span>
                  <span className="text-sm font-mono font-black text-[#8b2fc9]">
                    ₦{(totalPoolAmountNgn / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1e6fc" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#4a3b63', fontSize: 12, fontWeight: 600 }}
                      axisLine={{ stroke: '#eadcfa' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#8c7da3', fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      unit="M"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="p-3 bg-white border border-[#eadcfa] rounded-2xl shadow-xl text-xs space-y-1">
                              <p className="font-bold text-[#1e1035]">{data.fullName} ({data.name})</p>
                              <p className="text-[#8b2fc9] font-mono font-extrabold">₦{data.amountNgn.toLocaleString()}</p>
                              <p className="text-[#6b5887]">{data.percentage}% of national backing</p>
                              <p className="text-[#8c7da3]">{data.votes.toLocaleString()} verified ballots</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="amountMillions" radius={[10, 10, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#f0e4fc] text-xs text-[#6b5887]">
                <span>Total Ballots Cast: <strong>{totalVotes.toLocaleString()}</strong></span>
                <span className="text-[#8b2fc9] font-semibold">Rankings updated live on verified transactions</span>
              </div>
            </div>

            {/* Right: National Leaderboard Cards styled like screenshot campaign cards */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-base font-extrabold text-[#1e1035] font-heading mb-1">
                National Standings (Ranked by ₦ Backing)
              </h3>

              {chartData.map((cand, idx) => {
                const fullCand = candidates.find(c => c.partyAcronym === cand.name);
                return (
                  <div
                    key={cand.name}
                    className={`p-4 rounded-[24px] border transition-all flex items-center justify-between gap-4 ${
                      idx === 0
                        ? 'bg-gradient-to-r from-[#faf4ff] to-white border-[#8b2fc9] shadow-md ring-1 ring-[#8b2fc9]/20'
                        : 'bg-white border-[#eadcfa] hover:border-[#8b2fc9]/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        idx === 0
                          ? 'bg-gradient-to-r from-[#8b2fc9] to-[#e040fb] text-white shadow-xs'
                          : 'bg-[#faf5ff] text-[#6b5887] border border-[#eadcfa]'
                      }`}>
                        #{idx + 1}
                      </div>

                      {fullCand && (
                        <div className="w-11 h-11 rounded-[16px] overflow-hidden shrink-0 border border-[#eadcfa] bg-[#faf5ff]">
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
                          <h4 className="text-sm font-bold text-[#1e1035] truncate font-heading">
                            {cand.fullName}
                          </h4>
                          <span
                            className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full"
                            style={{ backgroundColor: `${cand.color}15`, color: cand.color }}
                          >
                            {cand.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6b5887] font-mono">
                          {cand.votes.toLocaleString()} verified citizens
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-black text-[#1e1035] font-mono">
                        ₦{(cand.amountNgn / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-xs font-bold text-[#8b2fc9] font-mono">
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
        <div className="bg-white border border-[#eadcfa] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="pb-3 border-b border-[#f0e4fc]">
            <h3 className="text-base font-extrabold text-[#1e1035] font-heading">
              7-Day Polling Momentum (% Share of Financial Backing)
            </h3>
            <p className="text-xs text-[#6b5887]">
              Tracks how public backing has shifted over the past 7 daily polling cycles.
            </p>
          </div>

          <div className="h-80 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1e6fc" />
                <XAxis dataKey="day" tick={{ fill: '#4a3b63', fontSize: 12 }} />
                <YAxis unit="%" tick={{ fill: '#8c7da3', fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#eadcfa', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
                />
                <Line type="monotone" dataKey="Obi" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Tinubu" stroke="#0284c7" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Atiku" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Kwankwaso" stroke="#ea580c" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Others" stroke="#8b2fc9" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 border-t border-[#f0e4fc] text-xs">
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
              <div key={zoneName} className="p-6 rounded-[26px] bg-white border border-[#eadcfa] space-y-3 shadow-2xs">
                <span className="text-xs uppercase font-mono font-bold text-[#8b2fc9] block">
                  {zoneName}
                </span>
                <div className="text-2xl font-black text-[#1e1035] font-mono">
                  {zdata.totalAmount}
                </div>
                <div className="text-xs text-[#6b5887]">
                  Leading Consensus: <strong className="text-[#1e1035] block">{zdata.leader}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Filter States within Zone */}
          <div className="bg-white border border-[#eadcfa] rounded-[30px] p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0e4fc]">
              <h4 className="text-base font-bold text-[#1e1035] font-heading">
                State Breakdown by Contribution Volume
              </h4>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-3 py-1.5 bg-[#faf5ff] border border-[#eadcfa] rounded-full text-xs font-semibold text-[#1e1035]"
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
                  className="p-3.5 rounded-[20px] bg-[#faf8fe] border border-[#eadcfa] hover:border-[#8b2fc9] cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#1e1035] font-heading">{s.stateName}</span>
                    <span className="font-mono text-[10px] text-[#8c7da3]">{s.stateCode}</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#8b2fc9] font-mono">
                    ₦{(s.totalAmountNgn / 1000000).toFixed(2)}M
                  </div>
                  <div className="text-[11px] text-[#6b5887] truncate">
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
