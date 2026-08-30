import React from 'react';
import { Zap, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface InChatOptimizationCardProps {
  onApplyOptimization: () => void;
}

export const InChatOptimizationCard: React.FC<InChatOptimizationCardProps> = ({
  onApplyOptimization,
}) => {
  return (
    <div className="w-full max-w-lg bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-brand-500/10 rounded-3xl p-5 border-2 border-brand-300 shadow-md space-y-3.5 my-2 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-brand-200/80">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
            ⚡ SafeBound Live Optimization Result
          </h4>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
          Saved ₹1,450
        </span>
      </div>

      {/* Checklist */}
      <div className="space-y-1.5 text-xs text-slate-700 bg-white/80 p-3 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Transport alternative: Direct AC Volvo Deluxe cashback (-₹600)</span>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Hotel alternative: 4★ Cedar Retreat dinner bundle negotiated (-₹850)</span>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Package combination: Zero quality downgrade with 92% match retained</span>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-slate-900">
        <div>
          <span className="text-[10px] text-slate-500 font-medium block">Price Reduced</span>
          <div className="flex items-center gap-2">
            <span className="line-through text-slate-400 font-normal">₹31,300</span>
            <span className="text-base font-extrabold text-emerald-700">₹29,850</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onApplyOptimization}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
        >
          <span>Apply Optimization</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
