import React from 'react';
import { Clock, CheckCircle2, Train, Building, Compass } from 'lucide-react';
import { DASHBOARD_UPCOMING_ACTIONS } from '../../data/dashboardData';

export const UpcomingActionsList: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-600" />
          <span>Your Next Trip Milestones</span>
        </h3>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
          ✓ All On Track
        </span>
      </div>

      <div className="space-y-3">
        {DASHBOARD_UPCOMING_ACTIONS.map((act) => (
          <div
            key={act.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900">{act.title}</h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.2 rounded">
                {act.status}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">{act.timing}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
