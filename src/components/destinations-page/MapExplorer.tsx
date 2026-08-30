import React, { useState } from 'react';
import { MapPin, Sparkles, ShieldCheck, Sun, ArrowRight, X } from 'lucide-react';
import { DestinationItem } from '../../data/destinationsData';

interface MapExplorerProps {
  destinations: DestinationItem[];
  onSelectDestination: (dest: DestinationItem) => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const [activePin, setActivePin] = useState<DestinationItem | null>(destinations[0]);

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-extrabold uppercase tracking-wider mb-1">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>Geographic Discovery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore destinations on the map
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Click on interactive destination pins across India to inspect real-time regional suitability.
          </p>
        </div>

        <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1 rounded-xl">
          {destinations.length} Interactive Nodes
        </span>
      </div>

      {/* Map Graphic Container */}
      <div className="relative h-96 sm:h-[450px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        {/* Abstract India Geographic Contour Graphic */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-brand-400 fill-brand-600/10"
        >
          <path d="M30 10 Q40 5 45 15 T55 25 T80 35 T85 45 T75 55 T60 70 T40 90 T35 75 T25 50 T28 25 Z" />
        </svg>

        {/* Interactive Destination Pins on Coordinates */}
        {destinations.map((dest) => {
          const isSelected = activePin?.id === dest.id;

          return (
            <button
              key={dest.id}
              type="button"
              onClick={() => setActivePin(dest)}
              style={{ top: `${dest.mapCoords.y}%`, left: `${dest.mapCoords.x}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-20 group ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-110'
              }`}
            >
              <div className="relative">
                {/* Pin Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 ${
                    isSelected
                      ? 'bg-brand-600 border-white text-white ring-4 ring-brand-500/50 animate-bounce'
                      : 'bg-white border-brand-600 text-brand-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                </div>

                {/* Pin Label */}
                <span className="absolute left-1/2 -translate-x-1/2 top-8 px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-bold whitespace-nowrap shadow-md pointer-events-none">
                  {dest.name}
                </span>
              </div>
            </button>
          );
        })}

        {/* Active Pin Preview Float Card */}
        {activePin && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-2xl z-40 animate-fadeIn space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-base font-extrabold text-slate-900">{activePin.name}</h4>
                  <span className="text-[10px] font-bold text-brand-700 bg-brand-50 px-1.5 py-0.2 rounded">
                    {activePin.matchScore}% Match
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{activePin.state} • {activePin.tagline}</p>
              </div>

              <button
                type="button"
                onClick={() => setActivePin(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-50 p-2 rounded-xl">
              <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-500" /> {activePin.weather.temp}</span>
              <span className="flex items-center gap-1 text-emerald-700"><ShieldCheck className="w-3 h-3 text-emerald-600" /> Safety {activePin.safetyScore}/10</span>
            </div>

            <button
              type="button"
              onClick={() => onSelectDestination(activePin)}
              className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1"
            >
              <span>Explore Destination Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
