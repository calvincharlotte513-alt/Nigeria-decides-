import React, { useState } from 'react';
import { Candidate } from '../types';
import { formatNgn } from '../utils/format';
import {
  Search,
  Scale,
  Award,
  BookOpen,
  X,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface CandidatesDirectoryProps {
  candidates: Candidate[];
  onSelectCandidateToVote: (candidateId: string) => void;
}

export const CandidatesDirectory: React.FC<CandidatesDirectoryProps> = ({
  candidates,
  onSelectCandidateToVote
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState<Candidate | null>(null);

  // Comparison State
  const [isComparing, setIsComparing] = useState(false);
  const [compareCand1, setCompareCand1] = useState<string>('tinubu-bola');
  const [compareCand2, setCompareCand2] = useState<string>('obi-peter');

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.partyAcronym.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const c1 = candidates.find(c => c.id === compareCand1) || candidates[0];
  const c2 = candidates.find(c => c.id === compareCand2) || candidates[1] || candidates[0];

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#ebdffa]">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b2fc9] mb-1">
            <span>Directory</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#6b5887]">Equal Exposure Constitution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1e1035] tracking-tight font-heading">
            Meet the 2027 Contenders 👥
          </h2>
          <p className="text-sm text-[#6b5887] mt-1">
            Equal public scrutiny, verifiable track records, and officially published 2027 policy manifestos.
          </p>
        </div>

        {/* Search & Compare Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-68">
            <Search className="w-4 h-4 text-[#8c7da3] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate or party..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#eadcfa] rounded-full text-xs text-[#1e1035] placeholder-[#8c7da3] focus:outline-none focus:border-[#8b2fc9] font-medium shadow-2xs"
            />
          </div>

          <button
            onClick={() => setIsComparing(true)}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#faf5ff] border border-[#eadcfa] hover:border-[#d9c4f7] text-xs font-bold text-[#1e1035] flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all shadow-2xs"
          >
            <Scale className="w-4 h-4 text-[#8b2fc9]" />
            <span>Compare Head-to-Head</span>
          </button>
        </div>
      </div>

      {/* Candidate Cards Grid (Equal Presentation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="group rounded-[28px] bg-white border border-[#eadcfa] hover:border-[#8b2fc9] p-6 shadow-2xs hover:shadow-[0_12px_36px_rgba(162,56,245,0.15)] transition-all flex flex-col justify-between space-y-5"
          >
            {/* Top row: Photo, Party Badge, Status */}
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-22 h-22 rounded-[20px] overflow-hidden shrink-0 bg-[#faf5ff] border border-[#eadcfa] shadow-xs">
                  <img
                    src={candidate.photoUrl}
                    alt={candidate.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 h-1.5"
                    style={{ backgroundColor: candidate.partyColor }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className="text-[10px] uppercase font-mono font-black px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${candidate.partyColor}15`,
                        borderColor: `${candidate.partyColor}40`,
                        color: candidate.partyColor
                      }}
                    >
                      {candidate.partyAcronym}
                    </span>
                    <span className="text-[11px] text-[#8c7da3] font-mono">
                      Age {candidate.age}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1e1035] group-hover:text-[#8b2fc9] transition-colors leading-tight font-heading">
                    {candidate.name}
                  </h3>

                  <p className="text-xs text-[#6b5887] mt-1 truncate">
                    Running Mate: <span className="text-[#1e1035] font-medium">{candidate.runningMate}</span>
                  </p>
                </div>
              </div>

              {/* Biography snippet */}
              <p className="text-xs text-[#6b5887] line-clamp-3 leading-relaxed mb-4">
                {candidate.biography}
              </p>

              {/* Financial Support Volume & Backers Card */}
              <div className="p-3.5 rounded-[20px] bg-[#faf8fe] border border-[#eadcfa] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#8c7da3] uppercase font-mono block">Financial Backing</span>
                  <span className="font-extrabold text-sm font-mono text-[#8b2fc9]">
                    {formatNgn(candidate.totalAmountNgn)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8c7da3] uppercase font-mono block">Verified Backers</span>
                  <span className="font-mono font-bold text-[#1e1035]">
                    {candidate.votes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: View Dossier + Back Candidate (₦) */}
            <div className="pt-2 flex items-center gap-2.5">
              <button
                onClick={() => setSelectedCandidateForModal(candidate)}
                className="flex-1 py-2.5 px-3 rounded-full border border-[#eadcfa] hover:bg-[#faf5ff] text-[#1e1035] text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Manifesto
              </button>

              <button
                onClick={() => onSelectCandidateToVote(candidate.id)}
                className="py-2.5 px-5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(162,56,245,0.3)] active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>Back</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Candidate Manifesto & Dossier Modal */}
      {selectedCandidateForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1035]/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6 my-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-[#f0e4fc]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-[20px] overflow-hidden shrink-0 border border-[#eadcfa] bg-[#faf5ff]">
                  <img
                    src={selectedCandidateForModal.photoUrl}
                    alt={selectedCandidateForModal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border inline-block mb-1"
                    style={{
                      backgroundColor: `${selectedCandidateForModal.partyColor}15`,
                      color: selectedCandidateForModal.partyColor,
                      borderColor: `${selectedCandidateForModal.partyColor}40`
                    }}
                  >
                    {selectedCandidateForModal.party} ({selectedCandidateForModal.partyAcronym})
                  </span>
                  <h3 className="text-xl font-bold text-[#1e1035] font-heading">
                    {selectedCandidateForModal.name}
                  </h3>
                  <p className="text-xs text-[#6b5887]">
                    Running Mate: {selectedCandidateForModal.runningMate} · Age {selectedCandidateForModal.age}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidateForModal(null)}
                className="p-1.5 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Documented Experience */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#1e1035] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#8b2fc9]" />
                <span>Documented Public Experience</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6b5887]">
                {selectedCandidateForModal.experience.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#8b2fc9] font-bold">·</span>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policy Pillars */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#1e1035] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#a238f5]" />
                <span>2027 Policy Manifesto Highlights</span>
              </h4>
              <div className="space-y-2">
                {selectedCandidateForModal.manifestoPillars.map((p, idx) => (
                  <div key={idx} className="p-3.5 rounded-[18px] bg-[#faf8fe] border border-[#eadcfa]">
                    <span className="font-bold text-xs text-[#1e1035] block font-heading">
                      {idx + 1}. {p.title}
                    </span>
                    <p className="text-[11px] text-[#6b5887] leading-relaxed mt-0.5">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-[#f0e4fc]">
              {selectedCandidateForModal.officialWebsite && (
                <a
                  href={selectedCandidateForModal.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#8b2fc9] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Official Platform</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <button
                onClick={() => {
                  const id = selectedCandidateForModal.id;
                  setSelectedCandidateForModal(null);
                  onSelectCandidateToVote(id);
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-[0_4px_16px_rgba(162,56,245,0.3)]"
              >
                Back this Candidate (From ₦1,000)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Head-to-Head Comparison Modal */}
      {isComparing && c1 && c2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1035]/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-[#eadcfa] rounded-[32px] p-6 sm:p-8 shadow-2xl space-y-6 my-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#f0e4fc]">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#8b2fc9]" />
                <h3 className="text-xl font-bold text-[#1e1035] font-heading">
                  Head-to-Head Candidate Comparison
                </h3>
              </div>

              <button
                onClick={() => setIsComparing(false)}
                className="p-1.5 rounded-full text-[#6b5887] hover:text-[#1e1035] hover:bg-[#faf5ff] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1e1035] mb-1">Candidate 1</label>
                <select
                  value={compareCand1}
                  onChange={(e) => setCompareCand1(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-full text-xs font-bold text-[#1e1035]"
                >
                  {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.partyAcronym})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1e1035] mb-1">Candidate 2</label>
                <select
                  value={compareCand2}
                  onChange={(e) => setCompareCand2(e.target.value)}
                  className="w-full px-3 py-2 bg-[#faf8fe] border border-[#eadcfa] rounded-full text-xs font-bold text-[#1e1035]"
                >
                  {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.partyAcronym})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side-by-Side Comparison Columns */}
            <div className="grid grid-cols-2 gap-4">
              {[c1, c2].map((cand) => (
                <div key={cand.id} className="p-5 rounded-[24px] bg-[#faf8fe] border border-[#eadcfa] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-[16px] overflow-hidden shrink-0 border border-[#eadcfa] bg-white">
                      <img
                        src={cand.photoUrl}
                        alt={cand.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1e1035] font-heading">{cand.name}</h4>
                      <p className="text-[11px] text-[#6b5887]">{cand.party} ({cand.partyAcronym})</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#f0e4fc]">
                      <span className="text-[#6b5887]">Financial Backing:</span>
                      <strong className="text-[#8b2fc9] font-mono">{formatNgn(cand.totalAmountNgn)}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f0e4fc]">
                      <span className="text-[#6b5887]">Citizen Backers:</span>
                      <strong className="text-[#1e1035]">{cand.votes.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f0e4fc]">
                      <span className="text-[#6b5887]">Age:</span>
                      <span className="text-[#1e1035]">{cand.age} years</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#6b5887]">Running Mate:</span>
                      <span className="text-[#1e1035]">{cand.runningMate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsComparing(false);
                      onSelectCandidateToVote(cand.id);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-[#8b2fc9] to-[#e040fb] text-white rounded-full text-xs font-bold uppercase transition-all shadow-xs"
                  >
                    Back {cand.partyAcronym}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
