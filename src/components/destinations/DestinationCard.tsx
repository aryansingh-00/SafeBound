import React from 'react';
import { ShieldCheck, Calendar, ArrowRight, Sparkles, Sun } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  onPlanTripForDestination: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  onPlanTripForDestination,
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card hover:shadow-xl hover:border-brand-300/80 transition-all duration-300 flex flex-col">
      
      {/* Destination Image with Badges */}
      <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div>

        {/* Safety Badge */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-100 shadow-sm flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
          <span>Safety {destination.safetyScore}/10</span>
        </div>

        {/* Live Weather Badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1">
          <Sun className="w-3 h-3 text-amber-300" />
          <span>{destination.weather.temp}</span>
        </div>

        {/* Bottom Image Overlay: Destination Name & State */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold tracking-tight">{destination.name}</h3>
            <span className="text-xs font-medium text-slate-200">{destination.state}</span>
          </div>
          <p className="text-xs text-slate-200 font-medium truncate mt-0.5">
            {destination.tagline}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Season & Tags */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Best Season: <strong className="text-slate-700">{destination.bestSeason}</strong></span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {destination.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Starting from</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900">
              ₹{destination.startingPrice.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-400">/person</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(destination)}
              className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-brand-600 bg-slate-50 hover:bg-brand-50 border border-slate-200 rounded-xl transition duration-150"
            >
              Details
            </button>

            <button
              type="button"
              onClick={() => onPlanTripForDestination(destination)}
              className="px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm shadow-brand-600/20 hover:shadow-md transition flex items-center gap-1.5"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
