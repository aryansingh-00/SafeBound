import React from 'react';
import { Bot, GitBranch, ArrowDown, ArrowRight, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export const BookingOrchestrationVisualizer: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <GitBranch className="w-5 h-5 text-brand-400" />
          <h3 className="text-base font-extrabold text-white">
            Booking Orchestration Pipeline (Live Multi-Agent DAG)
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-xl border border-brand-500/30">
          Parallel Async Execution
        </span>
      </div>

      {/* DAG Flow Mesh */}
      <div className="space-y-4 max-w-3xl mx-auto py-2">
        
        {/* Node 1: Entry Payment Gate */}
        <div className="flex justify-center">
          <div className="p-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 text-center space-y-0.5 shadow-lg shadow-purple-500/10">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-300 block">
              1. Single-Escrow Gateway
            </span>
            <span className="text-xs font-mono font-bold text-white">Razorpay 256-Bit Smart Escrow Locked</span>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-slate-500">
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>

        {/* Node 2: Central Orchestrator */}
        <div className="flex justify-center">
          <div className="p-3 px-8 rounded-2xl bg-brand-600 text-white font-extrabold text-xs shadow-xl shadow-brand-500/25 border border-brand-400 flex items-center gap-2">
            <Bot className="w-4 h-4" />
            <span>Autonomous Booking Orchestrator Swarm</span>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-slate-500">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Node 3: 3 Parallel Domain Agents */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-bold text-sky-400 uppercase block">Transport Agent</span>
            <span className="text-white font-bold block">IRCTC PNR Locking</span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.2 rounded-full inline-block">
              ✓ Non-Blocking
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase block">Hotel Agent</span>
            <span className="text-white font-bold block">Suite Pre-Reservation</span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.2 rounded-full inline-block">
              ✓ Non-Blocking
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase block">Transfer Agent</span>
            <span className="text-white font-bold block">Chauffeur Sync Mesh</span>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.2 rounded-full inline-block">
              ✓ Non-Blocking
            </span>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-slate-500">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Node 4: Activities & Verification Sequential Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] font-bold text-indigo-400 uppercase block">4. Activity Agent</span>
            <span className="text-white font-bold block">VIP Fast-Track Pass Issuer</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-0.5">
            <span className="text-[10px] font-bold text-emerald-400 uppercase block">5. Verification Agent</span>
            <span className="text-white font-bold block">Cryptographic Cross-Validation</span>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center text-slate-500">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Node 5: Success & Sentinel */}
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1 text-xs">
          <span className="text-emerald-400 font-extrabold block">
            🎉 Unified Confirmed Itinerary Dispatched
          </span>
          <p className="text-slate-400 text-[11px]">
            Escrow release scheduled upon journey milestones • 24/7 Sentinel Monitoring actively engaged.
          </p>
        </div>

      </div>

    </div>
  );
};
