import React from 'react';
import { Calendar, Clock, MapPin, Train, Building, Car, Compass, ArrowDown } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface DetailItineraryTimelineProps {
  pkg: TripResultPackage;
}

export const DetailItineraryTimeline: React.FC<DetailItineraryTimelineProps> = ({ pkg }) => {
  const days = [
    {
      dayNum: 1,
      title: 'Arrival & Mountain Ascent',
      date: 'Sep 15, 2026',
      events: [
        {
          time: '08:20 AM',
          title: 'Vande Bharat Express (Train #22457)',
          type: 'Transport',
          icon: Train,
          badge: 'Confirmed Seat',
          details: 'New Delhi Railway Station (NDLS) ➔ Dehradun (DDN) • AC Chair Car with complimentary breakfast onboard.',
        },
        {
          time: '12:20 PM',
          title: 'Dedicated Hill Chauffeur Pickup',
          type: 'Transfer',
          icon: Car,
          badge: 'Adaptive Sync',
          details: 'Driver greets you at Dehradun Station exit gate with name placard. Scenic 1h 20m drive up the Deodar ridge to Mussoorie.',
        },
        {
          time: '02:00 PM',
          title: 'Check-in: Cedar View Heritage Retreat',
          type: 'Hotel',
          icon: Building,
          badge: '4★ Suite',
          details: 'Welcome herbal tea & check-in to Balcony Valley View Suite. Free evening to stroll on the tranquil Camel\'s Back Road.',
        },
      ],
    },
    {
      dayNum: 2,
      title: 'Pine Forest Trails & Kempty Cascades',
      date: 'Sep 16, 2026',
      events: [
        {
          time: '08:30 AM',
          title: 'Mountain Buffet Breakfast',
          type: 'Meal',
          icon: Building,
          badge: 'Included',
          details: 'Fresh buffet spread at the hotel\'s Glasshouse restaurant overlooking Doon Valley.',
        },
        {
          time: '10:00 AM',
          title: 'Guided Kempty Nature Trail & Falls',
          type: 'Activity',
          icon: Compass,
          badge: 'VIP Pass',
          details: '4-Hour private guided trek through pine woods followed by VIP entry to the upper cascades avoiding public queues.',
        },
        {
          time: '04:00 PM',
          title: 'Colonial Bakeries & Landour Walk',
          type: 'Leisure',
          icon: MapPin,
          badge: 'Sightseeing',
          details: 'Private cab takes you to Char Dukan, Sister\'s Bazaar and Prakash Bakery for famous peanut butter & apple crumble.',
        },
      ],
    },
    {
      dayNum: 3,
      title: 'Gun Hill Panorama & Cloud\'s End',
      date: 'Sep 17, 2026',
      events: [
        {
          time: '10:00 AM',
          title: 'Gun Hill VIP Cable Car Ropeway',
          type: 'Activity',
          icon: Compass,
          badge: 'Fast-Track Pass',
          details: 'Skip-the-line cable car ride up to Mussoorie\'s second highest peak with 360-degree views of the Bunderpunch snow range.',
        },
        {
          time: '02:30 PM',
          title: 'Cloud\'s End Forest Sanctuary Excursion',
          type: 'Transfer',
          icon: Car,
          badge: 'Chauffeur Run',
          details: 'Drive to the historical bungalow marking the geographical end of Mussoorie hill ridge, surrounded by oak wilderness.',
        },
      ],
    },
    {
      dayNum: 4,
      title: 'Leisurely Breakfast & Return Transit',
      date: 'Sep 18, 2026',
      events: [
        {
          time: '11:00 AM',
          title: 'Hotel Check-out',
          type: 'Hotel',
          icon: Building,
          badge: 'Express Checkout',
          details: 'Luggage stored securely by concierge during morning souvenir shopping on Mall Road.',
        },
        {
          time: '11:30 AM',
          title: 'Chauffeur Drop to Dehradun Station',
          type: 'Transfer',
          icon: Car,
          badge: 'Coordinated',
          details: 'Comfortable hill descent cab timed perfectly to reach station 45 minutes prior to train departure.',
        },
        {
          time: '02:00 PM',
          title: 'Return Vande Bharat Express (Train #22458)',
          type: 'Transport',
          icon: Train,
          badge: 'Return Coach',
          details: 'Dehradun (DDN) ➔ New Delhi (NDLS) arriving at 07:40 PM. Dinner served onboard.',
        },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600" />
            <span>Complete Day-by-Day Journey Timeline</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Every transport connection, check-in, private transfer, and experience pass synchronized end-to-end.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">
          4 Days / 3 Nights
        </span>
      </div>

      <div className="space-y-8">
        {days.map((day) => (
          <div key={day.dayNum} className="space-y-4">
            
            {/* Day Header */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-xl bg-brand-600 text-white font-extrabold text-xs shadow-xs">
                Day 0{day.dayNum}
              </span>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{day.title}</h4>
                <span className="text-[11px] font-mono text-slate-400">{day.date}</span>
              </div>
            </div>

            {/* Day Events Sequence */}
            <div className="ml-4 pl-4 border-l-2 border-slate-200/80 space-y-3 relative">
              {day.events.map((ev, idx) => {
                const Icon = ev.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition space-y-1 relative"
                  >
                    {/* Circle Bullet */}
                    <div className="absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full bg-white border-2 border-brand-600"></div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold text-slate-900 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{ev.time}</span>
                        </span>
                        <span className="font-extrabold text-xs text-slate-800">• {ev.title}</span>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-white border border-slate-200 text-brand-700">
                        {ev.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed pt-0.5">
                      {ev.details}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
