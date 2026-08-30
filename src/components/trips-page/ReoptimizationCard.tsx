import React, { useState } from 'react';
import { Zap, CheckCircle2, Loader2, Clock, CloudRain, ArrowRight } from 'lucide-react';

export const ReoptimizationCard: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [resultFound, setResultFound] = useState(false);
  const [planAccepted, setPlanAccepted] = useState(false);

  const handleRunReoptimization = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setResultFound(true);
    }, 1200);
  };

  const handleAccept = () => {
    setPlanAccepted(true);
    alert('✓ Weather alternative applied! Kempty Falls visit shifted to 3:00 PM (Sunny window).');
  };

  return (
    <div className="bg-white rounded-3xl p-5 border-2 border-brand-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            24/7 AI Re-Optimization
          </h4>
        </div>

        <span className="text-[10px] font-bold text-slate-400">
          Continuous
        </span>
      </div>

      <p className="text-xs text-slate-600 font-medium leading-relaxed">
        Plans changed or weather shifting? SafeBound can re-evaluate your booked itinerary against real-time conditions.
      </p>

      {!resultFound ? (
        <button
          type="button"
          disabled={isRunning}
          onClick={handleRunReoptimization}
          className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
        >
          {isRunning ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Scanning weather radar & queues...</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5" />
              <span>⚡ Re-Optimize My Trip Now</span>
            </>
          )}
        </button>
      ) : (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2.5 text-xs animate-fadeIn">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold">
            <CloudRain className="w-4 h-4 text-amber-600" />
            <span>Weather Improvement Found for Tomorrow</span>
          </div>

          <p className="text-[11px] text-amber-800 leading-relaxed">
            Light rain predicted tomorrow at 10:00 AM during outdoor Kempty hike. SafeBound found an optimal clear sunny slot at <strong className="font-extrabold text-emerald-800">3:00 PM</strong> with zero fee!
          </p>

          {!planAccepted ? (
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition"
              >
                Use Alternative (3 PM)
              </button>
              <button
                type="button"
                onClick={() => setResultFound(false)}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200"
              >
                Keep 10 AM
              </button>
            </div>
          ) : (
            <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Updated in Timeline (3:00 PM Slot Locked)</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
