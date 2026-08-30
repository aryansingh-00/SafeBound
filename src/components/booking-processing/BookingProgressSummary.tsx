import React from 'react';
import { CheckCircle2, Loader2, Circle, ShieldCheck } from 'lucide-react';

interface BookingProgressSummaryProps {
  confirmedCount: number;
  totalServices: number;
  serviceStatuses: { name: string; status: 'confirmed' | 'processing' | 'pending' }[];
}

export const BookingProgressSummary: React.FC<BookingProgressSummaryProps> = ({
  confirmedCount,
  totalServices,
  serviceStatuses,
}) => {
  return (
    <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4 text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
            Booking Progress Summary
          </h4>
          <span className="text-[10px] text-slate-400">All components unified in one escrow</span>
        </div>

        <span className="text-xs font-mono font-extrabold text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
          {confirmedCount} / {totalServices} Confirmed
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {serviceStatuses.map((s, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-slate-300">
              {s.status === 'confirmed' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : s.status === 'processing' ? (
                <Loader2 className="w-3.5 h-3.5 text-brand-400 animate-spin shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <span className={s.status === 'confirmed' ? 'text-white font-semibold' : s.status === 'processing' ? 'text-brand-300 font-bold' : 'text-slate-500'}>
                {s.name}
              </span>
            </span>

            <span
              className={`text-[10px] font-mono font-bold capitalize ${
                s.status === 'confirmed'
                  ? 'text-emerald-400'
                  : s.status === 'processing'
                  ? 'text-brand-400 animate-pulse'
                  : 'text-slate-600'
              }`}
            >
              {s.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
