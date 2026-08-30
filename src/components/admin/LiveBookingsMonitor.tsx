import React from 'react';
import { CreditCard, CheckCircle2, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { ADMIN_ACTIVE_BOOKINGS, ActiveBookingItem } from '../../data/adminOperationsData';

interface LiveBookingsMonitorProps {
  onSelectBooking?: (booking: ActiveBookingItem) => void;
}

export const LiveBookingsMonitor: React.FC<LiveBookingsMonitorProps> = ({ onSelectBooking }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 shadow-card text-white">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-brand-400" />
          <h3 className="text-base font-extrabold text-white">
            Active Multi-Agent Bookings in Flight
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {ADMIN_ACTIVE_BOOKINGS.length} Active Sessions
        </span>
      </div>

      <div className="space-y-3">
        {ADMIN_ACTIVE_BOOKINGS.map((b) => (
          <div
            key={b.id}
            onClick={() => onSelectBooking && onSelectBooking(b)}
            className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-brand-500/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs cursor-pointer group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-brand-300 text-sm">{b.id}</span>
                <span className="text-slate-400">•</span>
                <h4 className="font-bold text-white group-hover:text-brand-300 transition">{b.tripName}</h4>
              </div>
              <p className="text-slate-400 text-[11px]">
                Traveller: {b.traveller} • Escrow: ₹{b.amount.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Stepper Progress Badges */}
            <div className="flex items-center gap-1.5 font-mono text-[10px]">
              <span className={`px-2 py-0.5 rounded ${b.stepStatuses.payment ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                Pay: {b.stepStatuses.payment ? '✓' : '...'}
              </span>
              <span className={`px-2 py-0.5 rounded ${b.stepStatuses.transport ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                Trn: {b.stepStatuses.transport ? '✓' : '...'}
              </span>
              <span className={`px-2 py-0.5 rounded ${b.stepStatuses.hotel ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                Htl: {b.stepStatuses.hotel ? '✓' : '●'}
              </span>
              <span className={`px-2 py-0.5 rounded ${b.stepStatuses.transfer ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                Cab: {b.stepStatuses.transfer ? '✓' : '...'}
              </span>
              <span className={`px-2 py-0.5 rounded ${b.stepStatuses.activities ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'}`}>
                Act: {b.stepStatuses.activities ? '✓' : '...'}
              </span>
            </div>

            {/* Status Button */}
            <span
              className={`px-3 py-1.5 rounded-xl font-bold text-[11px] self-start sm:self-auto shrink-0 ${
                b.status === 'CONFIRMED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : b.status === 'ACTION_REQUIRED'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                  : 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
              }`}
            >
              {b.status === 'ACTION_REQUIRED' ? '⚠️ Recovery Pending' : b.status}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
