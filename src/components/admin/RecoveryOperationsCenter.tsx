import React from 'react';
import { RotateCw, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { ADMIN_RECOVERIES } from '../../data/adminOperationsData';

export const RecoveryOperationsCenter: React.FC = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-card text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <RotateCw className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-extrabold text-white">
            🛠️ Autonomous Recovery Operations Center
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/30">
          4 Active Cases
        </span>
      </div>

      <p className="text-xs text-slate-400 font-medium leading-relaxed">
        When real-world disruptions or supplier overbookings occur, SafeBound's Recovery Agent detects the issue, computes the optimal fallback alternative, and executes self-healing logic.
      </p>

      {/* Recoveries Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[10px] uppercase font-mono text-slate-400">
              <th className="py-2.5 px-3">Trip ID</th>
              <th className="py-2.5 px-3">Detected Issue</th>
              <th className="py-2.5 px-3">Agent</th>
              <th className="py-2.5 px-3">Autonomous Action</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {ADMIN_RECOVERIES.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-3 font-mono font-bold text-brand-300">
                  {rec.tripId}
                </td>
                <td className="py-3 px-3 text-slate-200">
                  {rec.issue}
                </td>
                <td className="py-3 px-3 text-slate-400 font-mono">
                  {rec.agent}
                </td>
                <td className="py-3 px-3 text-emerald-300 text-[11px]">
                  {rec.actionTaken} <span className="text-slate-400">({rec.priceDifference})</span>
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold inline-block ${
                      rec.status === 'RESOLVED' || rec.status === 'REBOOKED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {rec.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
