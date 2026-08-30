import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { DashboardUpcomingTrip } from '../../data/dashboardData';

interface UpcomingTripCardProps {
  trip: DashboardUpcomingTrip;
}

export const UpcomingTripCard: React.FC<UpcomingTripCardProps> = ({ trip }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-0.5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Confirmed Upcoming Journey
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🏔️ {trip.destination} Escape</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
              🟢 {trip.status}
            </span>
          </h3>
        </div>

        <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-xl border border-brand-200 w-fit">
          In {trip.daysLeft} Days • {trip.startDate}
        </span>
      </div>

      {/* Route & Trip Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Left: Route & Metadata (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              <span>{trip.startDate} – {trip.endDate}</span>
            </span>
            <span>•</span>
            <span>{trip.days} Days / 3 Nights</span>
            <span>•</span>
            <span>{trip.travellers} Travellers</span>
          </div>

          {/* Route Visualizer */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Synchronized Multi-Modal Route</span>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 overflow-x-auto pb-1 scrollbar-none">
              <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shrink-0">🚆 Delhi (NDLS)</span>
              <span className="text-slate-400">➔</span>
              <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200 shrink-0">🚕 Dehradun (DDN)</span>
              <span className="text-slate-400">➔</span>
              <span className="px-2.5 py-1 bg-brand-50 text-brand-800 rounded-lg border border-brand-200 shrink-0">🏨 Mussoorie 4★</span>
            </div>
          </div>
        </div>

        {/* Right: 5-Point Trip Health Radar (5 cols) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Trip Health Sentinel</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.2 rounded">
              Optimal
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-emerald-900 font-semibold">
            <span className="flex items-center gap-1">✓ Bookings Locked</span>
            <span className="flex items-center gap-1">✓ Train On Schedule</span>
            <span className="flex items-center gap-1">✓ 4★ Stay Confirmed</span>
            <span className="flex items-center gap-1">✓ 23°C Weather Fair</span>
            <span className="flex items-center gap-1 col-span-2">✓ Chauffeur Synchronized</span>
          </div>
        </div>

      </div>

      {/* Footer CTAs */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-mono font-bold text-slate-500">
          Booking Ref: {trip.id}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate('/trips')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition"
          >
            Open Live Trip Center
          </button>

          <button
            type="button"
            onClick={() => navigate('/trips/SB-MUSSOORIE-4D/confirmed')}
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <span>View Full Itinerary</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
