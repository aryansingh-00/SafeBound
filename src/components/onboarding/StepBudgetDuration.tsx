import React from 'react';
import { ArrowRight, Wallet, Clock, Check } from 'lucide-react';
import { BUDGET_TIERS, DURATION_OPTIONS } from '../../data/onboardingData';

interface StepBudgetDurationProps {
  selectedBudget: string;
  selectedDuration: string;
  onSelectBudget: (b: string) => void;
  onSelectDuration: (d: string) => void;
  onNext: () => void;
}

export const StepBudgetDuration: React.FC<StepBudgetDurationProps> = ({
  selectedBudget,
  selectedDuration,
  onSelectBudget,
  onSelectDuration,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">
          Step 3 of 5 • Budget Range & Trip Length
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Budget & Typical Duration 💰
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          This is an initial preference to filter relevant packages, not a hard restriction.
        </p>
      </div>

      {/* 1. Budget Tiers */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5 text-brand-600" />
          <span>Typical Per-Person Budget</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {BUDGET_TIERS.map((tier) => {
            const isSelected = selectedBudget === tier.label;

            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => onSelectBudget(tier.label)}
                className={`p-3.5 rounded-2xl text-left transition border flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-950 ring-2 ring-brand-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">{tier.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{tier.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Duration Tiers */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-brand-600" />
          <span>Preferred Trip Duration</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DURATION_OPTIONS.map((dur) => {
            const isSelected = selectedDuration === dur.label;

            return (
              <button
                key={dur.id}
                type="button"
                onClick={() => onSelectDuration(dur.label)}
                className={`p-3 rounded-2xl text-left transition border flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-950 ring-2 ring-brand-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">{dur.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </div>
                <span className="text-[10px] text-slate-500 leading-tight">{dur.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
