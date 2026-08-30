import React from 'react';
import { PackageBuilderWorkspace } from '../components/package-builder/PackageBuilderWorkspace';
import { Sparkles, Layers, Sliders, Zap, GitBranch, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PackageBuilderPage: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Coordinated Product Assembler</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Package Builder & Optimization Agent
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
              SafeBound constructs complete multi-modal travel packages as one connected system, validating timing buffers, calculating deterministic prices, and optimizing trade-offs without breaking hard constraints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/decision-agent"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Decision Agent
            </Link>
            <Link
              to="/architecture"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition"
            >
              Architecture Sandbox
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Core Axioms */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold">
            <GitBranch className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Journey Graph Timing Feasibility</h3>
          <p className="text-slate-400 leading-relaxed">
            Every package validates arrival vs transfer pickup windows, hotel check-in buffers, and non-overlapping curated activities.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Whole-Journey Optimization</h3>
          <p className="text-slate-400 leading-relaxed">
            <code>CHEAPEST TRAIN ≠ CHEAPEST TRIP</code>. The optimizer evaluates price, transfer distance, comfort, and weather as a unified whole.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Package Versioning & Price Lock</h3>
          <p className="text-slate-400 leading-relaxed">
            Every optimization generates a versioned package (v1 ➔ v2) with a 15-minute price lock and cryptographic calculation signature.
          </p>
        </div>
      </div>

      {/* Interactive Package Builder Workspace */}
      <div className="max-w-7xl mx-auto">
        <PackageBuilderWorkspace />
      </div>

    </div>
  );
};
