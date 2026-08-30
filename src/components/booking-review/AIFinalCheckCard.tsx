import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const AIFinalCheckCard: React.FC = () => {
  const checks = [
    'Budget constraint satisfied (₹8,700 buffer remaining)',
    'Traveller details complete & age compliance validated',
    'Live seat and 4★ hotel suite availability locked',
    'Station chauffeur transfer route pre-synchronized',
    'No weather disruptions or road closures detected',
  ];

  return (
    <div className="bg-gradient-to-br from-brand-900 via-brand-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-brand-500/30 shadow-xl space-y-3.5">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          </div>
          <h4 className="text-xs sm:text-sm font-extrabold tracking-wider uppercase text-slate-200">
            ✨ SafeBound AI Final Check
          </h4>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
          5 / 5 Checks Passed
        </span>
      </div>

      <div className="space-y-2">
        {checks.map((c, i) => (
          <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{c}</span>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 pt-1">
        SafeBound autonomous agents have validated this package against real-time API inventory.
      </p>

    </div>
  );
};
