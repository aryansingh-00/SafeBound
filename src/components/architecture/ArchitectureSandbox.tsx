import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Layers, 
  GitBranch, 
  CreditCard, 
  RotateCw, 
  ShieldCheck, 
  Code,
  ArrowRight,
  Zap,
  Server
} from 'lucide-react';
import { SafeBoundBackendClient } from '../../backend/api/backendClient';
import { StructuredTripRequirements, CoordinatedPackage, EscrowTransaction } from '../../backend/types/backendTypes';
import { DestinationScoreResult } from '../../backend/agents/decisionAgent';
import { BookingStateContext } from '../../backend/bookings/bookingStateMachine';

export const ArchitectureSandbox: React.FC = () => {
  const [prompt, setPrompt] = useState('I have ₹40,000 and 4 days. I want a peaceful mountain trip from Delhi with 4★ hotel.');
  const [running, setRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(0);
  
  // Pipeline State
  const [parsedReqs, setParsedReqs] = useState<StructuredTripRequirements | null>(null);
  const [rankedDestinations, setRankedDestinations] = useState<DestinationScoreResult[]>([]);
  const [generatedPkg, setGeneratedPkg] = useState<CoordinatedPackage | null>(null);
  const [escrowTx, setEscrowTx] = useState<EscrowTransaction | null>(null);
  const [bookingContext, setBookingContext] = useState<BookingStateContext | null>(null);
  const [transitUpdate, setTransitUpdate] = useState<any>(null);

  const runFullPipeline = async () => {
    setRunning(true);
    setCurrentStage(1);

    // 1. Natural Language Parser & Decision Agent
    const plan = await SafeBoundBackendClient.planTripWithAI(prompt);
    setParsedReqs(plan.parsedRequirements);
    setRankedDestinations(plan.rankedDestinations);
    setGeneratedPkg(plan.recommendedPackage);

    await new Promise((r) => setTimeout(r, 600));
    setCurrentStage(2);

    // 2. Razorpay Smart Escrow Order
    const order = SafeBoundBackendClient.createRazorpayOrder({
      tripId: plan.recommendedPackage.packageId,
      amount: plan.recommendedPackage.pricing.finalTotal,
      idempotencyKey: `IDEMP_${Date.now()}`,
    });

    const verify = SafeBoundBackendClient.verifyPayment({
      orderId: order.orderId,
      paymentId: `pay_RZP_LIVE_${Math.floor(100000 + Math.random() * 900000)}`,
      signature: 'HMAC_SHA256_VERIFIED_SECURE_TOKEN',
    });

    if (verify.transaction) {
      setEscrowTx(verify.transaction);
    }

    await new Promise((r) => setTimeout(r, 600));
    setCurrentStage(3);

    // 3. Autonomous 4-Agent Parallel Booking
    const bookingRes = await SafeBoundBackendClient.executeBooking(
      plan.recommendedPackage.packageId,
      'Aryan Singh'
    );
    setBookingContext(bookingRes);

    await new Promise((r) => setTimeout(r, 600));
    setCurrentStage(4);

    // 4. Transit Telemetry & Adaptive Transfer Adjustment
    const delay = SafeBoundBackendClient.simulateTransitDelay(
      plan.recommendedPackage.packageId,
      80
    );
    setTransitUpdate(delay);

    setCurrentStage(5);
    setRunning(false);
  };

  return (
    <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-8 shadow-2xl text-white">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-brand-400" />
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              AI Travel Commerce Backend & Swarm Pipeline
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            AI handles discovery, decision ranking and recovery reasoning • Deterministic services govern pricing, escrow and state.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            Node.js / TypeScript Architecture
          </span>
        </div>
      </div>

      {/* Natural Language Execution Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
          <span>Input Natural Language Travel Intent:</span>
          <span className="text-[11px] text-slate-500">Plain English Prompt</span>
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs font-semibold text-slate-100 focus:outline-none focus:border-brand-500 transition"
          />

          <button
            type="button"
            disabled={running}
            onClick={runFullPipeline}
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${running ? 'animate-spin' : 'fill-white'}`} />
            <span>{running ? 'Executing Pipeline...' : 'Execute Live Swarm Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* 5-Stage Live Architectural Pipeline View */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
        
        {/* Stage 1 */}
        <div className={`p-4 rounded-2xl border space-y-2 transition ${currentStage >= 1 ? 'bg-slate-900 border-brand-500/60' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-brand-400">01. PARSER</span>
            {currentStage >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <h4 className="font-extrabold text-white">Requirement Extraction</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Extracts hard budget (≤₹40K) vs soft preferences (Mountains, 4★).
          </p>
        </div>

        {/* Stage 2 */}
        <div className={`p-4 rounded-2xl border space-y-2 transition ${currentStage >= 2 ? 'bg-slate-900 border-indigo-500/60' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-indigo-400">02. DECISION</span>
            {currentStage >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <h4 className="font-extrabold text-white">Decision Scoring</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Multi-factor weights: Mussoorie (92%), Dharamshala (88%).
          </p>
        </div>

        {/* Stage 3 */}
        <div className={`p-4 rounded-2xl border space-y-2 transition ${currentStage >= 3 ? 'bg-slate-900 border-purple-500/60' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-purple-400">03. ESCROW</span>
            {currentStage >= 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <h4 className="font-extrabold text-white">Razorpay Escrow</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Deterministic price calculation + HMAC signature locked.
          </p>
        </div>

        {/* Stage 4 */}
        <div className={`p-4 rounded-2xl border space-y-2 transition ${currentStage >= 4 ? 'bg-slate-900 border-emerald-500/60' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-emerald-400">04. BOOKING</span>
            {currentStage >= 4 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <h4 className="font-extrabold text-white">Parallel Swarm</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Transport, Hotel, Chauffeur & Passes confirmed concurrently.
          </p>
        </div>

        {/* Stage 5 */}
        <div className={`p-4 rounded-2xl border space-y-2 transition ${currentStage >= 5 ? 'bg-slate-900 border-amber-500/60' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-amber-400">05. SENTINEL</span>
            {currentStage >= 5 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </div>
          <h4 className="font-extrabold text-white">Adaptive Sync</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            IRCTC delay detected ➔ Chauffeur automatically moved to 1:45 PM.
          </p>
        </div>

      </div>

      {/* Interactive JSON & Telemetry Inspection Panel */}
      {parsedReqs && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
          
          {/* Left: Backend State Machine & Pricing Inspector */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold flex items-center gap-1.5 text-brand-300">
                <Terminal className="w-4 h-4" />
                <span>Deterministic Pricing & Escrow Ledger</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">✓ 256-Bit Signed</span>
            </div>

            {generatedPkg && (
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Transport (2x Vande Bharat):</span>
                  <span className="text-white">₹{generatedPkg.pricing.transportCost}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Hotel (4 Nights 4★ Resort):</span>
                  <span className="text-white">₹{generatedPkg.pricing.hotelCost}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Private Hill Transfers:</span>
                  <span className="text-white">₹{generatedPkg.pricing.transferCost}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Curated VIP Activities:</span>
                  <span className="text-white">₹{generatedPkg.pricing.activitiesCost}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Taxes & Smart Escrow (5%):</span>
                  <span className="text-white">₹{generatedPkg.pricing.taxesAndFees}</span>
                </div>
                <div className="flex justify-between pt-2 text-xs font-bold font-sans">
                  <span className="text-brand-300">Authoritative Payable Total:</span>
                  <span className="text-emerald-400 text-sm font-mono">₹{generatedPkg.pricing.finalTotal}</span>
                </div>
              </div>
            )}

            {escrowTx && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[10px] space-y-1">
                <span className="text-slate-500 block">Razorpay Order ID: <strong className="text-slate-300">{escrowTx.orderId}</strong></span>
                <span className="text-slate-500 block">Payment Ref: <strong className="text-slate-300">{escrowTx.transactionId}</strong></span>
                <span className="text-emerald-400 block font-bold">Status: {escrowTx.status} (HMAC Verified)</span>
              </div>
            )}
          </div>

          {/* Right: Micro-Agent Swarm Confirmation Matrix */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold flex items-center gap-1.5 text-indigo-300">
                <GitBranch className="w-4 h-4" />
                <span>Micro-Agent Swarm Execution Log</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">✓ 4 Concurrent Nodes</span>
            </div>

            {bookingContext && (
              <div className="space-y-2 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-sky-300 font-bold">🚆 Transport Agent:</span>
                  <span className="text-slate-200">{bookingContext.pnrMap.transport || 'PNR-8841920412'}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-purple-300 font-bold">🏨 Hotel Agent:</span>
                  <span className="text-slate-200">{bookingContext.pnrMap.hotel || 'HTL-RES-8K92L'}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-amber-300 font-bold">🚕 Transfer Agent:</span>
                  <span className="text-slate-200">{bookingContext.pnrMap.transfer || 'CAB-SYNC-UK07-4491'}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <span className="text-emerald-300 font-bold">🎟️ Activity Agent:</span>
                  <span className="text-slate-200">{bookingContext.pnrMap.activities || 'VIP-PASS-910482'}</span>
                </div>
              </div>
            )}

            {transitUpdate && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[10px] text-amber-200 space-y-1">
                <span className="font-bold block">⚡ Live Sentinel Adaptation:</span>
                <p>Train delayed 80m ➔ Chauffeur pickup shifted from {transitUpdate.originalPickup} to {transitUpdate.adjustedPickup} with zero surcharge.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
