import React from 'react';
import { BookingOrchestratorWorkspace } from '../components/booking-orchestrator/BookingOrchestratorWorkspace';
import { ShieldCheck, Layers, Bot, Cpu, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookingOrchestratorPage: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Deterministic Execution Boundary</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Booking Orchestrator & Recovery Agent
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
              AI recommends and coordinates; the deterministic Booking Orchestrator controls the transaction, verifies payment signatures, locks idempotency keys, and orchestrates multi-agent reservations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/package-builder"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Package Builder
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition"
            >
              Ops Console
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Core Axioms */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Idempotent Execution</h3>
          <p className="text-slate-400 leading-relaxed">
            Duplicate clicks, duplicate webhooks, or retry loops never produce duplicate charges or redundant supplier bookings.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Dependency Graph Sequencing</h3>
          <p className="text-slate-400 leading-relaxed">
            Transport & Hotel reserve concurrently; Transfer chauffeur synchronizes with verified train arrival; Activities check in with local presence.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Autonomous Disruption Recovery</h3>
          <p className="text-slate-400 leading-relaxed">
            If a supplier fails (e.g. cable car maintenance), the Recovery Agent discovers equivalent alternatives with 1-click user rebooking authorization.
          </p>
        </div>
      </div>

      {/* Interactive Booking Orchestrator Workspace */}
      <div className="max-w-7xl mx-auto">
        <BookingOrchestratorWorkspace />
      </div>

    </div>
  );
};
