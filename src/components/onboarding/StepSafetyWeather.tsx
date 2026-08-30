import React from 'react';
import { ArrowRight, ShieldCheck, CloudSun, Check, AlertCircle } from 'lucide-react';
import { SAFETY_PRIORITY_OPTIONS, WEATHER_OPTIONS } from '../../data/onboardingData';

interface StepSafetyWeatherProps {
  safetyPriority: 'normal' | 'high' | 'very_high';
  weatherPreference: string[];
  avoidHeavyRain: boolean;
  onSelectSafety: (s: 'normal' | 'high' | 'very_high') => void;
  onToggleWeather: (w: string) => void;
  onToggleAvoidRain: (val: boolean) => void;
  onNext: () => void;
}

export const StepSafetyWeather: React.FC<StepSafetyWeatherProps> = ({
  safetyPriority,
  weatherPreference,
  avoidHeavyRain,
  onSelectSafety,
  onToggleWeather,
  onToggleAvoidRain,
  onNext,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600">
          Step 5 of 5 • Safety Sentinel & Climate Preferences
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Safety Radar & Climate Conditions 🛡️
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Set how aggressively SafeBound weighs road telemetry, weather radar and supplier certifications.
        </p>
      </div>

      {/* 1. Safety Priority Options */}
      <div className="space-y-2.5">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Safety Priority Level</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAFETY_PRIORITY_OPTIONS.map((opt) => {
            const isSelected = safetyPriority === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectSafety(opt.id as 'normal' | 'high' | 'very_high')}
                className={`p-3.5 rounded-2xl text-left transition border flex flex-col justify-between space-y-1 ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <span className="text-[11px] text-slate-500 leading-relaxed font-medium">{opt.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Weather Options */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <CloudSun className="w-3.5 h-3.5 text-brand-600" />
          <span>Preferred Weather & Climate</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {WEATHER_OPTIONS.map((w) => {
            const isSelected = weatherPreference.some((wp) => wp.includes(w.label) || w.label.includes(wp));

            return (
              <button
                key={w.id}
                type="button"
                onClick={() => onToggleWeather(w.label)}
                className={`p-3 rounded-2xl text-xs font-bold transition text-left border flex items-center justify-between ${
                  isSelected
                    ? 'bg-brand-50 border-brand-500 text-brand-900 ring-2 ring-brand-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
                }`}
              >
                <span>{w.label}</span>
                {isSelected && <Check className="w-3 h-3 text-brand-600" />}
              </button>
            );
          })}
        </div>

        {/* Avoid Heavy Rain Checkbox */}
        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="avoidRain"
            checked={avoidHeavyRain}
            onChange={(e) => onToggleAvoidRain(e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500 accent-brand-600"
          />
          <label htmlFor="avoidRain" className="ml-2 text-xs font-bold text-slate-700 cursor-pointer">
            Automatically avoid destinations with active heavy monsoon / flood radar alerts
          </label>
        </div>
      </div>

      {/* Safety Disclaimer */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>
          SafeBound uses official transit authority reports, satellite Doppler scans, and syndicate verification. Recommendations use available verified data.
        </p>
      </div>

      {/* Continue */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
        >
          <span>Complete Personalization & View Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
