import React from 'react';
import { ArrowRight, Train, Building, Check } from 'lucide-react';
import { TRANSPORT_OPTIONS, STAY_TIERS } from '../../data/onboardingData';

interface StepTransportStayProps {
  selectedTransport: string[];
  selectedStay: string;
  onToggleTransport: (t: string) => void;
  onSelectStay: (s: string) => void;
  onNext: () => void;
}

export const StepTransportStay: React.FC<StepTransportStayProps> = ({
  selectedTransport,
  selectedStay,
  onToggleTransport,
  onSelectStay,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">
          Step 4 of 5 • Transport & Stay Category
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Transit Modes & Accommodations 🚆
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Choose your favorite travel methods and minimum hotel comfort expectations.
        </p>
      </div>

      {/* 1. Transport Modes */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Train className="w-3.5 h-3.5 text-brand-600" />
          <span>Preferred Transit Modes (Select all that apply)</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TRANSPORT_OPTIONS.map((tr) => {
            const isSelected = selectedTransport.some((t) => tr.label.includes(t) || t.includes(tr.label));

            return (
              <button
                key={tr.id}
                type="button"
                onClick={() => onToggleTransport(tr.label)}
                className={`p-3.5 rounded-2xl text-left transition border flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-950 ring-2 ring-brand-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">{tr.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{tr.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Hotel / Stay Tiers */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Building className="w-3.5 h-3.5 text-brand-600" />
          <span>Preferred Stay Category</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {STAY_TIERS.map((st) => {
            const isSelected = selectedStay === st.label;

            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectStay(st.label)}
                className={`p-3.5 rounded-2xl text-left transition border flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-950 ring-2 ring-brand-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">{st.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">{st.desc}</span>
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
