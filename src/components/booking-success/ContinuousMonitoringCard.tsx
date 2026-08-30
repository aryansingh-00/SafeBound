import React from 'react';
import { ShieldCheck, Zap, Radio, Bell } from 'lucide-react';

export const ContinuousMonitoringCard: React.FC = () => {
  const monitoringItems = [
    { label: 'Transport Monitoring', desc: 'Live IRCTC signal telemetry' },
    { label: 'Weather Radar', desc: 'Continuous mountain rainfall scans' },
    { label: 'Transfer Sync', desc: 'Chauffeur arrival adaptation' },
    { label: 'Activity Passes', desc: 'VIP slot validity verification' },
    { label: 'Proactive Recovery', desc: 'Autonomous fallback options ready' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-5">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              🟢 SafeBound 24/7 Sentinel Monitoring
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Booking is complete, but SafeBound doesn't stop here.
            </span>
          </div>
        </div>

        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
          Active Sentinel
        </span>
      </div>

      <p className="text-xs text-slate-600 font-medium leading-relaxed">
        Our multi-agent system continuously checks live transport delays, road clearances, and weather conditions. If anything important changes, SafeBound will adapt your schedule and notify you immediately.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
        {monitoringItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-2"
          >
            <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-extrabold shrink-0 mt-0.5">
              ✓
            </span>
            <div>
              <strong className="font-extrabold text-emerald-950 block">{item.label}</strong>
              <span className="text-[11px] text-emerald-800">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
