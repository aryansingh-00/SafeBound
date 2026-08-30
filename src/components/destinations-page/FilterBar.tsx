import React from 'react';
import { SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface FilterBarProps {
  selectedType: string;
  selectedBudget: string;
  selectedDuration: string;
  selectedSeason: string;
  resultCount: number;
  onTypeChange: (type: string) => void;
  onBudgetChange: (budget: string) => void;
  onDurationChange: (duration: string) => void;
  onSeasonChange: (season: string) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedType,
  selectedBudget,
  selectedDuration,
  selectedSeason,
  resultCount,
  onTypeChange,
  onBudgetChange,
  onDurationChange,
  onSeasonChange,
  onClearFilters,
}) => {
  const tripTypes = [
    { id: 'All', label: 'All Trips' },
    { id: 'Mountains', label: '🏔️ Mountains' },
    { id: 'Beach', label: '🏖️ Beach' },
    { id: 'Nature', label: '🌿 Nature' },
    { id: 'Culture', label: '🏛️ Culture' },
    { id: 'Wildlife', label: '🐅 Wildlife' },
    { id: 'Spiritual', label: '🛕 Spiritual' },
    { id: 'Adventure', label: '🎉 Adventure' },
  ];

  const budgetRanges = ['All', 'Under ₹15K', '₹15K–₹30K', '₹30K–₹50K', '₹50K+'];
  const durations = ['All', 'Weekend', '3-5 Days', '5-7 Days'];
  const seasons = ['All', 'Autumn', 'Winter', 'Spring', 'Summer'];

  const hasActiveFilters = selectedType !== 'All' || selectedBudget !== 'All' || selectedDuration !== 'All' || selectedSeason !== 'All';

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-xs py-3.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Row 1: Primary Trip Types & Result Counter */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          
          {/* Scrollable Type Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto">
            {tripTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => onTypeChange(t.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                  selectedType === t.id
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Result count & Clear */}
          <div className="flex items-center gap-2.5 text-xs font-semibold shrink-0">
            <span className="text-slate-500">
              <strong className="text-brand-600 font-extrabold">{resultCount}</strong> destinations match criteria
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 transition"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Secondary Filters (Budget, Duration, Season) */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          
          {/* Budget Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Budget:</span>
            <select
              value={selectedBudget}
              onChange={(e) => onBudgetChange(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
            >
              {budgetRanges.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Duration:</span>
            <select
              value={selectedDuration}
              onChange={(e) => onDurationChange(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
            >
              {durations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Season Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Season:</span>
            <select
              value={selectedSeason}
              onChange={(e) => onSeasonChange(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
            >
              {seasons.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

        </div>

      </div>
    </div>
  );
};
