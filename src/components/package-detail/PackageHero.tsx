import React from 'react';
import { Sparkles, ArrowRight, Heart, Share2, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface PackageHeroProps {
  pkg: TripResultPackage;
  onProceedToReview: () => void;
  onSaveTrip: () => void;
  isSaved?: boolean;
  onShare: () => void;
}

export const PackageHero: React.FC<PackageHeroProps> = ({
  pkg,
  onProceedToReview,
  onSaveTrip,
  isSaved = false,
  onShare,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Large Visual Hero (6 cols) */}
        <div className="lg:col-span-6 relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-md">
          <img
            src={pkg.imageUrl}
            alt={pkg.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent"></div>

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-brand-600 text-white shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>SafeBound Match: {pkg.matchScore}%</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onSaveTrip}
                className={`p-2.5 rounded-full backdrop-blur-md transition ${
                  isSaved
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-black/40 text-white hover:bg-rose-500'
                }`}
                title="Save trip to profile"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onShare}
                className="p-2.5 rounded-full bg-black/40 text-white hover:bg-slate-900 backdrop-blur-md transition"
                title="Share package"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Overlay Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-200">
              Verified All-Inclusive Package
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {pkg.title}
            </h1>
          </div>
        </div>

        {/* Right: Package Title, Inclusions & Checkout CTA (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-brand-600">
              <MapPin className="w-4 h-4" />
              <span>Delhi → Dehradun → {pkg.destination}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              🏔️ {pkg.destination} Escape
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {pkg.duration} · Complete pre-synchronized multi-modal journey with 4★ luxury mountain stay, private chauffeur and curated activity passes.
            </p>
          </div>

          {/* 4 Supporting Fit Indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ Budget Fit (₹8.7K Buffer)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ Weather Fit (23°C Pleasant)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ High Safety Preference</span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center gap-2 text-emerald-900 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>✓ 5.5h Travel Convenience</span>
            </div>
          </div>

          {/* Price & Primary CTA */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">All-Inclusive Total</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900">
                  ₹{pkg.totalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                  Within ₹40K Budget
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Single checkout • Zero hidden booking surcharges
              </span>
            </div>

            <button
              type="button"
              onClick={onProceedToReview}
              className="px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shrink-0"
            >
              <span>Review & Book Trip</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
