import React from 'react';
import { ArchitectureSandbox } from '../components/architecture/ArchitectureSandbox';
import { Server, Layers, ShieldCheck, Database, GitBranch, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>SafeBound Agentic Commerce Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Backend Architecture & Multi-Agent Swarm
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
              SafeBound separates AI decision-making (natural language intent, preference ranking, package coordination) from deterministic backend guarantees (payments, state machine, authoritative pricing).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Open Ops Console
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition"
            >
              User Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Strict Layer Separation</h3>
          <p className="text-slate-400 leading-relaxed">
            AI agents never write directly to PostgreSQL or make raw provider API calls without typed tools and permission boundary validation.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Authoritative Pricing Engine</h3>
          <p className="text-slate-400 leading-relaxed">
            Final payable amounts are computed deterministically by the backend formula: <code>Transport + Hotel + Transfers + Activities + 5% GST - Discounts</code>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <GitBranch className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Idempotent State Machine</h3>
          <p className="text-slate-400 leading-relaxed">
            Resilient multi-agent booking lifecycle with idempotency keys, duplicate charge prevention, and automatic overbooking compensation.
          </p>
        </div>
      </div>

      {/* Interactive Sandbox for Judges */}
      <div className="max-w-7xl mx-auto">
        <ArchitectureSandbox />
      </div>

    </div>
  );
};
