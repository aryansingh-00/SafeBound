import React from 'react';
import { Radio, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const LiveMonitoringBanner: React.FC = () => {
  return (
    <div className="p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 border border-brand-500/30 text-white shadow-xl space-y-3">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Radio className="w-5 h-5 text-emerald-400 animate-pulse shrink-0" />
          <div>
            <h4 className="text-sm font-extrabold text-white">
              🟢 SafeBound is monitoring your trip in real-time
            </h4>
            <p className="text-xs text-slate-300 font-medium">
              We watch for important changes across train schedules, mountain road weather, and check-in windows.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700 w-fit">
          24/7 Autonomous Radar Active
        </span>
      </div>

      {/* 5 Real-Time Telemetry Badges */}
      <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5 text-emerald-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transport delays</span>
        <span className="flex items-center gap-1.5 text-emerald-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Weather disruptions</span>
        <span className="flex items-center gap-1.5 text-emerald-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Adaptive transfers</span>
        <span className="flex items-center gap-1.5 text-emerald-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Activity schedules</span>
        <span className="flex items-center gap-1.5 text-emerald-300"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Safety alerts</span>
      </div>

    </div>
  );
};
