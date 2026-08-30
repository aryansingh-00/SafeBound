import React from 'react';
import { MapPin, CreditCard, CheckCircle2, Bot, RotateCw, Wallet, ArrowUpRight } from 'lucide-react';
import { ADMIN_KPIS } from '../../data/adminOperationsData';

export const OperationsKPIGrid: React.FC = () => {
  const kpis = [
    { label: 'Active Trips Monitored', value: ADMIN_KPIS.activeTrips, change: '+14% vs last week', icon: MapPin, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
    { label: 'Bookings Orchestrated Today', value: ADMIN_KPIS.bookingsToday, change: '100% Escrow backed', icon: CreditCard, color: 'text-brand-400 bg-brand-500/10 border-brand-500/30' },
    { label: 'Autonomous Success Rate', value: `${ADMIN_KPIS.successRate}%`, change: 'Multi-agent verified', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { label: 'Active Micro-Agents', value: ADMIN_KPIS.activeMicroAgents, change: '10 Agent swarms', icon: Bot, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
    { label: 'Self-Healing Recoveries', value: ADMIN_KPIS.recoveriesToday, change: 'Zero human intervention', icon: RotateCw, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { label: 'Total GMV in Smart Escrow', value: ADMIN_KPIS.totalGMV, change: 'Razorpay vault secured', icon: Wallet, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {kpis.map((k, idx) => {
        const Icon = k.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 truncate">
                {k.label}
              </span>
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center border ${k.color}`}>
                <Icon className="w-3 h-3" />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                {k.value}
              </div>
              <span className="text-[10px] text-slate-400 font-medium truncate block">
                {k.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
