/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Candidate, StatePollData, PollStats, CharityBeneficiary, SupportedLanguage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VotingModal } from './components/VotingModal';
import { LiveResults } from './components/LiveResults';
import { CivicGallery } from './components/CivicGallery';
import { CandidatesDirectory } from './components/CandidatesDirectory';
import { StatePolls } from './components/StatePolls';
import { CharityImpact } from './components/CharityImpact';
import { UserDashboard } from './components/UserDashboard';
import { AdminPortal } from './components/AdminPortal';
import { LegalNoticeModal } from './components/LegalNoticeModal';
import { Footer } from './components/Footer';
import { ArrowRight, ShieldCheck, HeartHandshake, CheckCircle2, TrendingUp, Banknote } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Modals
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'disclaimer' | 'methodology' | 'privacy' | 'terms'>('disclaimer');

  // Core Data
  const [stats, setStats] = useState<PollStats | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [states, setStates] = useState<StatePollData[]>([]);
  const [charities, setCharities] = useState<CharityBeneficiary[]>([]);
  const [_isLoadingInitial, setIsLoadingInitial] = useState(true);

  useEffect(() => {
    fetchCoreData();
  }, []);

  const fetchCoreData = async () => {
    try {
      const [statsRes, candRes, statesRes, charityRes] = await Promise.all([
        fetch('/api/poll/stats'),
        fetch('/api/candidates'),
        fetch('/api/poll/states'),
        fetch('/api/charity/transparency')
      ]);

      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(s);
      }
      if (candRes.ok) {
        const c = await candRes.json();
        setCandidates(c);
      }
      if (statesRes.ok) {
        const st = await statesRes.json();
        setStates(st);
      }
      if (charityRes.ok) {
        const ch = await charityRes.json();
        setCharities(ch.beneficiaries || []);
      }
    } catch (err) {
      console.error('Failed to load initial polling data:', err);
    } finally {
      setIsLoadingInitial(false);
    }
  };

  const handleOpenLegal = (tab: 'disclaimer' | 'methodology' | 'privacy' | 'terms') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-950">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVoteModal={() => setIsVoteModalOpen(true)}
        onOpenUserDashboard={() => setIsUserDashboardOpen(true)}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              stats={stats}
              candidates={candidates}
              currentLang={currentLang}
              onCastVote={() => setIsVoteModalOpen(true)}
              onExploreCandidates={() => {
                setActiveTab('candidates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewResults={() => {
                setActiveTab('results');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenMethodology={() => handleOpenLegal('methodology')}
            />

            {/* Main Interactive Callout Banner */}
            <section className="py-12 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 text-center lg:text-left max-w-2xl">
                    <span className="text-xs uppercase font-mono tracking-wider font-bold text-orange-600 block">
                      The Main Feature: 2027 Presidential Pre-Election Poll
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-heading">
                      Back Your Candidate in Under 60 Seconds
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Verify your citizen identity via OTP, back your candidate starting from ₦1,000, and receive a tamper-proof cryptographic receipt. National standings and victory are ranked strictly by total financial backing received.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => setIsVoteModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-heading uppercase"
                    >
                      <span>CAST YOUR VOTE (FROM ₦1,000)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsUserDashboardOpen(true)}
                      className="w-full sm:w-auto px-5 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs border border-slate-200 transition-colors cursor-pointer"
                    >
                      Verify My Receipt
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Civic Momentum & Plenty Images Gallery */}
            <CivicGallery
              onCastVote={() => setIsVoteModalOpen(true)}
              onExploreStates={() => {
                setActiveTab('states');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Live Polling Results Preview */}
            <div className="border-b border-slate-200">
              <LiveResults
                candidates={candidates}
                states={states}
                onSelectState={(_code) => {
                  setActiveTab('states');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onCastVote={() => setIsVoteModalOpen(true)}
              />
            </div>

            {/* Verified Candidates Showcase */}
            <div className="border-b border-slate-200">
              <CandidatesDirectory
                candidates={candidates}
                onSelectCandidateToVote={(_candId) => {
                  setIsVoteModalOpen(true);
                }}
              />
            </div>

            {/* State Polling Preview */}
            <div className="border-b border-slate-200">
              <StatePolls
                states={states}
                candidates={candidates}
                onCastVoteForState={(_code) => {
                  setIsVoteModalOpen(true);
                }}
              />
            </div>

            {/* Charity & Social Impact Secondary Section */}
            <div>
              <CharityImpact
                charities={charities}
                totalProceedsNgn={stats?.totalCharityProceedsNgn || 18450000}
                totalDistributedNgn={stats?.totalCharityDistributedNgn || 14800000}
                currentLang={currentLang}
              />
            </div>
          </>
        )}

        {/* Dedicated Tab: Presidential Poll */}
        {activeTab === 'poll' && (
          <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4 mb-10">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-orange-600 block">
                Direct Citizen Pre-Election Participation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
                Presidential Pre-Election Voting Experience
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mx-auto">
                Join verified citizens nationwide ahead of the 2027 Nigerian presidential race. Your vote is deduplicated, cryptographic, and completely secret. Standings and victory are calculated based on contributed financial backing (minimum ₦1,000).
              </p>
              <button
                onClick={() => setIsVoteModalOpen(true)}
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm active:scale-95 cursor-pointer inline-flex items-center gap-2 font-heading uppercase"
              >
                <span>Launch Polling Flow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Candidate Grid */}
            <CandidatesDirectory
              candidates={candidates}
              onSelectCandidateToVote={() => setIsVoteModalOpen(true)}
            />
          </div>
        )}

        {/* Dedicated Tab: Candidates */}
        {activeTab === 'candidates' && (
          <CandidatesDirectory
            candidates={candidates}
            onSelectCandidateToVote={() => setIsVoteModalOpen(true)}
          />
        )}

        {/* Dedicated Tab: Live Results */}
        {activeTab === 'results' && (
          <LiveResults
            candidates={candidates}
            states={states}
            onSelectState={() => setActiveTab('states')}
            onCastVote={() => setIsVoteModalOpen(true)}
          />
        )}

        {/* Dedicated Tab: State Polls */}
        {activeTab === 'states' && (
          <StatePolls
            states={states}
            candidates={candidates}
            onCastVoteForState={() => setIsVoteModalOpen(true)}
          />
        )}

        {/* Dedicated Tab: Charity Impact */}
        {activeTab === 'charity' && (
          <CharityImpact
            charities={charities}
            totalProceedsNgn={stats?.totalCharityProceedsNgn || 18450000}
            totalDistributedNgn={stats?.totalCharityDistributedNgn || 14800000}
            currentLang={currentLang}
          />
        )}

        {/* Dedicated Tab: About & Methodology */}
        {activeTab === 'about' && (
          <div className="py-14 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3 text-center">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-700">
                Civic Research & Platform Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
                About Nigeria Decides 2027
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto">
                An independent, non-partisan public opinion platform created to elevate citizen voices and empirical policy debate ahead of Nigeria's 2027 elections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Why Pre-Election Opinion Matters</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pre-election polling provides an empirical, scientifically verified snapshot of what citizens genuinely care about across all 36 states and the Federal Capital Territory, shifting the conversation to real policy issues and governance priorities.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-heading">
                  <HeartHandshake className="w-5 h-5 text-orange-600" />
                  <span>Social Impact Commitment</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Civic participation should foster tangible community benefit. 30% of all contributions generated through the platform directly support registered orphanages, motherless babies' homes, and youth empowerment initiatives across Nigeria.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <button
                onClick={() => handleOpenLegal('disclaimer')}
                className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer"
              >
                Read INEC Independence Disclaimer
              </button>
              <button
                onClick={() => handleOpenLegal('methodology')}
                className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer"
              >
                View Polling Methodology
              </button>
              <button
                onClick={() => handleOpenLegal('privacy')}
                className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 cursor-pointer"
              >
                NDPR Data Privacy Standards
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMethodology={() => handleOpenLegal('methodology')}
        onOpenPrivacy={() => handleOpenLegal('privacy')}
        onOpenTerms={() => handleOpenLegal('terms')}
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
      />

      {/* Interactive Modals */}
      <VotingModal
        isOpen={isVoteModalOpen}
        onClose={() => setIsVoteModalOpen(false)}
        candidates={candidates}
        currentLang={currentLang}
        onVoteCastSuccess={() => fetchCoreData()}
        onNavigateToResults={() => {
          setActiveTab('results');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <UserDashboard
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        onNavigateToResults={() => {
          setIsUserDashboardOpen(false);
          setActiveTab('results');
        }}
      />

      <AdminPortal
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
        candidates={candidates}
        charities={charities}
        onDisburseCharitySuccess={() => fetchCoreData()}
      />

      <LegalNoticeModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

    </div>
  );
}
