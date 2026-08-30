import React from 'react';
import { Train, Building, Car, Compass, Utensils, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GeneratedTripPlan } from '../../types';

interface IncludedServicesListProps {
  plan: GeneratedTripPlan;
}

export const IncludedServicesList: React.FC<IncludedServicesListProps> = ({ plan }) => {
  const services = [
    {
      icon: Train,
      name: 'Transport (To & Return)',
      title: plan.breakdown.flights.title || 'AC Volvo Deluxe Return Coach',
      desc: 'Delhi ➔ Dehradun reserved window semi-sleeper coach with mountain route assistance.',
      quantity: `${plan.travellers} Return Seats`,
      status: 'Live Inventory Verified',
    },
    {
      icon: Building,
      name: 'Hotel Accommodation',
      title: plan.breakdown.hotel.title || '4★ Cedar View Heritage Retreat',
      desc: 'Premium Balcony Valley View Suite with high-speed Wi-Fi and 24/7 hot water.',
      quantity: '4 Nights / 1 Room',
      status: 'Instant Room Lock',
    },
    {
      icon: Car,
      name: 'Local Sightseeing & Transfers',
      title: plan.breakdown.transfers.title || 'Dedicated Local Chauffeur Sedan',
      desc: 'Dehradun station pickup, return drop, and full local sightseeing for all 4 days.',
      quantity: '1 Private Sedan',
      status: 'Adaptive Rescheduling Active',
    },
    {
      icon: Compass,
      name: 'Curated Experiences & Passes',
      title: plan.breakdown.activities.title || '4 Curated Passes & Ropeway Cable Car',
      desc: 'VIP fast-track Gun Hill cable car pass and Kempty nature trail guided walk.',
      quantity: `${plan.travellers} Activity Bundles`,
      status: 'Passes Confirmed',
    },
    {
      icon: Utensils,
      name: 'Meals Included',
      title: 'Daily Mountain View Buffet Breakfast',
      desc: 'Fresh continental and North Indian breakfast buffet served daily at Cedar restaurant.',
      quantity: 'Daily Included',
      status: 'Included in Stay',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">
            Included Services Breakdown
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            All services are pre-booked and guaranteed under SafeBound single escrow protection.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
          5 Verified Services
        </span>
      </div>

      <div className="space-y-3">
        {services.map((s, idx) => {
          const Icon = s.icon;

          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 hover:border-brand-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-brand-100/80 text-brand-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {s.name}
                    </span>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.2 rounded">
                      {s.status}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">{s.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{s.desc}</p>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Quantity</span>
                <span className="text-xs font-extrabold text-slate-900">{s.quantity}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
