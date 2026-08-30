import React from 'react';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const WhyChosenRadar: React.FC = () => {
  const radar = [
    { label: 'Budget Fit', score: 95, color: 'from-emerald-500 to-teal-500' },
    { label: 'Weather Fit', score: 92, color: 'from-sky-500 to-blue-600' },
    { label: 'Safety Fit', score: 89, color: 'from-indigo-500 to-purple-600' },
    { label: 'Travel Convenience', score: 91, color: 'from-amber-500 to-orange-500' },
    { label: 'Experience Match', score: 94, color: 'from-brand-500 to-pink-500' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-500/40 shadow-xl space-y-6 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white">
            ✨ Why SafeBound chose this package for you
          </h3>
          <p className="text-xs text-brand-200 font-medium">
            Computed from your high safety preference, ₹40K budget constraint, and peaceful mountain style.
          </p>
        </div>
      </div>

      {/* Radar Progress Bars */}
      <div className="space-y-3.5 relative z-10">
        {radar.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">{item.label}</span>
              <span className="font-mono text-emerald-400 font-extrabold">{item.score}/100</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                style={{ width: `${item.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 leading-relaxed relative z-10 flex items-start gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          This Mussoorie itinerary achieved the highest composite score (92%) among 14 candidate destinations due to smooth Vande Bharat connectivity, ₹8,700 savings headroom, and zero active mountain road closures.
        </p>
      </div>

    </div>
  );
};
