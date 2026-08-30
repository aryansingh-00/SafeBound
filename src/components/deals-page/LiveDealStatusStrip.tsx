import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Lock, Clock } from 'lucide-react';

export const LiveDealStatusStrip: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6">
      <div className="bg-white rounded-2xl p-3 sm:py-3 sm:px-6 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-700">
        
        <div className="flex items-center gap-1.5 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>Prices updated live</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-time seat & room availability</span>
        </div>

        <div className="flex items-center gap-1.5 text-emerald-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Verified airline & hotel partners</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-900">
          <Lock className="w-3.5 h-3.5 text-brand-600" />
          <span>No hidden taxes or fees</span>
        </div>

      </div>
    </div>
  );
};
