import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, CheckCircle2, Zap, Tag, FileText } from 'lucide-react';
import { DASHBOARD_RECENT_ACTIVITY } from '../../data/dashboardData';

export const RecentActivityFeed: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'booked': return CheckCircle2;
      case 'optimized': return Zap;
      case 'alert': return Tag;
      default: return FileText;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-600" />
          <span>Recent Activity & Autonomous Events</span>
        </h3>
        <span className="text-[10px] font-mono text-slate-400">Live Stream</span>
      </div>

      <div className="space-y-3 text-xs">
        {DASHBOARD_RECENT_ACTIVITY.map((act) => {
          const Icon = getIcon(act.type);
          return (
            <Link
              key={act.id}
              to={act.link}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 hover:bg-brand-50/40 transition flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-white text-brand-600 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-slate-900 group-hover:text-brand-700">{act.title}</h4>
                  <p className="text-[11px] text-slate-500">{act.description}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-400 shrink-0 self-center">
                {act.timestamp}
              </span>
            </Link>
          );
        })}
      </div>

    </div>
  );
};
