import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { TRAVEL_STYLES } from '../../data/onboardingData';

interface StepTravelStyleProps {
  selectedStyles: string[];
  onToggleStyle: (styleLabel: string) => void;
  onNext: () => void;
}

export const StepTravelStyle: React.FC<StepTravelStyleProps> = ({
  selectedStyles,
  onToggleStyle,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">
          Step 2 of 5 • Travel Affinity & Vibe
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          What kind of trips do you enjoy? 🏔️
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Select all that apply. SafeBound AI weighs these categories when generating personalized packages.
        </p>
      </div>

      {/* Style Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TRAVEL_STYLES.map((style) => {
          const isSelected = selectedStyles.some((s) => style.label.includes(s) || s.includes(style.label));

          return (
            <button
              key={style.id}
              type="button"
              onClick={() => onToggleStyle(style.label)}
              className={`p-4 rounded-2xl text-left transition border flex flex-col justify-between space-y-2 relative ${
                isSelected
                  ? 'bg-brand-50/80 border-brand-500 text-brand-950 shadow-sm ring-2 ring-brand-500/20'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-extrabold text-slate-900">{style.label}</h4>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                {style.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Counter & Continue */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-slate-500">
          {selectedStyles.length} Styles Selected
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={selectedStyles.length === 0}
          className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2 disabled:opacity-50"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
