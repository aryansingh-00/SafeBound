import React from 'react';
import { Train, Building, Car, Compass, CheckCircle2, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { TripBookingDetail } from '../../data/tripsData';

interface BookingsSectionProps {
  bookings: TripBookingDetail[];
  onViewBooking: (booking: TripBookingDetail) => void;
}

export const BookingsSection: React.FC<BookingsSectionProps> = ({
  bookings,
  onViewBooking,
}) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Your Coordinated Bookings</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Every ticket, voucher and seat reservation unified under one escrow transaction.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">
          {bookings.length} Confirmed Assets
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bookings.map((b) => {
          const Icon =
            b.type === 'transport'
              ? Train
              : b.type === 'hotel'
              ? Building
              : b.type === 'transfer'
              ? Car
              : Compass;

          return (
            <div
              key={b.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {b.provider}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{b.title}</h4>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === 'Changed'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 mt-3 pt-2 border-t border-slate-200/60">
                  <p className="font-semibold text-slate-800">{b.dateTime}</p>
                  <p className="text-[11px] text-slate-500">{b.details}</p>
                  {b.notes && <p className="text-[11px] text-brand-700 font-semibold">{b.notes}</p>}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700">{b.bookingRef}</span>

                <button
                  type="button"
                  onClick={() => onViewBooking(b)}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
                >
                  <span>{b.type === 'transport' ? 'View Ticket' : 'View Voucher'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
