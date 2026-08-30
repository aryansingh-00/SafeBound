import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Clock, Car, ArrowRight, X } from 'lucide-react';

interface DisruptionAlertProps {
  onViewChanges: () => void;
}

export const DisruptionAlert: React.FC<DisruptionAlertProps> = ({ onViewChanges }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-brand-500/15 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-md space-y-4 animate-fadeIn my-4">
      
      {/* Top Banner */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                ⚠️ Live Disruption Detected: Train Delay (1h 35m)
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                ✓ Resolved by Transfer Agent
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Vande Bharat Express (DEL ➔ DDN) has been held at Saharanpur due to track clearing. SafeBound Transfer Agent immediately adjusted your private chauffeur pickup.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Adaptive Change Diff Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white/90 p-4 rounded-2xl border border-slate-200 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Original Station Pickup</span>
          <span className="font-bold text-slate-400 line-through">10:45 AM (Dehradun)</span>
        </div>

        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Updated Adaptive Pickup</span>
          <span className="font-extrabold text-emerald-700 text-sm flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>12:20 PM (Synchronized)</span>
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            ✓ Driver Notified
          </span>

          <button
            type="button"
            onClick={onViewChanges}
            className="px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

    </div>
  );
};
