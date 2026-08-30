import React, { useState } from 'react';
import { MapPin, Compass, Sparkles, Check, ArrowRight } from 'lucide-react';

interface LocationSelectorProps {
  origin: string;
  destination: string;
  isAnywhere: boolean;
  onOriginChange: (origin: string) => void;
  onDestinationChange: (dest: string) => void;
  onToggleAnywhere: (isAnywhere: boolean) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  origin,
  destination,
  isAnywhere,
  onOriginChange,
  onDestinationChange,
  onToggleAnywhere,
}) => {
  const commonOrigins = ['Delhi (DEL)', 'Mumbai (BOM)', 'Bengaluru (BLR)', 'Hyderabad (HYD)', 'Kolkata (CCU)', 'Pune (PNQ)'];
  const popularDestinations = ['Mussoorie', 'Manali', 'Dharamshala', 'Goa', 'Kashmir', 'Jaipur', 'Kerala', 'Rishikesh'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      {/* Starting From */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-600" />
          <span>Starting From (Origin)</span>
        </label>
        
        <input
          type="text"
          value={origin}
          onChange={(e) => onOriginChange(e.target.value)}
          placeholder="e.g. Delhi, Mumbai, Bengaluru..."
          className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:bg-white"
        />

        {/* Quick Origin Suggestions */}
        <div className="flex flex-wrap gap-1 pt-1">
          {commonOrigins.slice(0, 4).map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => onOriginChange(city)}
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg transition ${
                origin === city
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {city.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Selector */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-600" />
            <span>Where do you want to go?</span>
          </label>
          
          <button
            type="button"
            onClick={() => onToggleAnywhere(!isAnywhere)}
            className={`text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 transition ${
              isAnywhere
                ? 'bg-brand-100 text-brand-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-brand-600" />
            <span>Anywhere (AI Pick)</span>
          </button>
        </div>

        {isAnywhere ? (
          <div className="p-3 rounded-xl bg-brand-50/70 border border-brand-200/80 text-xs text-brand-800 font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
              <span>SafeBound will discover and rank the best destinations for you.</span>
            </div>
            <button
              type="button"
              onClick={() => onToggleAnywhere(false)}
              className="text-[11px] text-brand-700 underline shrink-0 ml-2"
            >
              Pick specific
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              placeholder="e.g. Mussoorie, Manali, Goa..."
              className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand-500 focus:bg-white"
            />

            {/* Quick Destination Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              {popularDestinations.slice(0, 4).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => onDestinationChange(d)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg transition ${
                    destination === d
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
};
