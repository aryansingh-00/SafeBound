import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, Zap, Check } from 'lucide-react';
import { GeneratedTripPlan } from '../../types';

interface PriceSummaryStickyProps {
  plan: GeneratedTripPlan;
  isConfirmed: boolean;
  onConfirmChange: (val: boolean) => void;
  onInitiatePayment: () => void;
  isValidToPay: boolean;
}

export const PriceSummarySticky: React.FC<PriceSummaryStickyProps> = ({
  plan,
  isConfirmed,
  onConfirmChange,
  onInitiatePayment,
  isValidToPay,
}) => {
  const budget = plan.totalBudget || 40000;
  const total = plan.estimatedCost || 31300;
  const buffer = budget - total;
  const percentage = Math.min(Math.round((total / budget) * 100), 100);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5 sticky top-24">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Price Summary</h3>
          <span className="text-[11px] text-emerald-700 font-bold">✓ Price Locked for 15:00</span>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700">
          Single Escrow
        </span>
      </div>

      {/* Itemized List */}
      <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-200/60">
          <span>🚆 Transport Allocation</span>
          <span className="font-bold text-slate-900">₹{plan.breakdown.flights.cost.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-200/60">
          <span>🏨 4★ Hotel Suite (4 Nights)</span>
          <span className="font-bold text-slate-900">₹{plan.breakdown.hotel.cost.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-200/60">
          <span>🚕 Chauffeur & Transfers</span>
          <span className="font-bold text-slate-900">₹{plan.breakdown.transfers.cost.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-slate-600 pb-1.5 border-b border-slate-200/60">
          <span>🎟️ Activities & Cable Car Passes</span>
          <span className="font-bold text-slate-900">₹{plan.breakdown.activities.cost.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-slate-600 pt-1">
          <span>🛡️ SafeBound Escrow & GST</span>
          <span className="font-bold text-emerald-600">FREE (Inclusive)</span>
        </div>
      </div>

      {/* Budget Indicator Bar (Section 17) */}
      <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-200 space-y-2 text-xs">
        <div className="flex justify-between font-bold">
          <span className="text-slate-600">Max Budget Target</span>
          <span className="text-slate-900">₹{budget.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between font-bold text-emerald-700">
          <span>Package Total</span>
          <span className="text-sm font-extrabold text-brand-700">₹{total.toLocaleString('en-IN')}</span>
        </div>

        {/* Visual Progress Line */}
        <div className="space-y-1 pt-1">
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-600 to-indigo-600 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>₹{total.toLocaleString('en-IN')}</span>
            <span className="text-emerald-700">₹{buffer.toLocaleString('en-IN')} under budget</span>
            <span>₹{budget.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Final Total Amount */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 font-semibold block">Total Amount Payable</span>
          <span className="text-2xl font-extrabold text-slate-900">
            ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
          One Trip • One Payment
        </span>
      </div>

      {/* Confirmation Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
          <input
            type="checkbox"
            checked={isConfirmed}
            onChange={(e) => onConfirmChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 cursor-pointer accent-brand-600"
          />
          <span className="font-medium leading-relaxed">
            I confirm that the traveller details are correct and I agree to the applicable booking and cancellation policies.
          </span>
        </label>
      </div>

      {/* Main Payment CTA Button */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          disabled={!isConfirmed || !isValidToPay}
          onClick={onInitiatePayment}
          className="w-full py-4 bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 disabled:opacity-40 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-brand-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Lock className="w-4 h-4" />
          <span>Pay ₹{total.toLocaleString('en-IN')} Securely</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Powered by Razorpay • Instant Vouchers Generated</span>
        </div>
      </div>

    </div>
  );
};
