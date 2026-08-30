import React, { useState } from 'react';
import { Zap, Sparkles, CheckCircle2, ArrowDownRight, Loader2 } from 'lucide-react';

interface OptimizationPanelProps {
  currentTotal: number;
  optimizedTotal: number;
  savings: number;
  isOptimized: boolean;
  onApplyOptimization: () => void;
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({
  currentTotal,
  optimizedTotal,
  savings,
  isOptimized,
  onApplyOptimization,
}) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optStage, setOptStage] = useState<string>('');

  const handleStartOptimization = () => {
    setIsOptimizing(true);
    setOptStage('Scanning nearby hotel boutique deals...');

    setTimeout(() => {
      setOptStage('Found luxury chalets with bundled dinner & breakfast (-₹850)...');

      setTimeout(() => {
        setOptStage('Direct Volvo AC cashback & free rescheduling guard applied (-₹600)...');

        setTimeout(() => {
          setIsOptimizing(false);
          setOptStage('');
          onApplyOptimization();
        }, 800);
      }, 900);
    }, 900);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-brand-500/10 border-2 border-brand-300 shadow-sm space-y-3">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>Live Re-Optimization Engine</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
                Active
              </span>
            </h4>
            <p className="text-xs text-slate-600 font-medium">
              SafeBound continuously checks real-time inventory for flash rebates.
            </p>
          </div>
        </div>

        {!isOptimized && !isOptimizing && (
          <button
            type="button"
            onClick={handleStartOptimization}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition transform hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Find a better deal</span>
          </button>
        )}
      </div>

      {isOptimizing && (
        <div className="p-3.5 rounded-xl bg-white border border-brand-200 text-xs font-semibold text-brand-800 flex items-center gap-2.5 animate-fadeIn">
          <Loader2 className="w-4 h-4 text-brand-600 animate-spin shrink-0" />
          <span>{optStage}</span>
        </div>
      )}

      {isOptimized && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-bold text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Package Optimized! Hotel & Volvo bundle rebate applied.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="line-through text-slate-400 font-normal">₹{currentTotal.toLocaleString('en-IN')}</span>
            <span className="text-emerald-700 font-extrabold text-sm">₹{optimizedTotal.toLocaleString('en-IN')}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold text-[11px]">
              You save ₹{savings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
