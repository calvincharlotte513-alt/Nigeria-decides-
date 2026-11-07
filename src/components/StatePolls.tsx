import React, { useState } from 'react';
import { StatePollData, Candidate } from '../types';
import { NigeriaMap } from './NigeriaMap';
import {
  Vote,
  ShieldCheck,
  Building,
  TrendingUp,
  Users
} from 'lucide-react';

interface StatePollsProps {
  states: StatePollData[];
  candidates: Candidate[];
  onCastVoteForState: (stateCode: string) => void;
}

export const StatePolls: React.FC<StatePollsProps> = ({
  states,
  candidates,
  onCastVoteForState
}) => {
  const [selectedStateCode, setSelectedStateCode] = useState<string>('LA'); // Default to Lagos
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');

  const selectedState = states.find(s => s.stateCode === selectedStateCode) || states[0];

  const zones = ['All', 'North Central', 'North East', 'North West', 'South East', 'South South', 'South West'];

  const filteredStates = states.filter((s) => {
    const matchesSearch = s.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.stateCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = zoneFilter === 'All' || s.zone === zoneFilter;
    return matchesSearch && matchesZone;
  });

  // Calculate candidate breakdown for the selected state by FINANCIAL AMOUNT
  const selectedStateCandidates = selectedState ? Object.entries(selectedState.candidateVotes).map(([cid, count]) => {
    const cand = candidates.find(c => c.id === cid);
    const amount = selectedState.candidateAmounts?.[cid] || (count * 1500);
    const pct = selectedState.totalAmountNgn > 0 ? Number(((amount / selectedState.totalAmountNgn) * 100).toFixed(1)) : 0;
    return {
      id: cid,
      name: cand?.name || cid,
      partyAcronym: cand?.partyAcronym || 'IND',
      partyColor: cand?.partyColor || '#64748b',
      votes: count,
      amountNgn: amount,
      percentage: pct
    };
  }).sort((a, b) => b.amountNgn - a.amountNgn) : [];

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-white">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              FEDERATION COVERAGE
            </span>
            <span className="text-xs text-slate-500">· 36 States & FCT Polling Registry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            State-by-State Pre-Election Opinion
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Explore citizen participation, leading political leanings, and pressing civic issues in each state.
          </p>
        </div>

        <button
          onClick={() => onCastVoteForState(selectedStateCode)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start md:self-auto font-heading"
        >
          <Vote className="w-4 h-4" />
          <span>Back {selectedState?.stateName} State</span>
        </button>
      </div>

      {/* Main Grid: Interactive Map + Selected State Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Nigeria Map */}
        <div className="lg:col-span-7 space-y-4">
          <NigeriaMap
            states={states}
            selectedStateCode={selectedStateCode}
            onSelectState={(code) => setSelectedStateCode(code)}
          />

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Ballots are encrypted; individual voter phone/email remains secret.</span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">NDPR Compliant</span>
          </div>
        </div>

        {/* Right Column: Selected State Deep-Dive Panel */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-6">
          {selectedState ? (
            <>
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {selectedState.zone}
                    </span>
                    <span className="text-xs text-slate-500">Code: {selectedState.stateCode}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-heading">
                    {selectedState.stateName} State
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Financial Volume</span>
                  <span className="text-lg font-mono font-black text-emerald-700">
                    ₦{(selectedState.totalAmountNgn / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>

              {/* State Priority Civic Issue */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                  Top Citizen Policy Priority
                </span>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {selectedState.topCivicIssue}
                </p>
              </div>

              {/* Candidate Breakdown in State (Ranked by Amount) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Candidate Standings in {selectedState.stateName}
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {selectedState.participants.toLocaleString()} verified voters
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedStateCandidates.map((cand, idx) => (
                    <div
                      key={cand.id}
                      className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold ${
                            idx === 0 ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-bold text-slate-900 truncate">{cand.name}</span>
                          <span
                            className="text-[10px] font-mono px-1 rounded font-bold"
                            style={{ backgroundColor: `${cand.partyColor}20`, color: cand.partyColor }}
                          >
                            {cand.partyAcronym}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-slate-900">₦{(cand.amountNgn / 1000000).toFixed(2)}M</span>
                          <span className="text-[11px] font-mono font-semibold text-emerald-700 ml-1.5">({cand.percentage}%)</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${cand.percentage}%`,
                            backgroundColor: cand.partyColor
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onCastVoteForState(selectedState.stateCode)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer text-center font-heading"
              >
                Cast Ballot for {selectedState.stateName} State (From ₦1,000)
              </button>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a state on the map to view data.
            </div>
          )}
        </div>

      </div>

      {/* State List Directory Filter */}
      <div className="pt-6 border-t border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            All 36 States & FCT Directory
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Filter state name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400"
            />
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
            >
              {zones.map(z => (
                <option key={z} value={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredStates.map((s) => (
            <button
              key={s.stateCode}
              onClick={() => {
                setSelectedStateCode(s.stateCode);
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedStateCode === s.stateCode
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-950 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs font-heading">{s.stateName}</span>
                <span className="text-[10px] font-mono text-slate-400">{s.stateCode}</span>
              </div>
              <span className="font-mono font-bold text-xs text-emerald-700 block">
                ₦{(s.totalAmountNgn / 1000000).toFixed(1)}M
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
