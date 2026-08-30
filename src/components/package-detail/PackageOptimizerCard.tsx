import React, { useState } from 'react';
import { Zap, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface PackageOptimizerCardProps {
  onApplyOptimization: () => void;
  isOptimized: boolean;
}

export const PackageOptimizerCard: React.FC<PackageOptimizerCardProps> = ({
  onApplyOptimization,
  isOptimized,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [foundSaving, setFoundSaving] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setFoundSaving(true);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-2xs space-y-3.5">
      
      <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
        <Zap className="w-4 h-4 text-amber-500" />
        <span>⚡ Can we make this cheaper?</span>
      </div>

      <p className="text-xs text-slate-500 font-medium leading-relaxed">
        Let SafeBound re-scan partner room inventory and secondary transport combinations.
      </p>

      {!foundSaving && !isOptimized && (
        <button
          type="button"
          disabled={isRunning}
          onClick={handleRun}
          className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-brand-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning live alternatives...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Optimize with SafeBound</span>
            </>
          )}
        </button>
      )}

      {(foundSaving || isOptimized) && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 animate-fadeIn">
          <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Potential saving found: Save ₹1,450!</span>
          </div>

          <p className="text-[11px] text-emerald-800">
            Switching to partner Executive Suite rate reduces total from ₹31,300 to <strong>₹29,850</strong>.
          </p>

          {!isOptimized ? (
            <button
              type="button"
              onClick={onApplyOptimization}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1"
            >
              <span>Apply New Package (₹29,850)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[11px] font-bold text-emerald-700 block text-center">
              ✓ Active on this package
            </span>
          )}
        </div>
      )}

    </div>
  );
};
