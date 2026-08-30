import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Sun, 
  Plane, 
  Building, 
  Car, 
  Compass, 
  Check, 
  ArrowRight, 
  RotateCcw,
  Calendar,
  Wallet,
  Users
} from 'lucide-react';
import { CandidateDestination } from './DestinationCandidates';
import { OptimizationPanel } from './OptimizationPanel';
import { GeneratedTripPlan } from '../../types';

interface PackageResultViewProps {
  destination: CandidateDestination;
  userBudget: number;
  durationDays: number;
  travellers: number;
  onProceedToCheckout: (plan: GeneratedTripPlan) => void;
  onReset: () => void;
}

export const PackageResultView: React.FC<PackageResultViewProps> = ({
  destination,
  userBudget,
  durationDays,
  travellers,
  onProceedToCheckout,
  onReset,
}) => {
  const [isOptimized, setIsOptimized] = useState(false);

  const basePrice = destination.estimatedTotal;
  const savings = 1450;
  const currentTotal = isOptimized ? basePrice - savings : basePrice;

  // Breakdown costs
  const transportCost = Math.round(basePrice * 0.25);
  const hotelCost = Math.round(basePrice * 0.52) - (isOptimized ? 850 : 0);
  const transferCost = Math.round(basePrice * 0.08) - (isOptimized ? 600 : 0);
  const activityCost = Math.round(basePrice * 0.15);

  const generatedTripPlan: GeneratedTripPlan = {
    id: `SB-PKG-${destination.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    title: `${durationDays}-Day ${destination.name} Curated AI Package`,
    destination: `${destination.name}, ${destination.state}`,
    duration: `${durationDays} Days / ${durationDays - 1} Nights`,
    startingCity: 'New Delhi (DEL)',
    travellers,
    totalBudget: userBudget,
    estimatedCost: currentTotal,
    safetyScore: destination.safetyScore,
    weatherForecast: destination.weather,
    breakdown: {
      flights: {
        title: 'Non-stop AC Volvo Luxe Coach / Train Express',
        cost: transportCost,
        details: 'Confirmed reserved seats with mountain route escort',
      },
      hotel: {
        title: `${destination.name} Cedar View Heritage Retreat (4★)`,
        cost: hotelCost,
        rating: 4.8,
        details: 'Balcony mountain suite with complimentary breakfast',
      },
      transfers: {
        title: 'Private Chauffeur Sedan for Full Duration',
        cost: transferCost,
        details: 'Local sightseeing, viewpoints, and valley transit',
      },
      activities: {
        title: '4 Curated Adventure & Cultural Passes',
        cost: activityCost,
        details: 'Ropeway tickets, guided heritage nature walk, and hot sulfur springs entry',
      },
      taxes: {
        title: 'GST, SafeBound Guarantee & 24/7 Concierge',
        cost: 0,
        details: 'Zero hidden booking fees',
      },
    },
    days: [
      {
        day: 1,
        title: `Arrival in ${destination.name} & Pine Mist Trail`,
        highlights: ['Private chauffeur pickup', 'Check-in at Cedar Retreat', 'Mall Road & colonial walk'],
        hotel: `${destination.name} Cedar View Heritage Retreat`,
        activities: [
          { time: '11:00 AM', title: 'Mountain Check-in', desc: 'Welcome tea and cedar mountain vista suite orientation.' },
          { time: '04:00 PM', title: 'Sunset Viewpoint', desc: 'Scenic cable car ride to high panoramic ridge.' }
        ]
      },
      {
        day: 2,
        title: 'Cascading Waterfalls & Alpine Hikes',
        highlights: ['Kempty / Jogini cascades', 'Forest canopy walk', 'Organic cafe dining'],
        hotel: `${destination.name} Cedar View Heritage Retreat`,
        activities: [
          { time: '09:30 AM', title: 'Waterfall Trail', desc: 'Guided nature stroll to scenic multi-tier mountain fall.' },
          { time: '02:00 PM', title: 'Artisanal Himalayan Lunch', desc: 'Local delicacies with valley views.' }
        ]
      },
      {
        day: 3,
        title: 'Heritage Monasteries & Local Handicrafts',
        highlights: ['Historic colonial library', 'Tibetan market shopping', 'Evening starlight bonfire'],
        hotel: `${destination.name} Cedar View Heritage Retreat`,
        activities: [
          { time: '10:30 AM', title: 'Cultural Tour', desc: 'Explore historic buildings and handicraft weavers.' },
          { time: '08:00 PM', title: 'Private Bonfire & Stargazing', desc: 'Cozy bonfire with acoustic mountain music.' }
        ]
      },
      {
        day: 4,
        title: 'Morning Pine Stroll & Coordinated Departure',
        highlights: ['Souvenir collection', 'Assisted checkout', 'Smooth transit return'],
        hotel: 'Check-out completed',
        activities: [
          { time: '10:00 AM', title: 'Organic Market Visit', desc: 'Pick up local jams, honey and teas.' },
          { time: '02:00 PM', title: 'Return Transit', desc: 'Driver drops you safely to transit hub.' }
        ]
      }
    ],
    status: 'Recommended'
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-200/90 shadow-card space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Your Best Trip is Ready</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🏔️ {destination.name} — {durationDays} Days
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            SafeBound Match Score: <strong className="text-brand-600 font-bold">{destination.matchScore}%</strong> • {travellers} Travellers
          </p>
        </div>

        {/* Pricing Box */}
        <div className="bg-gradient-to-br from-brand-50 to-indigo-50/60 p-4 rounded-2xl border border-brand-200 text-right sm:text-right w-full sm:w-auto">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">All-in-One Total</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-brand-700">
            ₹{currentTotal.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center justify-end gap-1">
            <Check className="w-3.5 h-3.5" />
            Within ₹{userBudget.toLocaleString('en-IN')} budget
          </span>
        </div>
      </div>

      {/* Live Re-Optimization Engine Widget */}
      <OptimizationPanel
        currentTotal={basePrice}
        optimizedTotal={basePrice - savings}
        savings={savings}
        isOptimized={isOptimized}
        onApplyOptimization={() => setIsOptimized(true)}
      />

      {/* 4 Trust Verification Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Under ₹{userBudget.toLocaleString('en-IN')}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
          <span>Safety {destination.safetyScore}/10</span>
        </div>
        <div className="p-2.5 rounded-xl bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold flex items-center gap-1.5">
          <Sun className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{destination.weather.split(' ')[0]} Weather</span>
        </div>
        <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Live Availability</span>
        </div>
      </div>

      {/* Component Cost Breakdown Table */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Transparent Component Breakdown
        </h4>

        <div className="space-y-2.5">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                <Plane className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">🚆 Transport & Transit</span>
                <span className="text-[11px] text-slate-500">{generatedTripPlan.breakdown.flights.title}</span>
              </div>
            </div>
            <span className="text-xs font-extrabold text-slate-900">₹{transportCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">🏨 Hotel & Hospitality</span>
                <span className="text-[11px] text-slate-500">{generatedTripPlan.breakdown.hotel.title}</span>
              </div>
            </div>
            <span className="text-xs font-extrabold text-slate-900">₹{hotelCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">🚕 Local Transfers & Chauffeur</span>
                <span className="text-[11px] text-slate-500">{generatedTripPlan.breakdown.transfers.title}</span>
              </div>
            </div>
            <span className="text-xs font-extrabold text-slate-900">₹{transferCost.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">🎟️ Curated Experiences & Passes</span>
                <span className="text-[11px] text-slate-500">{generatedTripPlan.breakdown.activities.title}</span>
              </div>
            </div>
            <span className="text-xs font-extrabold text-slate-900">₹{activityCost.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>See other options / Adjust</span>
        </button>

        <button
          type="button"
          onClick={() => onProceedToCheckout(generatedTripPlan)}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-brand-600/30 flex items-center justify-center gap-2"
        >
          <span>Review & Book (₹{currentTotal.toLocaleString('en-IN')})</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
