import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Radio, 
  Settings, 
  SlidersHorizontal,
  Train,
  Car
} from 'lucide-react';
import { UpcomingTripData } from '../../data/tripsData';

interface TripHeroCardProps {
  trip: UpcomingTripData;
  onOpenItinerary: () => void;
  onManageTrip: () => void;
}

export const TripHeroCard: React.FC<TripHeroCardProps> = ({
  trip,
  onOpenItinerary,
  onManageTrip,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 shadow-2xl text-white space-y-6 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header: Badge & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🟢 Trip Confirmed</span>
          </span>

          <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
            Booking ID: #{trip.id}
          </span>
        </div>

        <button
          type="button"
          onClick={onManageTrip}
          className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Manage Trip</span>
        </button>
      </div>

      {/* Trip Headline & Dates */}
      <div className="relative z-10 space-y-1">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
          <span>🏔️ {trip.title}</span>
        </h2>
        <p className="text-xs sm:text-sm text-brand-200 font-medium flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-400" />
          <span>{trip.dates} • {trip.duration}</span>
        </p>
      </div>

      {/* Visual Multi-Modal Route Visualizer (Delhi -> Dehradun -> Mussoorie) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 relative z-10 space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Coordinated Route Schedule
        </span>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm font-bold">
          
          {/* Node 1: Delhi */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-100 block">Delhi (DEL)</span>
              <span className="text-[10px] text-slate-400 font-normal">Departure 08:20 AM</span>
            </div>
          </div>

          {/* Transit 1 */}
          <div className="hidden sm:flex flex-1 items-center justify-center px-4">
            <div className="w-full border-t-2 border-dashed border-slate-600 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-sky-400 font-mono flex items-center gap-1 border border-slate-700">
                <Train className="w-3 h-3" />
                <span>🚆 Vande Bharat</span>
              </span>
            </div>
          </div>

          {/* Node 2: Dehradun */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-slate-700 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="text-slate-100 block">Dehradun Hub</span>
              <span className="text-[10px] text-slate-400 font-normal">Station Exit 12:20 PM</span>
            </div>
          </div>

          {/* Transit 2 */}
          <div className="hidden sm:flex flex-1 items-center justify-center px-4">
            <div className="w-full border-t-2 border-dashed border-slate-600 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-900 text-[10px] text-emerald-400 font-mono flex items-center gap-1 border border-slate-700">
                <Car className="w-3 h-3" />
                <span>🚕 Chauffeur</span>
              </span>
            </div>
          </div>

          {/* Node 3: Mussoorie */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-slate-100 block">Mussoorie Valley</span>
              <span className="text-[10px] text-slate-400 font-normal">Cedar View Retreat</span>
            </div>
          </div>

        </div>
      </div>

      {/* Live Monitoring Strip inside Hero */}
      <div className="p-4 rounded-2xl bg-brand-950/80 border border-brand-500/30 relative z-10 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <h4 className="text-xs sm:text-sm font-bold text-white">
              SafeBound is monitoring your trip in real-time
            </h4>
          </div>
          <span className="text-[11px] text-slate-300 font-medium">
            We'll adapt transfers and alert you automatically if anything changes.
          </span>
        </div>

        {/* 5 Live Monitoring Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Transport</span>
          <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Hotel</span>
          <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Transfers</span>
          <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Activities</span>
          <span className="flex items-center gap-1 text-emerald-300"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Weather</span>
        </div>
      </div>

      {/* Footer Stats & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 relative z-10">
        <div className="flex items-center gap-6 text-xs sm:text-sm">
          <div>
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Travellers</span>
            <span className="font-extrabold text-white">{trip.travellers} People</span>
          </div>
          <div className="h-7 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block font-bold">All-Inclusive Cost</span>
            <span className="font-extrabold text-brand-300 text-base">₹{trip.totalCost.toLocaleString('en-IN')}</span>
          </div>
          <div className="h-7 w-px bg-slate-700"></div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase block font-bold">Savings Buffer</span>
            <span className="font-extrabold text-emerald-400">₹{trip.remainingBuffer.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenItinerary}
            className="flex-1 sm:flex-none px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-1.5"
          >
            <span>Open Itinerary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
