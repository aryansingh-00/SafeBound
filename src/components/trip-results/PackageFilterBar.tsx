import React from 'react';
import { ArrowUpDown, Filter, RotateCcw, Check } from 'lucide-react';

interface PackageFilterBarProps {
  sortBy: string;
  onSortChange: (val: string) => void;
  selectedFilter: string;
  onFilterChange: (val: string) => void;
  onClearFilters: () => void;
}

export const PackageFilterBar: React.FC<PackageFilterBarProps> = ({
  sortBy,
  onSortChange,
  selectedFilter,
  onFilterChange,
  onClearFilters,
}) => {
  const sortOptions = [
    { id: 'match', label: '⚡ Best Match' },
    { id: 'price-low', label: '💰 Lowest Price' },
    { id: 'weather', label: '🌦️ Best Weather' },
    { id: 'travel-time', label: '🚆 Shortest Travel' },
    { id: 'safety', label: '🛡️ Highest Safety' },
  ];

  const filterChips = [
    { id: 'all', label: 'All 4 Options' },
    { id: 'train-only', label: '🚆 Train Transit' },
    { id: '4star-only', label: '4★+ Hotels' },
    { id: 'under-33k', label: 'Under ₹33,000' },
    { id: 'high-safety', label: '🛡️ 9.0+ Safety Score' },
  ];

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Sort Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-600" />
            <span>Sort:</span>
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            {sortOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSortChange(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  sortBy === opt.id
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters CTA */}
        <button
          type="button"
          onClick={onClearFilters}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 flex items-center gap-1 shrink-0 self-end sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>

      </div>

      {/* Filter Quick Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none pt-2 border-t border-slate-100">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5 text-brand-600" />
          <span>Quick Filter:</span>
        </span>

        {filterChips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onFilterChange(chip.id)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedFilter === chip.id
                ? 'bg-purple-100 text-purple-900 border border-purple-300 shadow-2xs font-extrabold'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

    </div>
  );
};
