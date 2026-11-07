import React, { useState } from 'react';
import { Candidate } from '../types';
import {
  Search,
  Scale,
  Award,
  BookOpen,
  X,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  ShieldCheck
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

  const c1 = candidates.find(c => c.id === compareCand1);
  const c2 = candidates.find(c => c.id === compareCand2);

  return (
    <div className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 bg-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
              EQUAL EXPOSURE CONSTITUTION
            </span>
            <span className="text-xs text-slate-500 font-medium">· Non-Partisan Impartial Records</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
            Verified Presidential Candidates
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Equal public scrutiny, verifiable track records, and officially published 2027 policy manifestos.
          </p>
        </div>

        {/* Search & Compare Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-68">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search candidate or party..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          <button
            onClick={() => setIsComparing(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-800 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all shadow-xs"
          >
            <Scale className="w-4 h-4 text-orange-600" />
            <span>Compare Head-to-Head</span>
          </button>
        </div>
      </div>

      {/* Candidate Cards Grid (Equal Presentation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="group rounded-3xl bg-white border border-slate-200 hover:border-orange-500 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-5"
          >
            {/* Top row: Photo, Party Badge, Status */}
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-22 h-22 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 shadow-xs">
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
                      className="text-[10px] uppercase font-mono font-black px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${candidate.partyColor}15`,
                        borderColor: `${candidate.partyColor}40`,
                        color: candidate.partyColor
                      }}
                    >
                      {candidate.partyAcronym}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      Age {candidate.age}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-tight font-heading">
                    {candidate.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 truncate">
                    Running Mate: <span className="text-slate-700 font-medium">{candidate.runningMate}</span>
                  </p>
                </div>
              </div>

              {/* Biography snippet */}
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {candidate.biography}
              </p>

              {/* Financial Support Volume & Backers Pill */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Financial Backing</span>
                  <span className="font-extrabold text-sm font-mono text-emerald-700">
                    ₦{(candidate.totalAmountNgn / 1000000).toFixed(1)}M
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Verified Backers</span>
                  <span className="font-mono font-bold text-slate-800">
                    {candidate.votes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: View Dossier + Back Candidate (₦) */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setSelectedCandidateForModal(candidate)}
                className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-colors cursor-pointer text-center"
              >
                View Manifesto
              </button>

              <button
                onClick={() => onSelectCandidateToVote(candidate.id)}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer flex items-center gap-1.5"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-6">
            
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <img
                    src={selectedCandidateForModal.photoUrl}
                    alt={selectedCandidateForModal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border inline-block mb-1"
                    style={{
                      backgroundColor: `${selectedCandidateForModal.partyColor}15`,
                      color: selectedCandidateForModal.partyColor,
                      borderColor: `${selectedCandidateForModal.partyColor}40`
                    }}
                  >
                    {selectedCandidateForModal.party} ({selectedCandidateForModal.partyAcronym})
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {selectedCandidateForModal.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Running Mate: {selectedCandidateForModal.runningMate} · Age {selectedCandidateForModal.age}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCandidateForModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Documented Experience */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-orange-600" />
                <span>Documented Public Experience</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedCandidateForModal.experience.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">·</span>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policy Pillars */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>2027 Policy Manifesto Highlights</span>
              </h4>
              <div className="space-y-2">
                {selectedCandidateForModal.manifestoPillars.map((p, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-xs text-slate-900 block font-heading">
                      {idx + 1}. {p.title}
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-200">
              {selectedCandidateForModal.officialWebsite && (
                <a
                  href={selectedCandidateForModal.officialWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 underline font-medium"
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
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-xs"
              >
                Back this Candidate (From ₦1,000)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Head-to-Head Comparison Modal */}
      {isComparing && c1 && c2 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-orange-600" />
                <h3 className="text-xl font-bold text-slate-900 font-heading">
                  Head-to-Head Candidate Comparison
                </h3>
              </div>

              <button
                onClick={() => setIsComparing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Candidate 1</label>
                <select
                  value={compareCand1}
                  onChange={(e) => setCompareCand1(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                >
                  {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.partyAcronym})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Candidate 2</label>
                <select
                  value={compareCand2}
                  onChange={(e) => setCompareCand2(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
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
                <div key={cand.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-white">
                      <img
                        src={cand.photoUrl}
                        alt={cand.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-heading">{cand.name}</h4>
                      <p className="text-[11px] text-slate-500">{cand.party} ({cand.partyAcronym})</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Financial Backing:</span>
                      <strong className="text-emerald-700 font-mono">₦{(cand.totalAmountNgn / 1000000).toFixed(1)}M</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Citizen Backers:</span>
                      <strong className="text-slate-800">{cand.votes.toLocaleString()}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200">
                      <span className="text-slate-500">Age:</span>
                      <span className="text-slate-700">{cand.age} years</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Running Mate:</span>
                      <span className="text-slate-700">{cand.runningMate}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsComparing(false);
                      onSelectCandidateToVote(cand.id);
                    }}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase transition-colors"
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
