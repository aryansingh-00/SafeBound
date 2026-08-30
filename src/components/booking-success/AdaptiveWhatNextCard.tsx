import React from 'react';
import { ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const AdaptiveWhatNextCard: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-card space-y-4">
      
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <h4 className="text-sm sm:text-base font-extrabold text-white">
          What Happens Next? (Adaptive Recovery)
        </h4>
      </div>

      {/* 5-Step Visual Pipeline */}
      <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-none">
          <span className="px-2 py-1 bg-slate-700 rounded text-slate-200 shrink-0">1. Trip Booked</span>
          <span>➔</span>
          <span className="px-2 py-1 bg-slate-700 rounded text-slate-200 shrink-0">2. Sentinel Monitors</span>
          <span>➔</span>
          <span className="px-2 py-1 bg-slate-700 rounded text-slate-200 shrink-0">3. Delay Detected</span>
          <span>➔</span>
          <span className="px-2 py-1 bg-brand-600 rounded text-white font-bold shrink-0">4. Auto-Adapted</span>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-medium">
        Example: If your Vande Bharat train from Delhi arrives 45 minutes late in Dehradun, SafeBound automatically reschedules your station chauffeur pickup so you never have to wait outside.
      </p>

    </div>
  );
};
