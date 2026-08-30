import React from 'react';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export const LiveAvailabilityStrip: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0"></span>
        <div>
          <span className="font-extrabold text-slate-900 block sm:inline mr-2">
            🟢 Live Availability Verified
          </span>
          <span className="text-slate-400 font-medium flex items-center gap-1 sm:inline-flex">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Updated 3 minutes ago with IRCTC & Hotel partner inventory</span>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 font-bold text-emerald-800 text-[11px]">
        <span className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Transport ✓</span>
        </span>
        <span className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Hotel ✓</span>
        </span>
        <span className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Activities ✓</span>
        </span>
        <span className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Transfer ✓</span>
        </span>
      </div>

    </div>
  );
};
