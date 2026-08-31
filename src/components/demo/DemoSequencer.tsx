import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, Zap } from 'lucide-react';

interface DemoStep {
  id: number;
  screen: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  keyMessage: string;
}

const steps: DemoStep[] = [
  {
    id: 1, screen: 'Home',
    title: '"Plan a peaceful 4-day mountain trip from Delhi under ₹40K."',
    description: 'User enters a natural language request. SafeBound parses budget, duration, origin, preferences, and safety signals in one shot.',
    visual: (
      <div className="space-y-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 font-mono text-slate-300">
          "Plan a peaceful 4-day mountain trip from Delhi under ₹40K"
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[['Budget', '₹40,000'], ['Duration', '4 Days'], ['Travellers', '2']].map(([k, v]) => (
            <div key={k} className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/30 text-center">
              <p className="text-[10px] text-slate-400">{k}</p>
              <p className="text-xs font-bold text-brand-300">{v}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    keyMessage: 'One natural language request. No forms.',
  },
  {
    id: 2, screen: 'AI Planning',
    title: 'SafeBound orchestrates 6 agents in parallel',
    description: 'The Decision Agent coordinates destination analysis, transport options, hotel availability, weather signals, safety data, and optimization in one planning cycle.',
    visual: (
      <div className="space-y-1.5 text-[11px] font-mono">
        {['Parsing requirements', 'Checking destinations', 'Checking transport', 'Checking hotels', 'Checking weather & safety', 'Optimizing package'].map((step, i) => (
          <div key={step} className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{step}</span>
          </div>
        ))}
      </div>
    ),
    keyMessage: 'Not a search engine. An orchestrated agent.',
  },
  {
    id: 3, screen: 'Results',
    title: 'AI returns only options worth considering',
    description: 'The agent doesn\'t return all results. It filters, scores, and ranks — returning 3 options with explanations. Only options that meet ALL constraints appear.',
    visual: (
      <div className="space-y-2 text-xs">
        {[
          { rank: '🥇', name: 'Mussoorie', tag: 'Best Overall', price: '₹31,300', score: '94' },
          { rank: '🥈', name: 'Dharamshala', tag: 'Best Experience', price: '₹34,200', score: '88' },
          { rank: '🥉', name: 'Nainital', tag: 'Best Budget', price: '₹27,800', score: '81' },
        ].map((d) => (
          <div key={d.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2">
              <span>{d.rank}</span>
              <div>
                <p className="font-bold text-white">{d.name}</p>
                <p className="text-[10px] text-slate-400">{d.tag}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-emerald-400">{d.price}</p>
              <p className="text-[10px] text-slate-500">Score {d.score}/100</p>
            </div>
          </div>
        ))}
      </div>
    ),
    keyMessage: 'AI decides what\'s worth considering. Not the user.',
  },
  {
    id: 4, screen: 'Package',
    title: 'One optimized package. One total.',
    description: 'Package Builder assembles the optimal combination of transport + hotel + transfers + activities. AI optimization saves ₹1,450 by finding a better train + equivalent hotel.',
    visual: (
      <div className="space-y-2 text-xs">
        {[['🚆 Transport', '₹7,800'], ['🏨 Hotel (4N)', '₹16,500'], ['🚕 Transfers', '₹2,500'], ['🎟️ Activities', '₹4,500'], ['Taxes & Fees', '₹1,000']].map(([label, val]) => (
          <div key={label} className="flex justify-between px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-300">{label}</span>
            <span className="font-mono text-white">{val}</span>
          </div>
        ))}
        <div className="flex justify-between px-2 py-2 rounded-lg bg-brand-500/20 border border-brand-500/40 font-extrabold">
          <span className="text-brand-300">TOTAL</span>
          <span className="text-white">₹31,300</span>
        </div>
        <div className="text-center text-[10px] text-emerald-400">→ Optimized: ₹29,850 · Save ₹1,450</div>
      </div>
    ),
    keyMessage: 'Not the cheapest. The best combination within constraints.',
  },
  {
    id: 5, screen: 'Traveller Details',
    title: 'Confirm before booking. Always.',
    description: 'SafeBound always shows traveller details before any booking. Saved profile data can be outdated. The user explicitly confirms — and a booking snapshot is created.',
    visual: (
      <div className="space-y-3 text-xs">
        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-[11px]">
          ⚠️ Please verify — your booking will use these exact details.
        </div>
        {[['Full Name', 'Aryan Singh'], ['Date of Birth', '15 Apr 2003'], ['Gender', 'Male']].map(([k, v]) => (
          <div key={k} className="flex justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-400">{k}</span>
            <span className="font-bold text-white">{v}</span>
          </div>
        ))}
        <button className="w-full py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">✓ Confirm & Continue</button>
      </div>
    ),
    keyMessage: 'Booking snapshot created. Profile changes won\'t affect this trip.',
  },
  {
    id: 6, screen: 'Checkout',
    title: 'Three verifications before payment',
    description: 'SafeBound independently revalidates price and availability server-side before creating the Razorpay order. The user never pays a stale price.',
    visual: (
      <div className="space-y-3 text-xs">
        {[
          { icon: '✓', label: 'Price verified by backend', sub: '₹29,850 confirmed live' },
          { icon: '✓', label: 'Availability verified', sub: 'All services confirmed available' },
          { icon: '✓', label: 'Traveller details confirmed', sub: 'Booking snapshot locked' },
        ].map(({ icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <span className="text-emerald-400 font-extrabold">{icon}</span>
            <div>
              <p className="font-bold text-white">{label}</p>
              <p className="text-[10px] text-slate-400">{sub}</p>
            </div>
          </div>
        ))}
        <button className="w-full py-2.5 rounded-xl bg-brand-600 text-white font-extrabold text-sm">Pay ₹29,850</button>
      </div>
    ),
    keyMessage: 'AI decided. Razorpay controls the money. Backend verifies both sides.',
  },
  {
    id: 7, screen: 'Booking Orchestrator',
    title: 'Sequential booking. Atomic. Rollback-safe.',
    description: 'The Booking Orchestrator coordinates 4 providers in sequence — not simultaneously. If Hotel fails, it can rollback Transport. Every step is logged.',
    visual: (
      <div className="space-y-2 text-xs">
        {[
          { icon: '🚆', label: 'Transport', status: 'CONFIRMED', color: 'text-emerald-400' },
          { icon: '🏨', label: 'Hotel', status: 'CONFIRMED', color: 'text-emerald-400' },
          { icon: '🚕', label: 'Transfer', status: 'CONFIRMED', color: 'text-emerald-400' },
          { icon: '🎟️', label: 'Activities', status: 'CONFIRMED', color: 'text-emerald-400' },
        ].map(({ icon, label, status, color }) => (
          <div key={label} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span>{icon} {label}</span>
            <span className={`font-mono font-bold text-[10px] ${color}`}>{status}</span>
          </div>
        ))}
        <div className="text-center text-lg font-extrabold text-emerald-400 pt-1">🎉 Trip Confirmed</div>
      </div>
    ),
    keyMessage: 'Deterministic. Not AI-guessed. Each confirmation is real.',
  },
  {
    id: 8, screen: 'Live Monitoring',
    title: 'Booking is not the end. It\'s the beginning.',
    description: 'SafeBound activates continuous monitoring for the trip. Transport, weather, transfers, activities — all tracked. The first change triggers impact analysis.',
    visual: (
      <div className="space-y-2 text-xs">
        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center text-emerald-300 font-bold">
          🟢 SafeBound Monitoring Active
        </div>
        {['🚆 Transport · Tracking', '⛅ Weather · Normal', '🚕 Transfers · Ready', '🎟️ Activities · Confirmed'].map((s) => (
          <div key={s} className="flex items-center gap-2 text-[11px] text-slate-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {s}
          </div>
        ))}
      </div>
    ),
    keyMessage: 'The product doesn\'t end at booking. It starts there.',
  },
  {
    id: 9, screen: 'Disruption → Recovery',
    title: 'Train +80m → Cab conflict → Auto-recovery → Itinerary v2',
    description: 'Train delay detected. Impact Analysis cascades through transfer, hotel, activities. Recovery Agent finds 3 options. Option A (₹0) auto-executes per policy. Itinerary updates to v2.',
    visual: (
      <div className="space-y-2 text-[11px]">
        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/40 font-bold text-amber-300">
          🚆 Train arrival: 12:00 PM → 01:20 PM (+80 min)
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
          <span className="text-amber-400">Impact:</span> Transfer conflict at 12:30 PM
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
          <span className="text-emerald-400">Recovery:</span> Option A — reschedule chauffeur · ₹0
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px]">
          <span className="text-brand-400">Policy:</span> Auto-execute approved (no cost impact)
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 font-bold text-emerald-300 text-[11px]">
          ✓ Transfer rescheduled: 01:45 PM · Itinerary v2 published
        </div>
        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px] text-slate-400 italic">
          🔔 "SafeBound adjusted your station pickup to 1:45 PM due to train delay."
        </div>
      </div>
    ),
    keyMessage: 'Detect → Understand Impact → Recover → Update → Notify. Automatically.',
  },
];

interface DemoSequencerProps {
  onStepChange?: (step: number) => void;
}

export const DemoSequencer: React.FC<DemoSequencerProps> = ({ onStepChange }) => {
  const [current, setCurrent] = useState(0);

  const go = (idx: number) => {
    setCurrent(idx);
    onStepChange?.(idx + 1);
  };

  const step = steps[current];

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-card overflow-hidden">
      {/* Progress bar */}
      <div className="flex">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className={`flex-1 py-1 text-[9px] font-mono border-b-2 transition ${
              i === current
                ? 'border-brand-500 text-brand-300 bg-brand-500/10'
                : i < current
                ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/5'
                : 'border-slate-700 text-slate-600'
            }`}
          >
            {s.id}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8 space-y-5">
        {/* Screen label */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 font-mono text-[10px] font-bold">
            Screen {step.id}/9 — {step.screen}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">{current + 1} of {steps.length}</span>
        </div>

        {/* Content */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-base font-extrabold text-white leading-snug">{step.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-brand-300 font-bold">
              💡 {step.keyMessage}
            </div>
          </div>
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4">
            {step.visual}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <button
            onClick={() => go(Math.max(0, current - 1))}
            disabled={current === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 text-xs font-bold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Prev
          </button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`w-1.5 h-1.5 rounded-full transition ${i === current ? 'bg-brand-400 w-4' : 'bg-slate-700'}`}
              />
            ))}
          </div>
          {current < steps.length - 1 ? (
            <button
              onClick={() => go(current + 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-extrabold transition"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => go(0)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition"
            >
              <Zap className="w-3.5 h-3.5" /> Restart Demo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
