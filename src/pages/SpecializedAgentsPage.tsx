import React from 'react';
import { SpecializedAgentsWorkspace } from '../components/specialized-agents/SpecializedAgentsWorkspace';
import { Cpu, ShieldCheck, Zap, Layers, Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SpecializedAgentsPage: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>Domain Isolation & Normalized Contract Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Specialized Provider Agents
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
              Each micro-agent owns one travel domain, translating disparate external supplier APIs into normalized SafeBound contracts with automated failovers and health monitoring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/booking-orchestrator"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Booking Orchestrator
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
            <Layers className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Provider Adapter Isolation</h3>
          <p className="text-slate-400 leading-relaxed">
            The AI never speaks directly to raw supplier APIs. Standardized adapters convert IRCTC, PMS, and GDS payloads into common SafeBound schemas.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Automated Adapter Failover</h3>
          <p className="text-slate-400 leading-relaxed">
            If a primary supplier experiences a 4000ms timeout or outage, the agent automatically fails over to the secondary adapter with zero client error.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Strict Tool Least Privilege</h3>
          <p className="text-slate-400 leading-relaxed">
            Hotel Agent can only query rooms and book PMS suites; it cannot touch payment gateways or modify user records.
          </p>
        </div>
      </div>

      {/* Interactive Workspace */}
      <div className="max-w-7xl mx-auto">
        <SpecializedAgentsWorkspace />
      </div>

    </div>
  );
};
