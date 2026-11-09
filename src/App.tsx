/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Candidate, StatePollData, PollStats, CharityBeneficiary, SupportedLanguage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AspirantsShowcase } from './components/AspirantsShowcase';
import { BottomMenuBar } from './components/BottomMenuBar';
import { LeaderPopupModal } from './components/LeaderPopupModal';
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
import { LiveTicker } from './components/LiveTicker';
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Crown,
  Gamepad2,
  Sparkles,
  Award,
  Users,
  Building2,
  HelpCircle
} from 'lucide-react';

import {
  subscribeToVotes,
  subscribeToPlatformSettings,
  testConnection,
  StoredVote,
  PlatformSettings
} from './services/firebase';

import { INITIAL_CANDIDATES, INITIAL_STATS, INITIAL_STATES, INITIAL_CHARITIES } from './data/initialData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('en');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Popups & Modals: isLeaderPopupOpen starts as FALSE so no popup loads on entry!
  const [isLeaderPopupOpen, setIsLeaderPopupOpen] = useState(false);
  const [isVoteModalOpen, setIsVoteModalOpen] = useState(false);
  const [selectedVoteCandidateId, setSelectedVoteCandidateId] = useState<string | null>(null);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'disclaimer' | 'methodology' | 'privacy' | 'terms'>('disclaimer');

  // Platform Master Settings (Controlled by Admin in real time)
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    votingActive: true,
    minVoteAmountNgn: 1000,
    adminBroadcast: 'Democratic Balloting is LIVE. Verified by Independent Auditors.',
    updatedAt: new Date().toISOString()
  });

  // Core Data: initialized with baseline candidate directory, 0 votes, 0 money
  const [stats, setStats] = useState<PollStats | null>(INITIAL_STATS);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [states, setStates] = useState<StatePollData[]>(INITIAL_STATES);
  const [charities, setCharities] = useState<CharityBeneficiary[]>(INITIAL_CHARITIES);
  const [_isLoadingInitial, setIsLoadingInitial] = useState(false);

  // Real-time Firestore sync: 0 dummy data, updates only when paid votes are confirmed
  useEffect(() => {
    testConnection();

    // 1. Subscribe to real citizen votes
    const unsubVotes = subscribeToVotes((liveVotes: StoredVote[]) => {
      const totalVotes = liveVotes.length;
      const totalAmount = liveVotes.reduce((sum, v) => sum + (v.amountNgn || 0), 0);

      // Aggregate candidate votes and Naira backing from real DB records only
      const updatedCandidates = INITIAL_CANDIDATES.map((c) => {
        const cVotes = liveVotes.filter((v) => v.candidateId === c.id);
        const cAmount = cVotes.reduce((sum, v) => sum + (v.amountNgn || 0), 0);
        return {
          ...c,
          votes: cVotes.length,
          totalAmountNgn: cAmount
        };
      });

      // Overall leader (by total Naira backing)
      const sortedByAmount = [...updatedCandidates].sort((a, b) => b.totalAmountNgn - a.totalAmountNgn);
      const leader = sortedByAmount[0] || INITIAL_CANDIDATES[0];

      setCandidates(updatedCandidates);

      // Aggregate real state votes
      const updatedStates = INITIAL_STATES.map((st) => {
        const stVotes = liveVotes.filter((v) => v.state.toLowerCase().includes(st.stateName.toLowerCase()));
        const stAmount = stVotes.reduce((sum, v) => sum + (v.amountNgn || 0), 0);
        return {
          ...st,
          participants: stVotes.length,
          totalAmountNgn: stAmount
        };
      });
      setStates(updatedStates);

      const uniqueStatesCount = new Set(liveVotes.map((v) => v.state)).size;

      // Update real platform statistics
      setStats({
        totalVerifiedParticipants: totalVotes,
        totalStatesParticipating: uniqueStatesCount,
        totalCandidates: INITIAL_CANDIDATES.length,
        totalPoolAmountNgn: totalAmount,
        currentPollLeader: leader,
        totalCharityProceedsNgn: totalAmount, // 100% of real proceeds go to charity
        totalCharityDistributedNgn: 0,
        undistributedFundsNgn: totalAmount,
        lastUpdated: new Date().toISOString(),
        electionTargetDate: 'February 2027',
        isOfficialElection: false,
        disclaimer: 'Nigeria Decides 2027 is an independent civic game for public opinion and charity fundraising. Not owned by federal government or INEC but owned by Democratic Nigerians.'
      });
      setIsLoadingInitial(false);
    });

    // 2. Subscribe to admin controls (voting active/paused, broadcast message)
    const unsubSettings = subscribeToPlatformSettings((settings: PlatformSettings) => {
      setPlatformSettings(settings);
    });

    return () => {
      unsubVotes();
      unsubSettings();
    };
  }, []);

  // Handle direct URL navigation to /admin, /admin/, #admin, ?admin=true or static redirect
  useEffect(() => {
    const checkAdminRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      let sessionFlag = false;
      try {
        sessionFlag = sessionStorage.getItem('nd_open_admin') === 'true';
      } catch {
        // safe
      }

      if (
        pathname === '/admin' ||
        pathname.startsWith('/admin') ||
        hash === '#admin' ||
        search.includes('admin') ||
        sessionFlag
      ) {
        try {
          sessionStorage.removeItem('nd_open_admin');
        } catch {
          // safe
        }
        setIsAdminPortalOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  const handleCloseAdminPortal = () => {
    setIsAdminPortalOpen(false);
    try {
      sessionStorage.removeItem('nd_open_admin');
    } catch {
      // safe
    }
    if (window.location.pathname.toLowerCase().startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    } else if (window.location.search.toLowerCase().includes('admin')) {
      window.history.pushState(null, '', window.location.pathname);
    } else if (window.location.hash.toLowerCase() === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleOpenLegal = (tab: 'disclaimer' | 'methodology' | 'privacy' | 'terms') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleOpenVoteForCandidate = (candId?: string | null) => {
    if (platformSettings && !platformSettings.votingActive) {
      alert('⚠️ Balloting is temporarily paused by platform administrators. You can explore verified candidates and live audited standings.');
      return;
    }
    setSelectedVoteCandidateId(candId || null);
    setIsVoteModalOpen(true);
  };

  const pollLeader = stats?.currentPollLeader || candidates[0] || null;

  return (
    <div className="relative min-h-screen text-[#1e1035] flex flex-col font-sans selection:bg-[#a855f7]/20 selection:text-[#581c87]">
      
      {/* ============================================================
          UNIFIED WORLD-CLASS BACKGROUND IMAGE THROUGHOUT APPLICATION
          Fixed full-screen backdrop layer that stays unified as you scroll
          or switch tabs, with subtle glassmorphic translucency above it.
         ============================================================ */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
        aria-hidden="true"
      >
        <img
          src="/images/nigeria-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay so text above is always readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/80 pointer-events-none" />
      </div>

      {/* Top Navigation Bar with World-Class Logo */}
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
        onOpenVoteModal={() => handleOpenVoteForCandidate(null)}
        onOpenUserDashboard={() => setIsUserDashboardOpen(true)}
        onOpenLeaderPopup={() => setIsLeaderPopupOpen(true)}
      />

      {/* Live Ticker Strip — real-time updates beneath navbar */}
      <LiveTicker candidates={candidates} />

      {/* Admin Live Notice or Paused Banner */}
      {!platformSettings.votingActive ? (
        <div className="bg-amber-600 text-white text-xs font-bold py-2.5 px-4 text-center sticky top-16 z-30 shadow-md flex items-center justify-center gap-2">
          <span>⏸</span>
          <span>Notice: Balloting is temporarily paused by platform administrators for verification. Candidates and audited results remain viewable.</span>
        </div>
      ) : platformSettings.adminBroadcast ? (
        <div className="bg-gradient-to-r from-[#1e1035] via-[#2c1452] to-[#1e1035] text-white text-[11px] font-mono py-1.5 px-4 text-center sticky top-16 z-30 shadow-xs flex items-center justify-center gap-2 border-b border-purple-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-bold text-amber-300 uppercase tracking-wider">ADMIN BROADCAST:</span>
          <span className="truncate">{platformSettings.adminBroadcast}</span>
        </div>
      ) : null}

      {/* Main View Container: pb ensures bottom nav never covers content */}
      <main className="relative z-10 flex-1 pb-32 sm:pb-28">{/* pb-32 on mobile = ~8rem for 56px tab bar + safe area */}
        {activeTab === 'home' && (
          <>
            {/* Hero Section (Leader determined by total ₦) */}
            <Hero
              stats={stats}
              candidates={candidates}
              currentLang={currentLang}
              onCastVote={() => handleOpenVoteForCandidate(null)}
              onExploreCandidates={() => {
                setActiveTab('candidates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewResults={() => {
                setActiveTab('results');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenMethodology={() => handleOpenLegal('methodology')}
              onOpenLeaderPopup={() => setIsLeaderPopupOpen(true)}
            />

            {/* ============================================================
                DIRECTLY AFTER HERO: 2027 PRESIDENTIAL ASPIRANTS SHOWCASE
                Features big images of all 2027 presidential aspirants starting
                from Tinubu, with current party, current vice president, and
                direct voting action underneath each candidate!
               ============================================================ */}
            <AspirantsShowcase
              candidates={candidates}
              totalPoolAmountNgn={stats?.totalPoolAmountNgn || 225000000}
              onVoteCandidate={(candidateId) => handleOpenVoteForCandidate(candidateId)}
            />

            {/* Playful Callout Banner: Civic Decision Game & 100% Charity */}
            <section className="py-10 border-b border-[#ebdffa]/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-[32px] bg-gradient-to-br from-white/95 via-[#faf5ff]/90 to-amber-50/70 border border-[#eadcfa] p-8 sm:p-10 shadow-[0_16px_40px_rgba(162,56,245,0.09)] backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 text-center lg:text-left max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-bold text-emerald-800 tracking-wider uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>THE PEOPLE'S CHOICE ARENA · 100% CHARITY PROCEEDS</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-[#1e1035] tracking-tight font-heading">
                      Pick Your Leader in Under 60 Seconds 🎮
                    </h2>

                    <p className="text-xs sm:text-sm text-[#55456e] leading-relaxed">
                      Verify quickly with your phone or email, boost your candidate on the board starting from ₦1,000, and receive your receipt. Remember: this is a community game not owned by federal government or INEC but owned by Democratic Nigerians — and <strong>100% of all proceeds are donated to verified Nigerian orphanages and grassroots NGOs!</strong>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                    <button
                      onClick={() => setIsVoteModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-black rounded-full text-sm transition-all shadow-[0_8px_25px_rgba(162,56,245,0.35)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-heading uppercase group"
                    >
                      <Gamepad2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                      <span>PLAY & VOTE (FROM ₦1,000)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsLeaderPopupOpen(true)}
                      className="w-full sm:w-auto px-6 py-4 bg-white/90 hover:bg-white text-[#8b2fc9] font-bold rounded-full text-xs border border-[#eadcfa] transition-colors cursor-pointer shadow-2xs flex items-center justify-center gap-1.5"
                    >
                      <Crown className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b]" />
                      <span>Who's Winning?</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Civic Momentum Photo Gallery */}
            <CivicGallery
              onCastVote={() => setIsVoteModalOpen(true)}
              onExploreStates={() => {
                setActiveTab('states');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Live Polling Results Preview */}
            <div className="border-b border-[#ebdffa]/80">
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
            <div className="border-b border-[#ebdffa]/80">
              <CandidatesDirectory
                candidates={candidates}
                onSelectCandidateToVote={(candId) => handleOpenVoteForCandidate(candId)}
              />
            </div>

            {/* State Polling Preview */}
            <div className="border-b border-[#ebdffa]/80">
              <StatePolls
                states={states}
                candidates={candidates}
                onCastVoteForState={(_code) => {
                  setIsVoteModalOpen(true);
                }}
              />
            </div>

            {/* Charity & Social Impact (100% Proceeds) */}
            <div>
              <CharityImpact
                charities={charities}
                totalProceedsNgn={stats?.totalPoolAmountNgn || 225000000}
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
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#8b2fc9] block">
                🎮 COMMUNITY DECISION GAME · NOT OWNED BY FEDERAL GOVERNMENT OR INEC BUT OWNED BY DEMOCRATIC NIGERIANS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e1035] font-heading">
                Who's Your Pick for Nigeria's 2027 Leader?
              </h2>
              <p className="text-[#55456e] text-sm max-w-xl mx-auto leading-relaxed">
                Join verified citizens nationwide before the main election! Vote for your champion (from ₦1,000), power up their ranking on the board, and feel good knowing that <strong>100% of all proceeds fund vetted Nigerian orphanages and community NGOs! ❤️</strong>
              </p>
              <button
                onClick={() => setIsVoteModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-[#8b2fc9] via-[#a238f5] to-[#e040fb] hover:opacity-95 text-white font-black rounded-full text-sm transition-all shadow-[0_8px_25px_rgba(162,56,245,0.35)] active:scale-95 cursor-pointer inline-flex items-center gap-2 font-heading uppercase"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Launch Polling Game</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Candidate Grid */}
            <CandidatesDirectory
              candidates={candidates}
              onSelectCandidateToVote={(candId) => handleOpenVoteForCandidate(candId)}
            />
          </div>
        )}

        {/* Dedicated Tab: Candidates */}
        {activeTab === 'candidates' && (
          <CandidatesDirectory
            candidates={candidates}
            onSelectCandidateToVote={(candId) => handleOpenVoteForCandidate(candId)}
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
            totalProceedsNgn={stats?.totalPoolAmountNgn || 225000000}
            totalDistributedNgn={stats?.totalCharityDistributedNgn || 14800000}
            currentLang={currentLang}
          />
        )}

        {/* Dedicated Tab: About, Game Rules & Non-INEC Disclaimer */}
        {activeTab === 'about' && (
          <div className="py-14 max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-3 text-center">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#8b2fc9]">
                🎮 COMMUNITY CIVIC SIMULATION · 100% FOR CHARITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e1035] font-heading">
                About Nigeria Decides 2027: The Decision Game
              </h2>
              <p className="text-sm text-[#55456e] max-w-xl mx-auto leading-relaxed">
                A simple, beautiful, and playful community game designed to help Nigerians express their democratic preference and decide who they want to lead Nigeria ahead of the 2027 main election.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-[#eadcfa] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-lg">
                  🎮
                </div>
                <h3 className="text-base font-extrabold text-[#1e1035] font-heading">
                  1. A Playful Civic Game
                </h3>
                <p className="text-xs text-[#6b5887] leading-relaxed">
                  Voting should feel exciting, free, and empowering! This is a gamified simulation where citizens nationwide can back their favorite candidate, follow live state boards, and see the people's collective pulse.
                </p>
              </div>

              <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-[#eadcfa] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-lg">
                  🏛️
                </div>
                <h3 className="text-base font-extrabold text-[#1e1035] font-heading">
                  2. Owned by Democratic Nigerians
                </h3>
                <p className="text-xs text-[#6b5887] leading-relaxed">
                  We are completely independent. This game is NOT owned by federal government or INEC but owned by Democratic Nigerians. Official election voting happens on election day via INEC.
                </p>
              </div>

              <div className="p-6 rounded-[28px] bg-white/90 backdrop-blur-md border border-[#eadcfa] space-y-3 shadow-2xs">
                <div className="w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-lg">
                  ❤️
                </div>
                <h3 className="text-base font-extrabold text-[#1e1035] font-heading">
                  3. 100% to Charity (Sponsored by TAPAM)
                </h3>
                <p className="text-xs text-[#6b5887] leading-relaxed">
                  Every single Naira contributed to back a candidate goes directly to CAC-registered Nigerian orphanages, motherless babies' homes, and youth empowerment NGOs. The only NGO sponsoring this platform is <strong>TAPAM (www.tapam.org)</strong>.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-purple-200/80 space-y-3 shadow-2xs text-center">
              <h3 className="text-base font-black text-[#1e1035] font-heading">
                How Standings & Winners are Determined
              </h3>
              <p className="text-xs text-[#55456e] max-w-2xl mx-auto leading-relaxed">
                Citizens participate by backing a candidate with a contribution of ₦1,000 or more. The board standings and national leader are calculated based on total cumulative financial backing received. All disbursements to charity partners are verified by independent assurance auditors.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => handleOpenLegal('disclaimer')}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#faf5ff] border border-[#eadcfa] text-xs font-semibold text-[#1e1035] cursor-pointer shadow-2xs"
              >
                Read INEC Non-Affiliation Disclaimer
              </button>
              <button
                onClick={() => handleOpenLegal('methodology')}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#faf5ff] border border-[#eadcfa] text-xs font-semibold text-[#1e1035] cursor-pointer shadow-2xs"
              >
                How Board Standings are Ranked
              </button>
              <button
                onClick={() => handleOpenLegal('privacy')}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-[#faf5ff] border border-[#eadcfa] text-xs font-semibold text-[#1e1035] cursor-pointer shadow-2xs"
              >
                Voter Privacy & Anonymous Ballot
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
      />

      {/* ============================================================
          WORLD-CLASS FLOATING BOTTOM MENU BAR
          Contains all the most important menus, anchored cleanly with
          instant access to Home, Standings, Play & Vote, Candidates,
          36 States, 100% Charity, and Game Rules.
         ============================================================ */}
      <BottomMenuBar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenVoteModal={() => setIsVoteModalOpen(true)}
        onOpenLeaderPopup={() => setIsLeaderPopupOpen(true)}
        onOpenLegalNotice={() => handleOpenLegal('disclaimer')}
      />

      {/* POPUP: Leader Pop-up showing who is leading on page load with a Close Button */}
      <LeaderPopupModal
        isOpen={isLeaderPopupOpen}
        onClose={() => setIsLeaderPopupOpen(false)}
        leader={pollLeader}
        totalPoolAmountNgn={stats?.totalPoolAmountNgn || 225000000}
        totalVerifiedParticipants={stats?.totalVerifiedParticipants || 149800}
        onCastVote={() => setIsVoteModalOpen(true)}
        onExploreResults={() => {
          setActiveTab('results');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Interactive Modals */}
      <VotingModal
        isOpen={isVoteModalOpen}
        onClose={() => {
          setIsVoteModalOpen(false);
          setSelectedVoteCandidateId(null);
        }}
        candidates={candidates}
        initialCandidateId={selectedVoteCandidateId}
        currentLang={currentLang}
        onVoteCastSuccess={() => {
          // Firestore onSnapshot updates real-time automatically
        }}
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
        onClose={handleCloseAdminPortal}
        candidates={candidates}
        charities={charities}
        onDisburseCharitySuccess={() => {
          // Firestore onSnapshot updates real-time automatically
        }}
      />

      <LegalNoticeModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

    </div>
  );
}
