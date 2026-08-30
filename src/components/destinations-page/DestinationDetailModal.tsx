import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Sun, 
  Calendar, 
  Wallet, 
  Train, 
  Hotel, 
  Users, 
  Sparkles, 
  Check, 
  ArrowRight,
  Info
} from 'lucide-react';
import { DestinationItem } from '../../data/destinationsData';

interface DestinationDetailModalProps {
  destination: DestinationItem | null;
  onClose: () => void;
  onPlanTrip: (dest: DestinationItem) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onPlanTrip,
}) => {
  if (!destination) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-3xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Photography */}
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
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-600 text-white shadow-sm">
                {destination.matchScore}% Match
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md text-white flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Safety {destination.safetyScore}/10
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">{destination.name}</h2>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">{destination.state} • {destination.tagline}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Overview */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {destination.description}
          </p>

          {/* SafeBound Destination Intelligence Score Breakdown (From Prompt #11) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-50 via-purple-50 to-indigo-50/50 border border-brand-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>SafeBound Score — {destination.scores.overall}/100</span>
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  AI-generated suitability score based on live travel telemetry and visitor feedback.
                </p>
              </div>

              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-brand-600 text-white shadow-xs">
                Grade A+
              </span>
            </div>

            {/* Score Bar Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Budget Fit</span>
                  <span className="font-bold text-slate-900">{destination.scores.budgetFit}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${destination.scores.budgetFit}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Weather Suitability</span>
                  <span className="font-bold text-slate-900">{destination.scores.weatherFit}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${destination.scores.weatherFit}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Safety Index</span>
                  <span className="font-bold text-slate-900">{destination.scores.safety}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${destination.scores.safety}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-600">Transit Connectivity</span>
                  <span className="font-bold text-slate-900">{destination.scores.connectivity}/100</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${destination.scores.connectivity}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              SafeBound Curated Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Typical Trip Range</span>
            <span className="text-lg font-extrabold text-slate-900">
              ₹{destination.typicalBudget.min.toLocaleString('en-IN')}–₹{destination.typicalBudget.max.toLocaleString('en-IN')}
              <span className="text-xs text-slate-400 font-normal"> / package</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onPlanTrip(destination);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-2"
          >
            <span>Plan AI Trip to {destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
