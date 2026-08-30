import React from 'react';
import { Activity, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';
import { ADMIN_PROVIDERS } from '../../data/adminOperationsData';

export const ProviderAPIHealthGrid: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-card text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-extrabold text-white">
            🔌 External Provider & API Health
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
          99.8% Global Uptime
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {ADMIN_PROVIDERS.map((prv) => (
          <div
            key={prv.id}
            className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-extrabold text-white">{prv.name}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{prv.service}</span>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                  prv.status === 'OPERATIONAL'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {prv.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 font-mono text-[10px] text-slate-400">
              <span>Latency: <strong className="text-slate-200">{prv.latency}</strong></span>
              <span>24h Uptime: <strong className="text-slate-200">{prv.uptime24h}</strong></span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
