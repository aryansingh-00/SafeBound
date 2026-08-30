import React from 'react';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HardConstraintsLock: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
          <Lock className="w-4 h-4" />
        </div>

        <div>
          <span className="font-extrabold text-slate-900 block">
            🔒 Hard Constraint Protection Active
          </span>
          <p className="text-slate-500 font-medium">
            SafeBound guarantees every recommended trip strictly adheres to your hard limits.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-bold text-slate-700">
        <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          Max Budget: ≤ ₹40,000
        </span>
        <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          Safety: High
        </span>
        <span className="bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
          Duration: 4 Days
        </span>
      </div>

    </div>
  );
};
