import React from 'react';
import { DecisionAgentInteractiveConsole } from '../components/decision/DecisionAgentInteractiveConsole';
import { BrainCircuit, Filter, Sparkles, Sliders, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DecisionAgentPage: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Core Intelligence Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Travel Decision Agent
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
              SafeBound decides which travel options are worth considering before you see them — turning natural language into structured, constraint-aware, evidence-backed recommendations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/architecture"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Backend Architecture
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

      {/* 3 Core Agentic Principles */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold">
            <Filter className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Hard vs Soft Constraints</h3>
          <p className="text-slate-400 leading-relaxed">
            Hard constraints (Budget ≤ ₹40K, Duration = 4 days) are strictly enforced; soft preferences (Train, Mountains, Weather) are dynamically weighed.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Evidence-Based Scoring</h3>
          <p className="text-slate-400 leading-relaxed">
            Every match percentage is backed by transparent factors: Budget surplus, IMD Doppler weather radar, direct rail transit, and corridor safety.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <BrainCircuit className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Contextual Session Memory</h3>
          <p className="text-slate-400 leading-relaxed">
            Follow-up commands like <em>"Make it cheaper"</em> or <em>"Prefer flights instead"</em> preserve previous constraints without asking the user to start over.
          </p>
        </div>
      </div>

      {/* Interactive Decision Workspace */}
      <div className="max-w-7xl mx-auto">
        <DecisionAgentInteractiveConsole />
      </div>

    </div>
  );
};
