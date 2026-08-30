import React from 'react';
import { Terminal, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface WebhookTelemetryInspectorProps {
  lastEvent?: {
    event: string;
    orderId: string;
    paymentId: string;
    timestamp: string;
    hmacDigest: string;
  } | null;
}

export const WebhookTelemetryInspector: React.FC<WebhookTelemetryInspectorProps> = ({ lastEvent }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 space-y-4 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-extrabold text-white">
            Server-to-Server Razorpay Webhook & HMAC Stream
          </h3>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          ● Webhook Listener Active (Idempotency Locked)
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
        {lastEvent ? (
          <div className="space-y-1.5 animate-fadeIn">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Event: {lastEvent.event}</span>
              </span>
              <span className="text-slate-400">{lastEvent.timestamp}</span>
            </div>
            <div className="text-slate-300 text-[10px]">Order: <span className="text-white">{lastEvent.orderId}</span></div>
            <div className="text-slate-300 text-[10px]">Payment: <span className="text-white">{lastEvent.paymentId}</span></div>
            <div className="text-slate-400 text-[9px] truncate">HMAC Token: {lastEvent.hmacDigest}</div>
          </div>
        ) : (
          <div className="text-slate-500 text-center py-2 text-xs">
            Awaiting payment capture webhook from Razorpay...
          </div>
        )}
      </div>
    </div>
  );
};
