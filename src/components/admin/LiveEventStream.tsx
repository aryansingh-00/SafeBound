import React from 'react';
import { Terminal, Activity, Zap, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ADMIN_EVENT_STREAM, LiveEventLogItem } from '../../data/adminOperationsData';

interface LiveEventStreamProps {
  events: LiveEventLogItem[];
}

export const LiveEventStream: React.FC<LiveEventStreamProps> = ({ events }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-card text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-brand-400" />
          <h3 className="text-base font-extrabold text-white">
            📡 Live Autonomous Event Stream & Agent Rationales
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-slate-400">
          Real-time Audit Log
        </span>
      </div>

      <div className="space-y-3 font-mono text-xs max-h-96 overflow-y-auto pr-1">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 animate-fadeIn"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[10px]">{evt.timestamp}</span>
                <span className="px-2 py-0.2 rounded bg-slate-800 text-brand-300 font-bold text-[10px]">
                  {evt.eventType}
                </span>
                <span className="text-slate-300 font-bold">{evt.tripId}</span>
              </div>

              <span className="text-slate-400 text-[10px]">Agent: <strong className="text-white">{evt.agentName}</strong></span>
            </div>

            <p className="text-slate-200 text-xs leading-relaxed font-sans font-medium">
              {evt.summary}
            </p>

            {/* Decision Factors */}
            <div className="pt-1.5 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-400">
              <span className="font-bold text-slate-400">Decision Inputs:</span>
              {evt.decisionFactors.map((fac, idx) => (
                <span key={idx} className="px-2 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-300">
                  {fac}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
