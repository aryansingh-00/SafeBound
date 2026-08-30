import React from 'react';
import { SearchX, RotateCcw, SlidersHorizontal, ArrowRight } from 'lucide-react';

interface NoResultsFallbackProps {
  onResetFilters: () => void;
  onRelaxBudget: () => void;
}

export const NoResultsFallback: React.FC<NoResultsFallbackProps> = ({
  onResetFilters,
  onRelaxBudget,
}) => {
  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200/90 shadow-card max-w-xl mx-auto space-y-5 my-8 animate-fadeIn">
      
      <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
        <SearchX className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          We couldn't find a perfect match
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
          Your current filters might be too restrictive. SafeBound found closest alternatives right above your criteria.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full sm:w-auto px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>

        <button
          type="button"
          onClick={onRelaxBudget}
          className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Relax Budget (+₹5,000)</span>
        </button>
      </div>

    </div>
  );
};
