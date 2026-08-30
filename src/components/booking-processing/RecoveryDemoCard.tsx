import React, { useState } from 'react';
import { ShieldAlert, Sparkles, CheckCircle2, ArrowRight, Star, RefreshCw, X } from 'lucide-react';

export const RecoveryDemoCard: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasResolved, setHasResolved] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-brand-950 border border-rose-500/40 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl text-white">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldAlert className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-white">
                Interactive Autonomous Recovery Demo
              </h4>
              <span className="text-[9px] font-mono font-bold px-2 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Judge Demo Tool
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Simulate a third-party hotel/airline sudden overbooking to see SafeBound Recovery Agent resolve it autonomously.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsDismissed(true)}
          className="p-1 text-slate-500 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {!isSimulating && !hasResolved ? (
        <button
          type="button"
          onClick={() => setIsSimulating(true)}
          className="w-full py-2.5 bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Simulate Provider Failure & Trigger Recovery Agent</span>
        </button>
      ) : (
        <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 animate-fadeIn">
          
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
            <span className="text-rose-400 font-bold flex items-center gap-1.5">
              <span>⚠️ Hotel API Alert: Original Room Overbooked</span>
            </span>
            <span className="text-emerald-400 font-bold font-mono">
              Recovery Agent Activated
            </span>
          </div>

          {/* Recovery Resolution Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase block">Failed Original</span>
              <p className="font-bold text-slate-400 line-through">Mall Road Inn (₹16,500)</p>
              <span className="text-[10px] text-rose-400">Sold out during checkout</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-emerald-400 uppercase font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Alternative Found</span>
                </span>
                <span className="text-[10px] font-extrabold text-emerald-300">₹800 Less</span>
              </div>
              <p className="font-bold text-white flex items-center gap-1">
                <span>4★ Cedar View Heritage Retreat</span>
                <span className="text-amber-400 flex items-center text-[10px]"><Star className="w-2.5 h-2.5 fill-amber-400" /> 4.8</span>
              </p>
              <span className="text-[10px] text-emerald-400">Balcony suite • 0 mins transfer change</span>
            </div>
          </div>

          {!hasResolved ? (
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setHasResolved(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <span>Accept Alternative (Instant ₹800 Refund)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>✓ Auto-Recovery Complete! Swapped with 4★ Cedar View Retreat. ₹800 credited back to Razorpay escrow.</span>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
