import React, { useState } from 'react';
import { 
  Clock, 
  MapPin, 
  Train, 
  Building, 
  Car, 
  Compass, 
  Utensils, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ItineraryTimelineView: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number | 'all'>('all');

  const days = [
    {
      dayNumber: 1,
      dateTitle: 'Day 1 — Sep 15: Journey to the Hills & Arrival',
      tag: 'Transit & Check-in',
      events: [
        {
          time: '08:20 AM',
          type: 'transport',
          title: 'Delhi ➔ Dehradun Return AC Coach / Vande Bharat',
          desc: 'Departure from New Delhi (NDLS). Reserved executive window seats 14 & 15 with onboard breakfast.',
          ref: 'PNR: VB-894210',
          btnText: 'View Ticket',
          status: 'Confirmed',
          icon: Train,
        },
        {
          time: '12:20 PM',
          type: 'transfer',
          title: 'Dehradun Station ➔ Mussoorie Hotel Dedicated Chauffeur',
          desc: 'Private AC Dzire Sedan waiting at Station Exit Gate 2. Driver contact: Ramesh (+91 98765 11223).',
          ref: 'Ref: CAB-774921',
          btnText: 'View Chauffeur Pass',
          status: 'Confirmed',
          icon: Car,
        },
        {
          time: '02:00 PM',
          type: 'hotel',
          title: 'Hotel Check-in: 4★ Cedar View Heritage Retreat',
          desc: 'Balcony Valley View Suite pre-registered. Welcome Himalayan herbal tea served upon arrival.',
          ref: 'Ref: HTL-894102',
          btnText: 'View Hotel Voucher',
          status: 'Pre-Registered',
          icon: Building,
        },
      ],
    },
    {
      dayNumber: 2,
      dateTitle: 'Day 2 — Sep 16: Cascades & Heritage Exploration',
      tag: 'Sightseeing & Culture',
      events: [
        {
          time: '10:00 AM',
          type: 'activity',
          title: 'Kempty Falls Nature Walk & Guided Alpine Trail',
          desc: 'Chauffeur pickup from hotel lobby. Includes guided nature walk through cedar pine forests.',
          ref: 'Ref: ACT-338190',
          btnText: 'View Guide Details',
          status: 'Confirmed',
          icon: Compass,
        },
        {
          time: '01:30 PM',
          type: 'meal',
          title: 'Mountain Valley Lunch at Pine Bistro',
          desc: 'Authentic Garhwali thali & multi-cuisine buffet lunch with scenic cliffside seating.',
          ref: 'Status: Included in Stay',
          status: 'Included',
          icon: Utensils,
        },
        {
          time: '05:00 PM',
          type: 'activity',
          title: "Camel's Back Road Sunset Stroll",
          desc: '3 km peaceful scenic walk overlooking the Doon valley sunset. Ideal for photography.',
          status: 'Free Time',
          icon: Compass,
        },
      ],
    },
    {
      dayNumber: 3,
      dateTitle: 'Day 3 — Sep 17: High-Altitude Adventure & Mall Road',
      tag: 'Adventure & Panorama',
      events: [
        {
          time: '10:00 AM',
          type: 'activity',
          title: 'Gun Hill Ropeway Cable Car (VIP Fast-Track Pass)',
          desc: 'Skip-the-line cable car pass to second-highest peak in Mussoorie with 360° Himalayan view.',
          ref: 'Pass: ACT-8921-GH',
          btnText: 'View VIP Pass',
          status: 'VIP Fast-track',
          icon: Compass,
        },
        {
          time: '04:00 PM',
          type: 'activity',
          title: 'Mall Road Heritage Cafes & Bookstore Walk',
          desc: 'Explore vintage colonial architecture, Cambridge Book Depot, and local artisan bakeries.',
          status: 'Self-Paced',
          icon: MapPin,
        },
      ],
    },
    {
      dayNumber: 4,
      dateTitle: 'Day 4 — Sep 18: Leisure & Cloud End Valley',
      tag: 'Leisure & AI Suggestion',
      events: [
        {
          time: '10:30 AM',
          type: 'ai-tip',
          title: '✨ SafeBound AI Concierge Recommendation: Cloud End Forest Sanctuary',
          desc: 'The weather is forecasted clear with 22°C. SafeBound recommends an optional tranquil stroll through 2,000-acre deodar forests.',
          ref: 'Weather Optimal: 22°C Clear',
          status: 'AI Curated',
          icon: Sparkles,
        },
        {
          time: '02:00 PM',
          type: 'meal',
          title: 'Tibetan Delicacies & Tea at Happy Valley',
          desc: 'Experience steaming momos, thukpa, and butter tea near the historic Shedup Choepelling Temple.',
          status: 'Recommended',
          icon: Utensils,
        },
      ],
    },
    {
      dayNumber: 5,
      dateTitle: 'Day 5 — Sep 19: Check-out & Return Journey',
      tag: 'Return Transit',
      events: [
        {
          time: '11:00 AM',
          type: 'hotel',
          title: 'Hotel Check-out & Luggage Assistance',
          desc: 'Express check-out with luggage loaded into chauffeur sedan.',
          status: 'Scheduled',
          icon: Building,
        },
        {
          time: '11:30 AM',
          type: 'transfer',
          title: 'Mussoorie Resort ➔ Dehradun Station Return Transfer',
          desc: 'Scenic downhill drive with guaranteed arrival at Dehradun station by 01:15 PM.',
          ref: 'Ref: CAB-774921-RT',
          status: 'Confirmed',
          icon: Car,
        },
        {
          time: '02:00 PM',
          type: 'transport',
          title: 'Dehradun ➔ Delhi Return Coach / Train',
          desc: 'Return transit to Delhi with ETA at NDLS by 07:45 PM.',
          ref: 'PNR: VB-894210-RET',
          btnText: 'View Return Ticket',
          status: 'Confirmed',
          icon: Train,
        },
      ],
    },
  ];

  return (
    <section id="full-itinerary-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      {/* Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Complete Day-by-Day Itinerary
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Synchronized sequence of transport, hotel check-ins, chauffeur drops and passes.
          </p>
        </div>

        {/* Day Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setActiveDay('all')}
            className={`px-3 py-1 rounded-xl text-xs font-extrabold transition ${
              activeDay === 'all'
                ? 'bg-brand-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Days
          </button>
          {[1, 2, 3, 4, 5].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDay(d)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                activeDay === d
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Day {d}
            </button>
          ))}
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-8">
        {days
          .filter((d) => activeDay === 'all' || activeDay === d.dayNumber)
          .map((day) => (
            <div key={day.dayNumber} className="space-y-4">
              
              {/* Day Header Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-brand-50 via-slate-50 to-indigo-50/50 border border-brand-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                    {day.dayNumber}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                    {day.dateTitle}
                  </h4>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800">
                  {day.tag}
                </span>
              </div>

              {/* Day Events Vertical Sequence */}
              <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {day.events.map((ev, eIdx) => {
                  const Icon = ev.icon;
                  const isAITip = ev.type === 'ai-tip';

                  return (
                    <div key={eIdx} className="relative group">
                      
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-[27px] sm:-left-[31px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 bg-white shadow-2xs ${
                          isAITip
                            ? 'border-purple-500 text-purple-600'
                            : 'border-brand-600 text-brand-600'
                        }`}
                      >
                        <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>

                      {/* Event Content Card */}
                      <div
                        className={`p-4 rounded-2xl border transition ${
                          isAITip
                            ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-xs'
                            : 'bg-slate-50/90 hover:bg-slate-50 border-slate-200/80'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              <span>{ev.time}</span>
                            </span>
                            {ev.ref && (
                              <span className="text-[10px] font-mono font-bold text-slate-500 bg-white px-2 py-0.2 rounded border border-slate-200">
                                {ev.ref}
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 w-fit">
                            {ev.status}
                          </span>
                        </div>

                        <h5 className="text-xs sm:text-sm font-bold text-slate-900">{ev.title}</h5>
                        <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">{ev.desc}</p>

                        {ev.btnText && (
                          <div className="pt-2.5 mt-2 border-t border-slate-200/60 flex justify-end">
                            <button
                              type="button"
                              onClick={() => alert(`Opening digital pass for: ${ev.title}`)}
                              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 hover:underline"
                            >
                              <span>{ev.btnText}</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
      </div>

    </section>
  );
};
