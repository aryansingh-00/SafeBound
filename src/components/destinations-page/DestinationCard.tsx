import React from 'react';
import { ShieldCheck, Sun, Calendar, Wallet, ArrowRight, Sparkles, Compass } from 'lucide-react';
import { DestinationItem } from '../../data/destinationsData';

interface DestinationCardProps {
  destination: DestinationItem;
  onExplore: (dest: DestinationItem) => void;
  onPlanTrip: (dest: DestinationItem) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onExplore,
  onPlanTrip,
}) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Destination Image with Live Badges */}
        <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-900">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent"></div>

          {/* SafeBound Match Score Badge */}
          <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-600/95 backdrop-blur-md text-white text-xs font-extrabold shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{destination.matchScore}% Match</span>
          </div>

          {/* Safety Score Badge */}
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-sm flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Safety {destination.safetyScore}/10</span>
          </div>

          {/* Bottom Title & State Overlay */}
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

        {/* Intelligence Indicators Bar */}
        <div className="p-5 space-y-3.5">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-semibold">Best Time</span>
                <span className="font-bold text-slate-800 truncate">{destination.bestSeason}</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-400 block font-semibold">Weather</span>
                <span className="font-bold text-slate-800 truncate">{destination.weather.temp}</span>
              </div>
            </div>
          </div>

          {/* Categories Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {destination.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-[11px] font-semibold bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-lg"
              >
                {cat}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-5 pt-0">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Typical Trip</span>
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              ₹{destination.typicalBudget.min.toLocaleString('en-IN')}–₹{destination.typicalBudget.max.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onExplore(destination)}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-brand-600 bg-white hover:bg-brand-50 border border-slate-200 rounded-xl transition"
            >
              Intelligence
            </button>

            <button
              type="button"
              onClick={() => onPlanTrip(destination)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs transition flex items-center gap-1"
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
