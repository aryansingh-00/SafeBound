import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface SafetySelectorProps {
  safetyPriority: 'Normal' | 'High' | 'Very High';
  onSafetyChange: (level: 'Normal' | 'High' | 'Very High') => void;
}

export const SafetySelector: React.FC<SafetySelectorProps> = ({
  safetyPriority,
  onSafetyChange,
}) => {
  const options: { level: 'Normal' | 'High' | 'Very High'; score: string; desc: string }[] = [
    { level: 'Normal', score: '7.5+ Score', desc: 'Standard safety verified routes & vetted hotels' },
    { level: 'High', score: '8.5+ Score', desc: 'Strict safety heuristics, daylight travel, 4★+ verified stays' },
    { level: 'Very High', score: '9.2+ Score', desc: 'Maximum security rating, dedicated verified chauffeurs & 24/7 check-in guard' },
  ];

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
      
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Safety Priority Index</span>
        </label>
        
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Info className="w-3 h-3 text-slate-400" />
          <span>SafeBound evaluates live local signals</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {options.map((opt) => {
          const isSelected = safetyPriority === opt.level;

          return (
            <button
              key={opt.level}
              type="button"
              onClick={() => onSafetyChange(opt.level)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500/50 shadow-xs'
                  : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isSelected ? 'text-brand-900' : 'text-slate-800'}`}>
                  {opt.level}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-emerald-700 border border-slate-200">
                  {opt.score}
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 italic">
        *SafeBound considers safety-related signals, road clearances, terrain conditions, and partner vetting when evaluating destinations and services.
      </p>

    </div>
  );
};
