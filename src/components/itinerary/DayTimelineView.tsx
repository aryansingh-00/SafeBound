import React from 'react';
import { ItineraryDay, TimelineEvent } from '../../backend/itinerary/itineraryTypes';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DayTimelineViewProps {
  days: ItineraryDay[];
}

const EventCard: React.FC<{ event: TimelineEvent }> = ({ event }) => {
  return (
    <div
      className={`relative pl-10 pb-5 last:pb-0 ${event.isAdjusted ? 'opacity-100' : 'opacity-100'}`}
    >
      {/* Timeline stem */}
      <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-800" />

      {/* Dot */}
      <div
        className={`absolute left-0 top-1 w-7 h-7 rounded-xl flex items-center justify-center text-sm border ${
          event.isAdjusted
            ? 'bg-brand-500/20 border-brand-500/50 shadow-sm'
            : 'bg-slate-900 border-slate-800'
        }`}
      >
        {event.icon}
      </div>

      {/* Content */}
      <div
        className={`p-3.5 rounded-2xl border text-xs ${
          event.isAdjusted
            ? 'bg-brand-950/40 border-brand-500/40'
            : 'bg-slate-950 border-slate-800/70'
        }`}
      >
        {/* Time */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] text-slate-400">
            {event.startTime}
            {event.endTime ? ` → ${event.endTime}` : ''}
          </span>
          {event.isAdjusted ? (
            <span className="text-[10px] font-bold text-brand-300 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Updated by SafeBound
            </span>
          ) : (
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Confirmed
            </span>
          )}
        </div>

        <h4 className="font-extrabold text-white text-sm mb-0.5">{event.title}</h4>
        <p className="text-slate-400 text-[11px]">{event.subtitle}</p>

        {event.location && (
          <p className="text-slate-500 text-[10px] mt-1 font-mono">📍 {event.location}</p>
        )}

        {event.bookingRef && (
          <p className="text-slate-600 text-[10px] mt-0.5 font-mono">Ref: {event.bookingRef}</p>
        )}

        {event.isAdjusted && event.adjustedNote && (
          <p className="text-brand-300 text-[11px] mt-1.5 font-semibold italic">
            Note: {event.adjustedNote}
          </p>
        )}
      </div>
    </div>
  );
};

export const DayTimelineView: React.FC<DayTimelineViewProps> = ({ days }) => {
  return (
    <div className="space-y-6">
      {days.map((day) => (
        <div key={day.dayNumber} className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card">
          {/* Day Header */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-extrabold text-white">
                Day {day.dayNumber} — {day.date}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{day.label}</p>
            </div>
            <span className="font-mono text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded-lg">
              {day.events.length} events
            </span>
          </div>

          {/* Events */}
          <div className="space-y-0">
            {day.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
