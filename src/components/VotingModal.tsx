import React, { useState } from 'react';
import { Candidate, SupportedLanguage } from '../types';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  ArrowRight,
  CreditCard,
  Copy,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  Banknote,
  Lock,
  HeartHandshake
} from 'lucide-react';

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
  onVoteCastSuccess: () => void;
  onNavigateToResults: () => void;
  currentLang: SupportedLanguage;
}

const NIGERIAN_STATES_LIST = [
  { code: 'AB', name: 'Abia' }, { code: 'AD', name: 'Adamawa' }, { code: 'AK', name: 'Akwa Ibom' },
  { code: 'AN', name: 'Anambra' }, { code: 'BA', name: 'Bauchi' }, { code: 'BY', name: 'Bayelsa' },
  { code: 'BE', name: 'Benue' }, { code: 'BO', name: 'Borno' }, { code: 'CR', name: 'Cross River' },
  { code: 'DE', name: 'Delta' }, { code: 'EB', name: 'Ebonyi' }, { code: 'ED', name: 'Edo' },
  { code: 'EK', name: 'Ekiti' }, { code: 'EN', name: 'Enugu' }, { code: 'FC', name: 'FCT (Abuja)' },
  { code: 'GO', name: 'Gombe' }, { code: 'IM', name: 'Imo' }, { code: 'JI', name: 'Jigawa' },
  { code: 'KD', name: 'Kaduna' }, { code: 'KN', name: 'Kano' }, { code: 'KT', name: 'Katsina' },
  { code: 'KE', name: 'Kebbi' }, { code: 'KO', name: 'Kogi' }, { code: 'KW', name: 'Kwara' },
  { code: 'LA', name: 'Lagos' }, { code: 'NA', name: 'Nasarawa' }, { code: 'NI', name: 'Niger' },
  { code: 'OG', name: 'Ogun' }, { code: 'ON', name: 'Ondo' }, { code: 'OS', name: 'Osun' },
  { code: 'OY', name: 'Oyo' }, { code: 'PL', name: 'Plateau' }, { code: 'RI', name: 'Rivers' },
  { code: 'SO', name: 'Sokoto' }, { code: 'TA', name: 'Taraba' }, { code: 'YO', name: 'Yobe' },
  { code: 'ZA', name: 'Zamfara' }
];

