import React from 'react';
import { X, ShieldCheck, Sun, Calendar, Sparkles, MapPin, Check, ArrowRight } from 'lucide-react';
import { Destination } from '../../types';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanTrip: (destination: Destination) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onPlanTrip
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 shrink-0">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-600 text-white">
                SafeBound Certified
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Safety {destination.safetyScore}/10
              </span>
            </div>
            <h2 className="text-3xl font-extrabold">{destination.name}</h2>
            <p className="text-sm text-slate-200 font-medium">{destination.state} • {destination.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {destination.description}
          </p>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Best Travel Season</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-4 h-4 text-brand-600" />
                {destination.bestSeason}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Current Weather</span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Sun className="w-4 h-4 text-amber-500" />
                {destination.weather.temp} ({destination.weather.condition})
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              SafeBound Curated Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-50/60 border border-brand-100 text-xs font-semibold text-slate-800">
                  <Check className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Starting Price</span>
            <span className="text-xl font-extrabold text-slate-900">
              ₹{destination.startingPrice.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-400">/person</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onPlanTrip(destination);
            }}
            className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center gap-2"
          >
            <span>Plan AI Trip to {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
