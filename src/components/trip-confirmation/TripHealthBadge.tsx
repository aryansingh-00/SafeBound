import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TripHealthBadge: React.FC = () => {
  return (
    <div className="flex items-center gap-2 bg-slate-800/90 px-3.5 py-1.5 rounded-2xl border border-slate-700 text-xs">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
        <span className="font-extrabold text-white">Trip Health:</span>
        <span className="font-extrabold text-emerald-400">Looking Good</span>
      </div>

      <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400 font-semibold border-l border-slate-700 pl-2">
        <span>Bookings ✓</span>
        <span>Weather ✓</span>
        <span>Transport ✓</span>
        <span>Activities ✓</span>
        <span>Safety ✓</span>
      </div>
    </div>
  );
};
