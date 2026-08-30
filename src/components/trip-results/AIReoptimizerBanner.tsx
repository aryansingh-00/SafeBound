import React, { useState } from 'react';
import { Zap, Sparkles, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface AIReoptimizerBannerProps {
  onApplyOptimization: () => void;
  isOptimized: boolean;
}

export const AIReoptimizerBanner: React.FC<AIReoptimizerBannerProps> = ({
  onApplyOptimization,
  isOptimized,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleRunOptimization = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowResult(true);
    }, 1200);
  };

  const handleApply = () => {
    onApplyOptimization();
    alert('✓ Package optimized! New total ₹29,850 locked (₹1,450 savings applied).');
  };

  return (
    <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-brand-500/30 shadow-xl space-y-4 relative overflow-hidden">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                SafeBound Live AI Package Re-Optimizer
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-brand-500/30 text-brand-200 border border-brand-400/40">
                Autonomous
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Scan across 20+ live airline/IRCTC alternatives and partner hotel inventory to reduce package cost.
            </p>
          </div>
        </div>

        {!showResult && !isOptimized && (
          <button
            type="button"
            disabled={isRunning}
            onClick={handleRunOptimization}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 shrink-0"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Optimizing Packages...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>✨ Optimize All Packages</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Result Box */}
      {(showResult || isOptimized) && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-fadeIn relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-white">
                Optimization Complete: Alternative Room Suite & Transit Found
              </span>
            </div>
            <p className="text-slate-300">
              Mussoorie package reduced from <span className="line-through text-slate-400">₹31,300</span> to <strong className="text-emerald-400 font-extrabold text-sm">₹29,850</strong> (You save ₹1,450!).
            </p>
          </div>

          {!isOptimized ? (
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Apply Optimization (Save ₹1,450)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-emerald-300 font-bold px-3 py-1 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
              ✓ ₹1,450 Savings Applied to Mussoorie
            </span>
          )}
        </div>
      )}

    </div>
  );
};
