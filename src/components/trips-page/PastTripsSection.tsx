import React from 'react';
import { Calendar, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { PAST_TRIPS } from '../../data/tripsData';

interface PastTripsSectionProps {
  onViewPastTrip: (tripTitle: string) => void;
}

export const PastTripsSection: React.FC<PastTripsSectionProps> = ({ onViewPastTrip }) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-5">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Past Completed Trips</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Archived itineraries, historical expense receipts and memories.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">
          {PAST_TRIPS.length} Trips Completed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAST_TRIPS.map((trip) => (
          <div
            key={trip.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={trip.imageUrl}
                alt={trip.title}
                className="w-16 h-16 rounded-2xl object-cover"
              />

              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-brand-600 transition">
                    {trip.destination}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                    Completed
                  </span>
                </div>

                <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{trip.dates}</span>
                </p>

                <p className="text-xs font-extrabold text-slate-900 mt-1">
                  ₹{trip.totalSpent.toLocaleString('en-IN')}
                  <span className="text-[10px] text-slate-400 font-normal"> • {trip.bookingsCount} Assets</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onViewPastTrip(trip.title)}
              className="px-3 py-2 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-bold text-xs rounded-xl border border-slate-200 shadow-xs transition flex items-center gap-1"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

    </section>
  );
};
