import React from 'react';
import { SecurityMetrics } from '../../backend/security/securityTypes';
import { Shield, UserCheck, AlertTriangle, Bot, Webhook, Activity } from 'lucide-react';

interface SecurityMetricsDashProps {
  metrics: SecurityMetrics;
}

export const SecurityMetricsDash: React.FC<SecurityMetricsDashProps> = ({ metrics }) => {
  const tiles = [
    { label: 'Active Sessions', value: metrics.activeSessions, icon: UserCheck, color: 'emerald' },
    { label: 'Failed Logins', value: metrics.failedLogins, icon: AlertTriangle, color: 'amber' },
    { label: 'Webhook Events', value: metrics.webhookErrors, icon: Webhook, color: 'sky' },
    { label: 'AI Tool Calls', value: metrics.aiToolCalls, icon: Bot, color: 'purple' },
    { label: 'AI Tools Blocked', value: metrics.aiToolsBlocked, icon: Shield, color: 'rose' },
    { label: 'Total Audit Events', value: metrics.totalAuditEvents, icon: Activity, color: 'slate' },
  ];

  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    amber:   'text-amber-400 bg-amber-500/10 border-amber-500/30',
    sky:     'text-sky-400 bg-sky-500/10 border-sky-500/30',
    purple:  'text-purple-400 bg-purple-500/10 border-purple-500/30',
    rose:    'text-rose-400 bg-rose-500/10 border-rose-500/30',
    slate:   'text-slate-400 bg-slate-500/10 border-slate-500/30',
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
        <Shield className="w-5 h-5 text-brand-400" />
        <h3 className="text-sm font-extrabold text-white">Security Dashboard</h3>
        <span className="ml-auto text-[10px] font-mono text-emerald-400">🟢 All Systems Normal</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {tiles.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className={`p-4 rounded-2xl bg-slate-950 border ${colorMap[color].split(' ')[2]} space-y-2`}
          >
            <div className={`flex items-center gap-1.5 text-[11px] font-bold ${colorMap[color].split(' ')[0]}`}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
            <p className="text-2xl font-extrabold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Boundary principle */}
      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-mono space-y-0.5 text-slate-500">
        <p className="text-slate-300 font-bold text-xs mb-1.5">Security Boundary Model</p>
        <p>✓ Frontend: Never holds provider secrets or payment keys</p>
        <p>✓ AI Agent: Reads minimum necessary trip context only</p>
        <p>✓ AI Tools: Pass through authorization + business rule gates</p>
        <p>✓ Documents: Served via short-lived authenticated signed URLs</p>
        <p>✓ Payment: Verified independently by backend after Razorpay webhook</p>
      </div>
    </div>
  );
};
