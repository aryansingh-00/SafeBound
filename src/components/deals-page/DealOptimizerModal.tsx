import React, { useState, useEffect } from 'react';
import { X, Zap, CheckCircle2, Circle, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { DealItem } from '../../data/dealsData';

interface DealOptimizerModalProps {
  deal: DealItem | null;
  onClose: () => void;
  onApplyOptimizedDeal: (deal: DealItem, newPrice: number) => void;
}

const OPTIMIZE_STEPS = [
  'Checking transport alternatives & cashback routes',
  'Checking hotel partner room allocations',
  'Checking activity combo bundle passes',
  'Checking flexible cancellation options',
  'Comparing total package cost against 12 providers',
];

export const DealOptimizerModal: React.FC<DealOptimizerModalProps> = ({
  deal,
  onClose,
  onApplyOptimizedDeal,
}) => {
  if (!deal) return null;

  const [activeStep, setActiveStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const savingsAmount = 2350;
  const optimizedPrice = Math.max(deal.currentPrice - savingsAmount, 5000);

  useEffect(() => {
    setActiveStep(0);
    setIsCompleted(false);

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < OPTIMIZE_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setIsCompleted(true);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [deal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold shadow-sm">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold">SafeBound Deal Re-Optimizer</h3>
              <p className="text-[11px] text-slate-400 font-mono">Autonomous Inventory Scanner</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          <div className="text-center space-y-1">
            <h4 className="text-base font-extrabold text-slate-900">
              Optimizing package for {deal.destination.split(',')[0]}
            </h4>
            <p className="text-xs text-slate-500">
              Scanning 100+ alternative flight timings, hotel upgrades and pass combinations.
            </p>
          </div>

          {/* Checklist Animation */}
          <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {OPTIMIZE_STEPS.map((step, idx) => {
              const isDone = idx < activeStep || isCompleted;
              const isCurrent = idx === activeStep && !isCompleted;

              return (
                <div key={idx} className="flex items-center gap-2.5 text-xs">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-brand-600 animate-spin shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}

                  <span className={isCurrent ? 'font-bold text-brand-700' : isDone ? 'text-slate-700 font-medium' : 'text-slate-400'}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Savings Result Card (Reveals when completed) */}
          {isCompleted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase">
                  Better Combination Found!
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white">
                  Save ₹{savingsAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block">Optimized Package Total</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-slate-400 text-sm">₹{deal.currentPrice.toLocaleString('en-IN')}</span>
                    <span className="text-2xl font-extrabold text-emerald-700">₹{optimizedPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyOptimizedDeal(deal, optimizedPrice)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <span>Apply Better Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
