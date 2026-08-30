import React from 'react';
import { Building, Star, CheckCircle2, MapPin, Coffee, ShieldCheck, Wifi, Shield } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface HotelDetailCardProps {
  pkg: TripResultPackage;
}

export const HotelDetailCard: React.FC<HotelDetailCardProps> = ({ pkg }) => {
  const hotelAmenities = [
    'Private Balcony Valley View',
    'Daily Mountain Buffet Breakfast',
    'Free High-Speed Wi-Fi',
    'Heated Room Amenities',
    'Free Cancellation up to 48h before arrival',
    '24/7 Front Desk & Concierge',
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="w-5 h-5 text-purple-600" />
            <span>🏨 Accommodation Details</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Verified luxury stay reserved with breakfast and valley panoramas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-extrabold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{pkg.hotel.rating} / 5.0 (420+ Reviews)</span>
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 font-bold text-xs">
            {pkg.hotel.stars} Luxury
          </span>
        </div>
      </div>

      {/* Hotel Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        <div className="md:col-span-5 h-48 sm:h-56 rounded-2xl overflow-hidden shadow-xs relative">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
            alt={pkg.hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2.5 left-2.5">
            <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white">
              Balcony Valley Suite
            </span>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div>
            <h4 className="text-lg font-extrabold text-slate-900">{pkg.hotel.name}</h4>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Camel's Back Road, Mussoorie • 800m from Mall Road</span>
            </p>
          </div>

          {/* Check-in / Check-out Strip */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Check-In</span>
              <span className="font-extrabold text-slate-900">Sep 15, 2026 • 02:00 PM</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Check-Out</span>
              <span className="font-extrabold text-slate-900">Sep 18, 2026 • 11:00 AM</span>
            </div>
          </div>

          {/* Key Amenities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {hotelAmenities.map((am, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{am}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
