import React from 'react';
import { TripHealthSnapshot, BookingStatus } from '../../backend/itinerary/itineraryTypes';
import { Train, Building, Car, Ticket, ShieldCheck, AlertTriangle } from 'lucide-react';

interface TripHealthSummaryBarProps {
  health: TripHealthSnapshot;
  destination: string;
  dates: string;
  totalPaid: number;
  version: number;
}

const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  const cfg: Record<BookingStatus, { label: string; cls: string }> = {
    CONFIRMED: { label: '✓ Confirmed', cls: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' },
    PROCESSING: { label: '⏳ Processing', cls: 'text-amber-300 bg-amber-500/10 border-amber-500/30' },
    CHANGED: { label: '⚠ Updated', cls: 'text-amber-300 bg-amber-500/10 border-amber-500/30' },
    CANCELLED: { label: '✕ Cancelled', cls: 'text-rose-300 bg-rose-500/10 border-rose-500/30' },
    ACTION_REQUIRED: { label: '! Action Required', cls: 'text-rose-300 bg-rose-500/10 border-rose-500/30' },
  };
  const { label, cls } = cfg[status];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${cls}`}>
      {label}
    </span>
  );
};

export const TripHealthSummaryBar: React.FC<TripHealthSummaryBarProps> = ({
  health,
  destination,
  dates,
  totalPaid,
  version,
}) => {
  const components = [
    { label: 'Transport', icon: Train, status: health.transport },
    { label: 'Hotel', icon: Building, status: health.hotel },
    { label: 'Transfer', icon: Car, status: health.transfer },
    { label: 'Activities', icon: Ticket, status: health.activities },
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 text-white shadow-card">
      {/* Trip Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              🏔️ {destination} · 4 Days
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-mono text-[10px]">
              v{version}
            </span>
          </div>
          <p className="text-sm text-slate-400">{dates} · 2 Travellers · Trip ID: SB-TRIP-8X72K</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl font-extrabold text-emerald-400">₹{totalPaid.toLocaleString('en-IN')}</span>
          <span className="text-[11px] text-slate-400 font-mono">Paid via Razorpay</span>
          <div className="flex items-center gap-1.5 mt-1">
            {health.overallHealth === 'GOOD' ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Trip Health: Good
              </span>
            ) : (
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Trip Health: Warning
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Component Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {components.map(({ label, icon: Icon, status }) => (
          <div key={label} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Icon className="w-3.5 h-3.5" />
              <span className="font-bold text-[11px]">{label}</span>
            </div>
            <StatusBadge status={status} />
          </div>
        ))}
      </div>
    </div>
  );
};
