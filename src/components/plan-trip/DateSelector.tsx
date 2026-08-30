import React from 'react';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface DateSelectorProps {
  departureDate: string;
  returnDate: string;
  durationDays: number;
  isFlexible: boolean;
  onDepartureChange: (date: string) => void;
  onReturnChange: (date: string) => void;
  onDurationChange: (days: number) => void;
  onToggleFlexible: (flexible: boolean) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  departureDate,
  returnDate,
  durationDays,
  isFlexible,
  onDepartureChange,
  onReturnChange,
  onDurationChange,
  onToggleFlexible,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
      
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-brand-600" />
          <span>Travel Dates & Duration</span>
        </label>

        {/* Duration badge */}
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
          🌙 {durationDays} Days / {durationDays - 1} Nights
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Departure */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Departure</span>
          <input
            type="text"
            value={departureDate}
            onChange={(e) => onDepartureChange(e.target.value)}
            placeholder="e.g. 15 Sep 2026"
            className="w-full px-3 py-2 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:bg-white"
          />
        </div>

        {/* Return */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Return</span>
          <input
            type="text"
            value={returnDate}
            onChange={(e) => onReturnChange(e.target.value)}
            placeholder="e.g. 19 Sep 2026"
            className="w-full px-3 py-2 text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:bg-white"
          />
        </div>

        {/* Quick Duration Buttons */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Duration</span>
          <div className="flex gap-1">
            {[3, 4, 5, 7].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => onDurationChange(d)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition ${
                  durationDays === d
                    ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {d}D
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Flexible Dates ±2 Days Toggle */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={isFlexible}
            onChange={(e) => onToggleFlexible(e.target.checked)}
            className="rounded text-brand-600 focus:ring-brand-500 h-4 w-4"
          />
          <span className="text-xs font-bold text-slate-800">
            Flexible dates ±2 days
          </span>
        </label>

        <span className="text-[11px] text-brand-600 font-semibold hidden sm:inline-block">
          ✨ SafeBound checks nearby dates for lowest fares
        </span>
      </div>

    </div>
  );
};
