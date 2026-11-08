import React, { useState } from 'react';
import { StatePollData, Candidate } from '../types';
import { INITIAL_CANDIDATES, INITIAL_STATES } from '../data/initialData';
import { formatNgn } from '../utils/format';
import { NigeriaMap } from './NigeriaMap';
import {
  Vote,
  ShieldCheck,
  ChevronRight,
  ArrowRight
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
  const activeStates = states && states.length > 0 ? states : INITIAL_STATES;
  const _activeCandidates = candidates && candidates.length > 0 ? candidates : INITIAL_CANDIDATES;

  const [selectedStateCode, setSelectedStateCode] = useState<string>('LA'); // Default to Lagos
  const [searchQuery, setSearchQuery] = useState('');
  const [zoneFilter, setZoneFilter] = useState('All');

  const selectedState = activeStates.find(s => s.stateCode === selectedStateCode) || activeStates[0];

  const zones = ['All', 'North Central', 'North East', 'North West', 'South East', 'South South', 'South West'];

  const filteredStates = activeStates.filter((s) => {
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
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#ebdffa]">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b2fc9] mb-1">
            <span>Federation Coverage</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#6b5887]">36 States & FCT Registry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e1035] tracking-tight font-heading">
            36 States & FCT Civic Map 🗺️
          </h2>
          <p className="text-sm text-[#6b5887] mt-1">
            Explore citizen participation, leading political leanings, and pressing civic issues in each state.
          </p>
        </div>

        <button
          onClick={() => onCastVoteForState(selectedStateCode)}
          className="px-6 py-3 bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-extrabold rounded-full text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(162,56,245,0.3)] flex items-center gap-2 cursor-pointer self-start md:self-auto font-heading"
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

          <div className="p-4 rounded-[22px] bg-white border border-[#eadcfa] text-xs text-[#6b5887] flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8b2fc9]" />
              <span>Ballots are encrypted; individual voter details remain strictly private.</span>
            </div>
            <span className="font-mono text-[11px] text-[#8c7da3]">NDPR Compliant</span>
          </div>
        </div>

        {/* Right Column: Selected State Deep-Dive Panel */}
        <div className="lg:col-span-5 bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-7 space-y-6 shadow-2xs">
          {selectedState ? (
            <>
              <div className="flex items-start justify-between border-b border-[#f0e4fc] pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#8b2fc9] bg-[#f5ecff] px-2.5 py-0.5 rounded-full border border-[#eadcfa]">
                      {selectedState.zone}
                    </span>
                    <span className="text-xs text-[#8c7da3]">Code: {selectedState.stateCode}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#1e1035] font-heading">
                    {selectedState.stateName} State
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#8c7da3] uppercase font-mono block">Financial Volume</span>
                  <span className="text-lg font-mono font-black text-[#8b2fc9]">
                    {formatNgn(selectedState.totalAmountNgn)}
                  </span>
                </div>
              </div>

              {/* State Priority Civic Issue */}
              <div className="p-4 rounded-[20px] bg-[#faf8fe] border border-[#eadcfa] space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8b2fc9] font-bold block">
                  Top Citizen Policy Priority
                </span>
                <p className="text-xs font-semibold text-[#1e1035] leading-snug">
                  {selectedState.topCivicIssue}
                </p>
              </div>

              {/* Candidate Breakdown in State (Ranked by Amount) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1e1035] uppercase tracking-wider">
                    Candidate Standings in {selectedState.stateName}
                  </h4>
                  <span className="text-[11px] text-[#8c7da3] font-mono">
                    {selectedState.participants.toLocaleString()} verified voters
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedStateCandidates.map((cand, idx) => (
                    <div
                      key={cand.id}
                      className="p-3 bg-[#fdfbfe] rounded-[18px] border border-[#eadcfa] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                            idx === 0 ? 'bg-[#8b2fc9] text-white' : 'bg-[#faf5ff] text-[#6b5887]'
                          }`}>
                            {idx + 1}
                          </span>
                          <span className="font-bold text-[#1e1035] truncate">{cand.name}</span>
                          <span
                            className="text-[10px] font-mono px-1.5 rounded-full font-bold"
                            style={{ backgroundColor: `${cand.partyColor}20`, color: cand.partyColor }}
                          >
                            {cand.partyAcronym}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-[#1e1035]">₦{(cand.amountNgn / 1000000).toFixed(2)}M</span>
                          <span className="text-[11px] font-mono font-semibold text-[#8b2fc9] ml-1.5">({cand.percentage}%)</span>
                        </div>
                      </div>

                      {/* Progress Bar styled like screenshot */}
                      <div className="w-full h-2 bg-[#eadcfa]/50 rounded-full overflow-hidden p-0.5">
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
                className="w-full py-3.5 bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-extrabold rounded-full text-xs uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(162,56,245,0.3)] cursor-pointer text-center font-heading"
              >
                Cast Ballot for {selectedState.stateName} State (From ₦1,000)
              </button>
            </>
          ) : (
            <div className="text-center py-12 text-[#8c7da3] text-xs">
              Select a state on the map to view data.
            </div>
          )}
        </div>

      </div>

      {/* State List Directory Filter */}
      <div className="pt-6 border-t border-[#ebdffa] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-[#1e1035] font-heading">
            All 36 States & FCT Directory
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              placeholder="Filter state name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3.5 py-1.5 bg-white border border-[#eadcfa] rounded-full text-xs text-[#1e1035] placeholder-[#8c7da3]"
            />
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value)}
              className="px-3.5 py-1.5 bg-white border border-[#eadcfa] rounded-full text-xs font-semibold text-[#1e1035]"
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
              className={`p-3.5 rounded-[20px] border text-left transition-all cursor-pointer ${
                selectedStateCode === s.stateCode
                  ? 'bg-[#f5ecff] border-[#8b2fc9] text-[#8b2fc9] shadow-xs'
                  : 'bg-white border-[#eadcfa] hover:border-[#8b2fc9] text-[#1e1035]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs font-heading">{s.stateName}</span>
                <span className="text-[10px] font-mono text-[#8c7da3]">{s.stateCode}</span>
              </div>
              <span className="font-mono font-bold text-xs text-[#8b2fc9] block">
                {formatNgn(s.totalAmountNgn)}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
