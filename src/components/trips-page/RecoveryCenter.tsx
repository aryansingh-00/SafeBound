import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, ArrowRight, X, Building, Star, Sparkles } from 'lucide-react';

export const RecoveryCenter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [resolved, setResolved] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-50 border-2 border-rose-300 rounded-3xl p-5 sm:p-6 shadow-md space-y-4 animate-fadeIn my-4">
      
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                SafeBound Autonomous Recovery Center
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                Disruption Simulated
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              If an airline or hotel suddenly cancels or overbooks, SafeBound's Recovery Agent instantly sources an equal or upgraded alternative.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Recovery Comparison Diff */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/90 p-4 rounded-2xl border border-slate-200 text-xs">
        
        {/* Original Issue */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Original Booking</span>
            <span className="text-[10px] font-bold text-rose-600">Unavailable ❌</span>
          </div>
          <p className="font-bold text-slate-800">Mall Road Heritage Inn</p>
          <p className="text-[11px] text-slate-500">Overbooked by provider • Zero cancellation penalty</p>
        </div>

        {/* AI Found Alternative */}
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Alternative Found</span>
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700">₹500 Less</span>
          </div>
          <p className="font-bold text-emerald-950 flex items-center gap-1">
            <span>4★ Mussoorie Cedar View Retreat</span>
            <span className="text-amber-500 font-normal flex items-center"><Star className="w-3 h-3 fill-amber-400" /> 4.8</span>
          </p>
          <p className="text-[11px] text-emerald-800">Same ridge location • Free breakfast included</p>
        </div>

      </div>

      {!resolved ? (
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setResolved(true);
              alert('✓ Autonomous re-allocation confirmed! Your updated voucher has been placed in the Document Vault.');
            }}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
          >
            <span>Accept Alternative (Refund ₹500)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>✓ Alternative Accepted — Replaced in active trip itinerary with ₹500 credit back to original payment.</span>
        </div>
      )}

    </div>
  );
};
