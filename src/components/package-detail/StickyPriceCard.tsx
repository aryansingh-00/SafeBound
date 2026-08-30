import React from 'react';
import { ShieldCheck, ArrowRight, Lock, Sparkles, Check } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface StickyPriceCardProps {
  pkg: TripResultPackage;
  onProceedToReview: () => void;
  isOptimized?: boolean;
}

export const StickyPriceCard: React.FC<StickyPriceCardProps> = ({
  pkg,
  onProceedToReview,
  isOptimized = false,
}) => {
  const budget = 40000;
  const remaining = budget - pkg.totalPrice;
  const progressPercent = Math.min(100, Math.round((pkg.totalPrice / budget) * 100));

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5 sticky top-24">
      
      {/* Header & Match */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
            Single Escrow Booking
          </span>
          <h3 className="text-lg font-extrabold text-slate-900">Package Pricing</h3>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
          {pkg.matchScore}% Fit
        </span>
      </div>

      {/* Itemized Price Breakdown */}
      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Return Train (2 AC Chairs)</span>
          <span className="font-bold text-slate-900">₹{pkg.transport.cost.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>4★ Mountain Suite (3 Nights)</span>
          <span className="font-bold text-slate-900">₹{pkg.hotel.cost.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Dedicated Hill Chauffeur Cab</span>
          <span className="font-bold text-slate-900">₹{pkg.transfer.cost.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>2 Curated VIP Activity Passes</span>
          <span className="font-bold text-slate-900">₹{pkg.activities.cost.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>SafeBound Escrow & GST (All-Inclusive)</span>
          <span className="font-bold text-emerald-700">₹0 (Included)</span>
        </div>

        {/* Subtotal Line */}
        <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
          <span className="text-sm font-extrabold text-slate-900">Final Total</span>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-slate-900 block">
              ₹{pkg.totalPrice.toLocaleString('en-IN')}
            </span>
            {isOptimized && (
              <span className="text-[10px] font-bold text-emerald-600 block">
                ✓ ₹1,450 Optimization Applied
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Budget Protection Progress Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex justify-between text-[11px] font-bold">
          <span className="text-slate-600">Your Hard Budget: ₹{budget.toLocaleString('en-IN')}</span>
          <span className="text-emerald-700">₹{remaining.toLocaleString('en-IN')} Left</span>
        </div>

        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-600 to-emerald-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>🔒 Within your hard limits. No unexpected surges.</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={onProceedToReview}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          <span>Review & Book — ₹{pkg.totalPrice.toLocaleString('en-IN')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] text-center text-slate-400">
          Review legal details & confirm travellers before payment.
        </p>
      </div>

    </div>
  );
};
