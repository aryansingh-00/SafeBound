import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface Node {
  label: string;
  sub?: string;
  color: string;
  border: string;
}

const Col: React.FC<{ nodes: Node[]; title: string }> = ({ nodes, title }) => (
  <div className="space-y-1.5">
    <p className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest text-center">{title}</p>
    {nodes.map((n, i) => (
      <React.Fragment key={n.label}>
        <div className={`px-3 py-2 rounded-xl border text-[10px] font-bold text-center ${n.color} ${n.border}`}>
          {n.label}
          {n.sub && <div className="text-[9px] font-normal opacity-70 mt-0.5">{n.sub}</div>}
        </div>
        {i < nodes.length - 1 && (
          <div className="text-center text-slate-700 text-xs">↓</div>
        )}
      </React.Fragment>
    ))}
  </div>
);

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-card text-white space-y-5">
      <h3 className="text-base font-extrabold text-white">Full Agent Architecture</h3>

      {/* Top level */}
      <div className="flex flex-col items-center gap-1">
        <div className="px-6 py-2.5 rounded-2xl bg-brand-600/20 border border-brand-500/50 text-sm font-extrabold text-brand-300">
          👤 USER
        </div>
        <ArrowDown className="w-4 h-4 text-slate-600" />
        <div className="px-6 py-2.5 rounded-2xl bg-brand-500/30 border border-brand-400/50 text-sm font-extrabold text-white">
          🧠 SafeBound AI
        </div>
        <ArrowDown className="w-4 h-4 text-slate-600" />
      </div>

      {/* AI Agents row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Decision Agent', color: 'text-purple-300 bg-purple-500/10', border: 'border-purple-500/30' },
          { label: 'Package Builder', color: 'text-sky-300 bg-sky-500/10', border: 'border-sky-500/30' },
          { label: 'Optimization Agent', color: 'text-teal-300 bg-teal-500/10', border: 'border-teal-500/30' },
        ].map((n) => (
          <div key={n.label} className={`px-2 py-2.5 rounded-xl border text-[10px] font-bold text-center ${n.color} ${n.border}`}>
            {n.label}
          </div>
        ))}
      </div>

      {/* Down to payment */}
      <div className="flex flex-col items-center gap-1">
        <ArrowDown className="w-4 h-4 text-slate-600" />
        <div className="px-6 py-2 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-xs font-extrabold text-blue-300">
          💳 Razorpay Payment
        </div>
        <ArrowDown className="w-4 h-4 text-slate-600" />
        <div className="px-6 py-2 rounded-2xl bg-brand-500/20 border border-brand-500/40 text-xs font-extrabold text-brand-300">
          🛡️ Booking Orchestrator
        </div>
        <ArrowDown className="w-4 h-4 text-slate-600" />
      </div>

      {/* Provider agents row */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: '🚆 Transport', color: 'text-amber-300 bg-amber-500/10', border: 'border-amber-500/30' },
          { label: '🏨 Hotel', color: 'text-purple-300 bg-purple-500/10', border: 'border-purple-500/30' },
          { label: '🚕 Transfer', color: 'text-sky-300 bg-sky-500/10', border: 'border-sky-500/30' },
          { label: '🎟️ Activities', color: 'text-emerald-300 bg-emerald-500/10', border: 'border-emerald-500/30' },
        ].map((n) => (
          <div key={n.label} className={`px-1.5 py-2 rounded-xl border text-[9px] font-bold text-center ${n.color} ${n.border}`}>
            {n.label}
          </div>
        ))}
      </div>

      {/* Down to itinerary / monitoring / recovery */}
      <div className="flex flex-col items-center gap-1">
        <ArrowDown className="w-4 h-4 text-slate-600" />
        <div className="px-6 py-2 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-xs font-extrabold text-orange-300">
          📋 Itinerary Engine
        </div>
        <ArrowDown className="w-4 h-4 text-slate-600" />
        <div className="px-6 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-extrabold text-emerald-300">
          📡 Live Monitoring Engine
        </div>
      </div>

      {/* Branch: No Change / Disruption */}
      <div className="grid grid-cols-2 gap-3 items-start">
        <div className="space-y-1.5">
          <p className="text-[9px] font-mono text-slate-500 text-center uppercase">No Change</p>
          <div className="px-2 py-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 text-center">
            ✓ Trip Continues
          </div>
        </div>
        <div className="space-y-1.5">
          <p className="text-[9px] font-mono text-rose-400 text-center uppercase">Disruption</p>
          <div className="px-2 py-2 rounded-xl bg-amber-950/30 border border-amber-500/30 text-[10px] font-bold text-amber-400 text-center">
            ⚡ Recovery Agent
          </div>
          <ArrowDown className="w-4 h-4 text-slate-600 mx-auto" />
          <div className="px-2 py-2 rounded-xl bg-brand-500/20 border border-brand-500/30 text-[10px] font-bold text-brand-300 text-center">
            ✓ Updated Trip
          </div>
        </div>
      </div>
    </div>
  );
};
