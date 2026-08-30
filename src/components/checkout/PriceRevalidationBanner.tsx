import React from 'react';
import { Lock, AlertTriangle, RefreshCw, CheckCircle2, Clock } from 'lucide-react';

interface PriceRevalidationBannerProps {
  secondsRemaining: number;
  hasPriceChanged: boolean;
  previousPrice: number;
  updatedPrice: number;
  priceDelta: number;
  onRefreshLock: () => void;
  onAcceptUpdatedPrice?: () => void;
  onGoBack?: () => void;
  onToggleSimulateHike: () => void;
  isSimulatingHike: boolean;
}

export const PriceRevalidationBanner: React.FC<PriceRevalidationBannerProps> = ({
  secondsRemaining,
  hasPriceChanged,
  previousPrice,
  updatedPrice,
  priceDelta,
  onRefreshLock,
  onAcceptUpdatedPrice,
  onGoBack,
  onToggleSimulateHike,
  isSimulatingHike,
}) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="space-y-3">
      {/* 1. Price Lock Active Banner */}
      {!hasPriceChanged ? (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-card">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-extrabold text-white block">
                ✓ Price Revalidated & Guaranteed (₹{updatedPrice.toLocaleString('en-IN')})
              </span>
              <span className="text-[11px] text-slate-400">
                Direct supplier inventory reserved for your checkout session.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto font-mono">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Lock Expiry:</span>
              <span className="font-extrabold text-emerald-400 text-sm">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              onClick={onRefreshLock}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Refresh 10-minute price lock"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onToggleSimulateHike}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 font-bold border border-slate-700 transition"
            >
              {isSimulatingHike ? 'Reset Price' : 'Simulate Supplier Hike'}
            </button>
          </div>
        </div>
      ) : (
        /* 2. Price Change Alert (Section 4) */
        <div className="p-5 rounded-3xl bg-amber-950/40 border border-amber-500/50 text-white space-y-4 shadow-card animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm text-white">
                The Package Price Has Changed During Revalidation
              </h4>
              <p className="text-xs text-slate-300">
                Direct resort seat availability shifted. SafeBound will never silently charge or move funds without explicit review.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-center">
            <div>
              <span className="text-slate-400 block text-[10px]">Previous:</span>
              <span className="text-slate-300 line-through">₹{previousPrice.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Updated:</span>
              <span className="text-white font-extrabold">₹{updatedPrice.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Difference:</span>
              <span className="text-amber-400 font-extrabold">+₹{priceDelta.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onGoBack}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={onAcceptUpdatedPrice}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition"
            >
              Review Updated Price (₹{updatedPrice.toLocaleString('en-IN')})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
