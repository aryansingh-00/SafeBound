import React from 'react';
import { ItineraryChangeRecord } from '../../backend/itinerary/itineraryTypes';
import { History, ArrowRight, Bot } from 'lucide-react';

interface ItineraryChangeHistoryProps {
  changes: ItineraryChangeRecord[];
  currentVersion: number;
}

export const ItineraryChangeHistory: React.FC<ItineraryChangeHistoryProps> = ({
  changes,
  currentVersion,
}) => {
  if (changes.length === 0) {
    return (
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-5 h-5 text-slate-500" />
          <h3 className="text-sm font-extrabold text-white">Itinerary Change History</h3>
        </div>
        <p className="text-xs text-slate-500 font-mono">
          No changes recorded. All bookings reflect original confirmed state (v1).
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 shadow-card text-white">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-extrabold text-white">Itinerary Version History</h3>
        </div>
        <span className="font-mono text-[10px] text-brand-300 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/30">
          Current: v{currentVersion}
        </span>
      </div>

      <div className="space-y-3">
        {changes.map((chg) => (
          <div
            key={chg.id}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-400">{chg.timestamp}</span>
                <span className="px-2 py-0.2 rounded bg-brand-500/20 text-brand-300 font-mono text-[9px] font-bold border border-brand-500/30">
                  v{chg.version - 1} → v{chg.version}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400">
                <Bot className="w-3 h-3 text-brand-400" />
                <span>{chg.handledBy}</span>
              </div>
            </div>

            <div>
              <span className="font-extrabold text-white block">{chg.field}</span>
              <div className="flex items-center gap-2 mt-1 font-mono text-[11px]">
                <span className="text-slate-400 line-through">{chg.before}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
                <span className="text-brand-300 font-bold">{chg.after}</span>
              </div>
            </div>

            <p className="text-slate-400 text-[11px] leading-relaxed">
              <span className="font-bold text-slate-300">Reason:</span> {chg.reason}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
