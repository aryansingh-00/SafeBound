import React from 'react';
import { Terminal, ShieldCheck, CheckCircle2, RotateCw } from 'lucide-react';

interface MonitoringTelemetryFeedProps {
  logs: {
    id: string;
    agent: string;
    timestamp: string;
    status: string;
    details: string;
  }[];
}

export const MonitoringTelemetryFeed: React.FC<MonitoringTelemetryFeedProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-extrabold text-white">
            Live Sentinel Telemetry Stream
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ● Background Worker Polling Active
        </span>
      </div>

      <div className="space-y-2 font-mono text-xs max-h-60 overflow-y-auto pr-1">
        {logs.map((l) => (
          <div
            key={l.id}
            className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500">{l.timestamp}</span>
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-brand-300 font-bold text-[9px]">
                  {l.agent}
                </span>
                <span className="text-slate-200 font-bold text-xs">{l.status}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">{l.details}</p>
            </div>

            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-emerald-300 self-end sm:self-auto shrink-0">
              ✓ SYNCED
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
