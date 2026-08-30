import React, { useState } from 'react';
import { AlertTriangle, Sparkles, X, ArrowRight, Zap } from 'lucide-react';

interface PriceChangeAlertProps {
  onViewAlternative: () => void;
}

export const PriceChangeAlert: React.FC<PriceChangeAlertProps> = ({
  onViewAlternative,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-brand-500/15 border-2 border-amber-400 rounded-3xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn my-4">
      
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
          <AlertTriangle className="w-4 h-4" />
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
              ⚠️ Live Price Radar Alert: Flight Inventory Shift Detected
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-amber-200 text-amber-900">
              Live Re-route
            </span>
          </div>

          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Goa afternoon return flights increased by +₹701. SafeBound instantly found a verified alternative combo for <strong className="text-emerald-700 font-extrabold">₹18,499</strong> (Zero price hike).
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
        <button
          type="button"
          onClick={onViewAlternative}
          className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1"
        >
          <Zap className="w-3 h-3" />
          <span>Lock In Alternative</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
