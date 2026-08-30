import React from 'react';
import { Sparkles, Bot, ShieldCheck, ArrowRight } from 'lucide-react';

interface AIPersonalizationProps {
  onUpdatePreferences: () => void;
}

export const AIPersonalization: React.FC<AIPersonalizationProps> = ({ onUpdatePreferences }) => {
  const styles = [
    { name: 'Mountains & Valleys', weight: 90, bar: 'from-brand-600 to-indigo-600' },
    { name: 'Nature & Forest Trails', weight: 80, bar: 'from-emerald-600 to-teal-500' },
    { name: 'Adventure Activities', weight: 70, bar: 'from-amber-500 to-orange-500' },
    { name: 'Heritage & Culture', weight: 60, bar: 'from-purple-600 to-pink-500' },
    { name: 'Beach & Coastal Escapes', weight: 50, bar: 'from-sky-500 to-cyan-500' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-brand-500/30 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              SafeBound Learned Travel Profile
            </h3>
            <p className="text-xs text-brand-200 font-medium">
              Autonomous weights tailored from your previous searches and booking feedback.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onUpdatePreferences}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition flex items-center gap-1.5 w-fit"
        >
          <span>Update Weights</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Progress Bars Graph */}
      <div className="space-y-3 relative z-10">
        {styles.map((s, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">{s.name}</span>
              <span className="font-mono text-emerald-400 font-bold">{s.weight}% affinity</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${s.bar} rounded-full`}
                style={{ width: `${s.weight}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Guard Explanation */}
      <div className="p-3.5 bg-slate-800/60 border border-slate-700/80 rounded-2xl text-[11px] text-slate-400 flex items-start gap-2 relative z-10">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p>
          SafeBound uses your travel preferences strictly to personalize destinations and budget filters. We never expose your private documents, payment tokens, or personal identities to generative AI models.
        </p>
      </div>

    </div>
  );
};
