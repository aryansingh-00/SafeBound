import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Train, 
  Building, 
  Car, 
  Compass, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Heart,
  ShieldCheck,
  CloudSun
} from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface PackageCardItemProps {
  pkg: TripResultPackage;
  onViewPackage: (pkg: TripResultPackage) => void;
  onToggleCompare: (pkg: TripResultPackage) => void;
  isComparing: boolean;
  onSavePackage: (pkg: TripResultPackage) => void;
  isSaved?: boolean;
}

export const PackageCardItem: React.FC<PackageCardItemProps> = ({
  pkg,
  onViewPackage,
  onToggleCompare,
  isComparing,
  onSavePackage,
  isSaved = false,
}) => {
  const [whyExpanded, setWhyExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-brand-400 shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      
      <div>
        {/* Destination Image & Overlay Tags */}
        <div className="relative h-52 sm:h-60 overflow-hidden">
          <img
            src={pkg.imageUrl}
            alt={pkg.destination}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30"></div>

          {/* Top Overlays */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-600 text-white shadow-md flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{pkg.matchScore}% Match</span>
            </span>

            <button
              type="button"
              onClick={() => onSavePackage(pkg)}
              className={`p-2 rounded-full backdrop-blur-md transition ${
                isSaved
                  ? 'bg-rose-500 text-white'
                  : 'bg-black/40 text-white hover:bg-rose-500'
              }`}
              title="Save package to profile"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Bottom Destination Title */}
          <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-200 block">
              {pkg.duration} • {pkg.state}
            </span>
            <h3 className="text-xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {pkg.title}
            </h3>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-4">
          
          {/* Price & Budget Indicator */}
          <div className="flex items-end justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">All-Inclusive Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  ₹{pkg.totalPrice.toLocaleString('en-IN')}
                </span>
                {pkg.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{pkg.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              ₹{pkg.remainingBuffer.toLocaleString('en-IN')} Under Budget
            </span>
          </div>

          {/* Itemized 4-Pillar Breakdown */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><Train className="w-3.5 h-3.5 text-brand-600" /> {pkg.transport.mode}</span>
              <span className="font-bold text-slate-800">₹{pkg.transport.cost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5 text-purple-600" /> {pkg.hotel.stars} {pkg.hotel.name}</span>
              <span className="font-bold text-slate-800">₹{pkg.hotel.cost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-sky-600" /> {pkg.transfer.type}</span>
              <span className="font-bold text-slate-800">₹{pkg.transfer.cost.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-amber-600" /> {pkg.activities.count} Passes Included</span>
              <span className="font-bold text-slate-800">₹{pkg.activities.cost.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Live Telemetry Pills */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-600">
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Availability Checked</span>
            </span>
            <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              <CloudSun className="w-3 h-3 text-amber-500" />
              <span>{pkg.weather.temp} {pkg.weather.condition}</span>
            </span>
            <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{pkg.safety.score}/10 Safety</span>
            </span>
          </div>

          {/* "Why SafeBound Recommends This" Expandable Factors */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setWhyExpanded(!whyExpanded)}
              className="w-full flex items-center justify-between text-xs font-bold text-brand-700 hover:text-brand-800 py-1"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>Why SafeBound recommends this</span>
              </span>
              {whyExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {whyExpanded && (
              <div className="space-y-1 pt-2 text-xs text-slate-600 animate-fadeIn">
                {pkg.whyRecommended.map((fact, idx) => (
                  <p key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </p>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 sm:p-6 pt-0 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onViewPackage(pkg)}
          className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-600/20 transition flex items-center justify-center gap-1.5"
        >
          <span>View Package</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onToggleCompare(pkg)}
          className={`px-3.5 py-3 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
            isComparing
              ? 'bg-purple-100 text-purple-900 border-purple-300 font-extrabold'
              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
          }`}
          title="Add to comparison table"
        >
          <Layers className="w-4 h-4" />
          <span>{isComparing ? 'Comparing' : 'Compare'}</span>
        </button>
      </div>

    </div>
  );
};