export const VotingModal: React.FC<VotingModalProps> = ({
  isOpen,
  onClose,
  candidates,
  onVoteCastSuccess,
  onNavigateToResults,
  currentLang: _currentLang
}) => {
  // Step tracker: 1=Identity, 2=OTP, 3=CandidateSelection, 4=Contribution, 5=Review, 6=Success
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form states
  const [identifierType, setIdentifierType] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [stateCode, setStateCode] = useState('LA');
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [otpCode, setOtpCode] = useState('');
  const [receivedTestCode, setReceivedTestCode] = useState<string | null>(null);

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  
  // Financial support amount (strictly minimum ₦1,000, no free votes)
  const [donationAmount, setDonationAmount] = useState<number>(1000);
  const [customAmountInput, setCustomAmountInput] = useState<string>('1000');
  const [paymentProvider, setPaymentProvider] = useState<'Paystack' | 'Flutterwave'>('Paystack');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Submission / Loading / Error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resultReference, setResultReference] = useState<string | null>(null);
  const [_maskedVoter, setMaskedVoter] = useState<string>('');
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen) return null;

  // Step 1 -> Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('Please enter your Nigerian phone number or email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), type: identifierType })
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to send OTP. Please check your details.');
        setIsLoading(false);
        return;
      }

      setReceivedTestCode(data.testCode || null);
      setStep(2);
    } catch {
      setErrorMessage('Network error connecting to verification gateway.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2 -> Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!otpCode.trim() || otpCode.trim().length < 6) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim(), code: otpCode.trim() })
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Invalid code. Please retry.');
        setIsLoading(false);
        return;
      }

      setStep(3); // Candidate selection
    } catch {
      setErrorMessage('Verification server error. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step 5 -> Submit Final Preference
  const handleSubmitVote = async () => {
    if (!selectedCandidateId) {
      setErrorMessage('Please choose a candidate first.');
      return;
    }
    if (donationAmount < 1000) {
      setErrorMessage('Minimum participation amount is ₦1,000. Win is calculated based on total amount.');
      return;
    }
    if (!agreeToTerms) {
      setErrorMessage('Please accept the independent civic poll participation terms.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const payload = {
        identifier: identifier.trim(),
        otpCode: otpCode.trim(),
        candidateId: selectedCandidateId,
        stateCode,
        ageGroup,
        donationAmount,
        paymentProvider,
        paymentReference: `ND27-PAY-${Date.now()}`
      };

      const res = await fetch('/api/poll/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Submission failed. Duplicate or invalid vote.');
        setIsLoading(false);
        return;
      }

      setResultReference(data.referenceCode);
      setMaskedVoter(data.maskedIdentifier || identifier);
      setStep(6);
      onVoteCastSuccess();

      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    } catch {
      setErrorMessage('Network error recording your ballot.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedCandidate = candidates.find(c => c.id === selectedCandidateId);
  const selectedState = NIGERIAN_STATES_LIST.find(s => s.code === stateCode);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  // Amount options (strictly 1,000 and above)
  const PRESET_AMOUNTS = [1000, 2500, 5000, 10000, 25000, 50000];

  const handleAmountChange = (amt: number) => {
    setDonationAmount(amt);
    setCustomAmountInput(amt.toString());
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setCustomAmountInput(valStr);
    const parsed = parseInt(valStr, 10);
    if (!isNaN(parsed) && parsed >= 1000) {
      setDonationAmount(parsed);
      setErrorMessage(null);
    } else {
      setDonationAmount(0); // Marks as invalid until >= 1000
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-xs font-heading">
              ND
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight font-heading">
                Nigeria Decides 2027
              </span>
              <span className="text-slate-500 text-xs ml-2 hidden sm:inline">· Verified Citizen Ballot</span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {step < 6 && (
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                1
              </span>
              <span className={step === 1 ? 'text-slate-900 font-bold' : 'hidden sm:inline'}>Identity</span>
            </div>
            <div className="h-0.5 w-6 sm:w-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                2
              </span>
              <span className={step === 2 ? 'text-slate-900 font-bold' : 'hidden sm:inline'}>OTP</span>
            </div>
            <div className="h-0.5 w-6 sm:w-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                3
              </span>
              <span className={step === 3 ? 'text-slate-900 font-bold' : 'hidden sm:inline'}>Candidate</span>
            </div>
            <div className="h-0.5 w-6 sm:w-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] ${step >= 4 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                4
              </span>
              <span className={step === 4 ? 'text-slate-900 font-bold' : 'hidden sm:inline'}>Backing (₦)</span>
            </div>
            <div className="h-0.5 w-6 sm:w-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-[11px] ${step >= 5 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                5
              </span>
              <span className={step === 5 ? 'text-slate-900 font-bold' : 'hidden sm:inline'}>Confirm</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block mb-0.5">Verification Notice:</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {/* STEP 1: Registration & State Origin */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 font-heading">
                  Step 1: Verify Citizen Identity
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Every participant is verified using one-time password (OTP) authentication. One verified citizen, one ballot.
                </p>
              </div>

              {/* State & Age Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    State of Residence / Origin
                  </label>
                  <select
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white font-medium"
                  >
                    {NIGERIAN_STATES_LIST.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} State
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Demographic Age Bracket
                  </label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white font-medium"
                  >
                    <option value="18-24">18 – 24 (Youth / First-time)</option>
                    <option value="25-34">25 – 34 (Young Professionals)</option>
                    <option value="35-49">35 – 49 (Mid-Career & Business)</option>
                    <option value="50-64">50 – 64 (Experienced Voters)</option>
                    <option value="65+">65+ (Elders & Community Leaders)</option>
                  </select>
                </div>
              </div>

              {/* Verification Channel Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Verification Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setIdentifierType('phone')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      identifierType === 'phone'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Nigerian Phone Number</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIdentifierType('email')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      identifierType === 'email'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span>Email Address</span>
                  </button>
                </div>
              </div>

              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {identifierType === 'phone' ? 'Mobile Number (e.g. 0803 123 4567)' : 'Personal Email Address'}
                </label>
                <input
                  type={identifierType === 'phone' ? 'tel' : 'email'}
                  placeholder={identifierType === 'phone' ? '08012345678 or +234...' : 'name@example.com'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white font-medium"
                  required
                />
              </div>

              {/* Privacy Notice */}
              <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Your phone/email is one-way hashed with SHA-256 for deduplication. It is never sold, shared with political parties, or displayed publicly.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer font-heading uppercase tracking-wider"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending 6-Digit OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: Verify OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 font-heading">
                  Step 2: Enter Verification OTP
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Enter the 6-digit verification code sent to <strong className="text-slate-900">{identifier}</strong>.
                </p>
              </div>

              {receivedTestCode && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold block">Sandbox Test Code:</span>
                    <span className="font-mono text-base font-extrabold text-emerald-700 tracking-wider">
                      {receivedTestCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOtpCode(receivedTestCode)}
                    className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 cursor-pointer"
                  >
                    Auto-Fill
                  </button>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-center">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 849201"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center tracking-[0.4em] text-3xl font-mono px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Change Contact
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer font-heading uppercase tracking-wider"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validating Identity...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Presidential Candidate Selection Grid */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 font-heading">
                  Step 3: Select Your Preferred Candidate
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Every verified candidate receives equal non-partisan presentation. Choose one candidate to back.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {candidates.map((cand) => {
                  const isSelected = selectedCandidateId === cand.id;
                  return (
                    <div
                      key={cand.id}
                      onClick={() => setSelectedCandidateId(cand.id)}
                      className={`relative p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                        isSelected
                          ? 'bg-emerald-50/50 border-emerald-600 ring-2 ring-emerald-600/20 shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      {/* Candidate Avatar */}
                      <div className="relative w-18 h-18 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                        <img
                          src={cand.photoUrl}
                          alt={cand.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          className="absolute bottom-0 inset-x-0 h-1.5"
                          style={{ backgroundColor: cand.partyColor }}
                        />
                      </div>

                      {/* Candidate Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span
                            className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded border"
                            style={{
                              backgroundColor: `${cand.partyColor}15`,
                              borderColor: `${cand.partyColor}40`,
                              color: cand.partyColor
                            }}
                          >
                            {cand.partyAcronym}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 truncate font-heading">
                          {cand.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          Running mate: {cand.runningMate}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-600">
                          <span className="font-semibold text-emerald-700 font-mono">
                            ₦{(cand.totalAmountNgn / 1000000).toFixed(1)}M Backed
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500">{cand.votes.toLocaleString()} voters</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={!selectedCandidateId}
                  onClick={() => setStep(4)}
                  className={`px-7 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                    selectedCandidateId
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 font-heading tracking-wider uppercase'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Continue to Contribution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Financial Support Amount (Minimum ₦1,000, Custom Input, Win by Amount) */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 font-heading">
                  Step 4: Financial Civic Backing
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  In Nigeria Decides 2027, polling standings and national victory are determined by total financial support contributed by verified citizens.
                </p>
              </div>

              {/* Statutory Minimum Notice */}
              <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 text-xs text-orange-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-orange-900">
                  <TrendingUp className="w-4 h-4 text-orange-700" />
                  <span>Win Calculated by Contribution Volume</span>
                </div>
                <p className="text-orange-900/90 text-xs leading-relaxed">
                  The minimum participation contribution is <strong>₦1,000</strong>. You can choose any desired amount of ₦1,000 or greater. Standings on the national board and state leaderboards are ranked by the total monetary backing received. 30% of all contributions support verified Nigerian orphanages and children's homes under public audit.
                </p>
              </div>

              {/* Preset Amount Tiers */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2.5">
                  Select Quick Backing Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PRESET_AMOUNTS.map((amt) => {
                    const isSelected = donationAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountChange(amt)}
                        className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/20 shadow-sm'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-extrabold text-base font-mono block">
                          ₦{amt.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {amt === 1000 ? 'Minimum Ballot Tier' : amt === 5000 ? 'Standard Civic Backer' : amt >= 25000 ? 'Major Patron Tier' : 'Civic Supporter'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Desired Amount Input (Not Less Than ₦1,000) */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="custom-amount-input" className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-emerald-700" />
                    <span>Or Input Your Desired Amount (₦)</span>
                  </label>
                  <span className="text-[11px] font-mono text-slate-500">Min: ₦1,000</span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 font-mono text-lg">
                    ₦
                  </span>
                  <input
                    id="custom-amount-input"
                    type="number"
                    min={1000}
                    step={100}
                    value={customAmountInput}
                    onChange={handleCustomInputChange}
                    placeholder="Enter amount (min 1000)"
                    className={`w-full pl-9 pr-4 py-3 bg-white border rounded-xl text-lg font-mono font-bold text-slate-900 focus:outline-none transition-colors ${
                      donationAmount >= 1000
                        ? 'border-emerald-600 focus:ring-2 focus:ring-emerald-600/20'
                        : 'border-red-400 focus:ring-2 focus:ring-red-400/20'
                    }`}
                  />
                </div>

                {donationAmount < 1000 && (
                  <p className="text-[11px] text-red-600 font-medium">
                    Please enter an amount of at least ₦1,000.
                  </p>
                )}
                {donationAmount >= 1000 && (
                  <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                    <span>Candidate Backing: <strong>₦{(donationAmount * 0.7).toLocaleString()}</strong></span>
                    <span className="text-emerald-700">Charity Allocation (30%): <strong>₦{(donationAmount * 0.3).toLocaleString()}</strong></span>
                  </div>
                )}
              </div>

              {/* Payment Gateway Provider */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  Select Payment Gateway
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('Paystack')}
                    className={`flex-1 py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentProvider === 'Paystack'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>Paystack (Cards / USSD / Bank)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentProvider('Flutterwave')}
                    className={`flex-1 py-3 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      paymentProvider === 'Flutterwave'
                        ? 'border-orange-600 bg-orange-50 text-orange-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-orange-600" />
                    <span>Flutterwave (Transfer / Card)</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={donationAmount < 1000}
                  onClick={() => setStep(5)}
                  className={`px-7 py-3 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all ${
                    donationAmount >= 1000
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 font-heading tracking-wider uppercase'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Review Ballot & Pay ₦{donationAmount.toLocaleString()}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Final Review & Submission */}
          {step === 5 && selectedCandidate && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1 font-heading">
                  Step 5: Review & Seal Your Ballot
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Verify your candidate selection and financial backing before generating your cryptographic receipt.
                </p>
              </div>

              {/* Review Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-white">
                    <img
                      src={selectedCandidate.photoUrl}
                      alt={selectedCandidate.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border inline-block mb-1"
                      style={{
                        backgroundColor: `${selectedCandidate.partyColor}15`,
                        borderColor: `${selectedCandidate.partyColor}40`,
                        color: selectedCandidate.partyColor
                      }}
                    >
                      {selectedCandidate.partyAcronym}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 font-heading">
                      {selectedCandidate.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Running Mate: {selectedCandidate.runningMate}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Voting State:</span>
                    <span className="font-semibold text-slate-800">{selectedState?.name} State</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Demographic:</span>
                    <span className="font-semibold text-slate-800">{ageGroup} years</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Financial Backing:</span>
                    <span className="font-mono font-extrabold text-emerald-700 text-sm">
                      ₦{donationAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Candidate Standing Impact: +₦{donationAmount.toLocaleString()}</span>
                  <span>Payment Provider: {paymentProvider} Sandbox</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed">
                    I confirm that I am a Nigerian citizen of voting age. I acknowledge this is an independent pre-election public opinion poll and not an official INEC election. I understand that standings and winners are determined by total financial backing contributed.
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  Change Amount
                </button>

                <button
                  type="button"
                  disabled={isLoading || !agreeToTerms}
                  onClick={handleSubmitVote}
                  className={`px-8 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-sm ${
                    !isLoading && agreeToTerms
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-heading tracking-wider uppercase'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Recording Ballot & Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Submit Verified Ballot (₦{donationAmount.toLocaleString()})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Cryptographic Receipt */}
          {step === 6 && resultReference && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 font-heading">
                  Ballot Cryptographically Sealed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your civic preference has been verified and permanently recorded into the 2027 national tally.
                </p>
              </div>

              {/* Receipt Code Box */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                    Public Verification Reference
                  </span>
                  <button
                    onClick={() => copyToClipboard(resultReference)}
                    className="flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedRef ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-center font-bold text-slate-900 text-sm tracking-wider">
                  {resultReference}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 text-slate-600">
                  <div>Candidate Backed: <strong className="text-slate-900">{selectedCandidate?.name}</strong></div>
                  <div>Financial Backing: <strong className="text-emerald-700 font-mono">₦{donationAmount.toLocaleString()}</strong></div>
                  <div>State Recorded: <strong className="text-slate-900">{selectedState?.name}</strong></div>
                  <div>Status: <span className="text-emerald-700 font-semibold">Verified & Counted</span></div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToResults();
                  }}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-sm"
                >
                  View Live National Standings
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
