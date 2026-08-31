import React from 'react';
import { AuditEvent, AuditEventType } from '../../backend/security/securityTypes';
import { ScrollText } from 'lucide-react';

interface AuditTrailFeedProps {
  events: AuditEvent[];
}

const typeConfig: Partial<Record<AuditEventType, { icon: string; cls: string }>> = {
  USER_LOGIN:                  { icon: '🔐', cls: 'text-emerald-400' },
  USER_LOGOUT:                 { icon: '🔓', cls: 'text-slate-400' },
  TRAVELLER_UPDATED:           { icon: '👤', cls: 'text-sky-400' },
  TRAVELLER_SNAPSHOT_CREATED:  { icon: '📸', cls: 'text-purple-400' },
  PACKAGE_SELECTED:            { icon: '📦', cls: 'text-amber-400' },
  PAYMENT_CREATED:             { icon: '💳', cls: 'text-sky-400' },
  PAYMENT_VERIFIED:            { icon: '✅', cls: 'text-emerald-400' },
  BOOKING_STARTED:             { icon: '🚀', cls: 'text-brand-400' },
  BOOKING_CONFIRMED:           { icon: '🎉', cls: 'text-emerald-400' },
  AI_TOOL_CALLED:              { icon: '🤖', cls: 'text-purple-400' },
  AI_TOOL_BLOCKED:             { icon: '🛑', cls: 'text-rose-400' },
  RECOVERY_STARTED:            { icon: '🔄', cls: 'text-amber-400' },
  USER_APPROVAL_REQUESTED:     { icon: '⏳', cls: 'text-amber-400' },
  USER_APPROVED:               { icon: '✅', cls: 'text-emerald-400' },
  USER_REJECTED:               { icon: '❌', cls: 'text-rose-400' },
  REFUND_REQUESTED:            { icon: '↩️', cls: 'text-rose-400' },
  WEBHOOK_RECEIVED:            { icon: '📡', cls: 'text-sky-400' },
  WEBHOOK_VERIFIED:            { icon: '🔒', cls: 'text-emerald-400' },
  WEBHOOK_REJECTED:            { icon: '⚠️', cls: 'text-rose-400' },
  SUSPICIOUS_ACTIVITY:         { icon: '🚨', cls: 'text-rose-400' },
};

const resultBadge = (result: AuditEvent['result']) => {
  if (result === 'SUCCESS') return <span className="text-emerald-400 font-mono text-[9px] font-bold">SUCCESS</span>;
  if (result === 'DENIED') return <span className="text-rose-400 font-mono text-[9px] font-bold">DENIED</span>;
  return <span className="text-amber-400 font-mono text-[9px] font-bold">FAILED</span>;
};

export const AuditTrailFeed: React.FC<AuditTrailFeedProps> = ({ events }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ScrollText className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">Audit Trail</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-500">{events.length} events</span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
        {events.length === 0 ? (
          <p className="text-xs text-slate-500 font-mono text-center py-4">No audit events yet.</p>
        ) : (
          events.map((evt) => {
            const cfg = typeConfig[evt.type] ?? { icon: '📝', cls: 'text-slate-400' };
            return (
              <div
                key={evt.eventId}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/70 text-xs"
              >
                <span className="text-base shrink-0 mt-0.5">{cfg.icon}</span>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-extrabold font-mono text-[10px] ${cfg.cls}`}>
                      {evt.type.replace(/_/g, ' ')}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {resultBadge(evt.result)}
                      <span className="text-slate-600 font-mono text-[9px]">{evt.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 truncate">
                    <span className="text-slate-500">Actor: </span>{evt.actor}
                    <span className="text-slate-600"> · </span>
                    <span className="text-slate-500">Resource: </span>{evt.resource}
                  </p>
                  <p className="text-slate-500 text-[10px] font-mono">{evt.action}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
