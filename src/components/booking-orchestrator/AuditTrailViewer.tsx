import React from 'react';
import { BookingAuditEntry } from '../../backend/booking-orchestrator/bookingTypes';
import { Terminal, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface AuditTrailViewerProps {
  logs: BookingAuditEntry[];
}

export const AuditTrailViewer: React.FC<AuditTrailViewerProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-extrabold text-white">
            Deterministic Transaction & Audit Telemetry Log
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Immutable Multi-Agent Ledger
        </span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto font-mono text-xs pr-1">
        {logs.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-500 text-center">
            No active orchestration logs. Trigger a booking simulation below.
          </div>
        ) : (
          logs.map((log) => {
            const isSuccess = log.result === 'SUCCESS';
            const isFailure = log.result === 'FAILURE';
            const isRecovery = log.result === 'RECOVERY';

            return (
              <div
                key={log.id}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">{log.timestamp}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-brand-300 font-bold text-[9px]">
                      {log.agentOrService}
                    </span>
                    <span className="text-white font-bold text-xs">{log.action}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">{log.details}</p>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold self-end sm:self-auto shrink-0 ${
                    isSuccess
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isFailure
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : isRecovery
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {log.result}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
