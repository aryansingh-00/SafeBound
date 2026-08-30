import React from 'react';
import { Clock, CheckCircle2, AlertCircle, Train, Building, Car, Compass, ArrowRight } from 'lucide-react';
import { TripTimelineEvent } from '../../data/tripsData';

interface TripTimelineProps {
  timeline: TripTimelineEvent[];
}

export const TripTimeline: React.FC<TripTimelineProps> = ({ timeline }) => {
  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Itinerary Timeline
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Sequential schedule automatically synchronized with live transport and hotel reservations.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
          🟢 Auto-Sync Active
        </span>
      </div>

      {/* Vertical Timeline Nodes */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {timeline.map((item) => {
          const isChanged = item.status === 'Changed';
          const isConfirmed = item.status === 'Confirmed';

          const IconComponent =
            item.type === 'transport'
              ? Train
              : item.type === 'hotel'
              ? Building
              : item.type === 'transfer'
              ? Car
              : Compass;

          return (
            <div key={item.id} className="relative group">
              
              {/* Timeline Pin Marker */}
              <div
                className={`absolute -left-[27px] sm:-left-[31px] top-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 bg-white shadow-xs ${
                  isChanged
                    ? 'border-amber-500 text-amber-600 ring-2 ring-amber-400/30'
                    : isConfirmed
                    ? 'border-brand-600 text-brand-600'
                    : 'border-slate-300 text-slate-400'
                }`}
              >
                <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>

              {/* Event Content Card */}
              <div
                className={`p-4 rounded-2xl border transition ${
                  isChanged
                    ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                    : 'bg-slate-50/80 hover:bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-brand-700 uppercase tracking-wider">
                      {item.dateStr}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{item.timeStr}</span>
                    </span>
                  </div>

                  {item.badgeText && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${
                        isChanged
                          ? 'bg-amber-200 text-amber-900'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badgeText}
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{item.subtitle}</p>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
