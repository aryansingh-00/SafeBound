import React from 'react';
import { 
  X, 
  Plane, 
  Building, 
  Car, 
  Compass, 
  Utensils, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { DealItem } from '../../data/dealsData';

interface DealDetailModalProps {
  deal: DealItem | null;
  onClose: () => void;
  onBookPackage: (deal: DealItem) => void;
  onOptimize: (deal: DealItem) => void;
}

export const DealDetailModal: React.FC<DealDetailModalProps> = ({
  deal,
  onClose,
  onBookPackage,
  onOptimize,
}) => {
  if (!deal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Image Banner */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900 shrink-0">
          <img
            src={deal.imageUrl}
            alt={deal.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-rose-600 text-white">
                {deal.discountPercentage}% OFF
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-600/90 text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {deal.matchScore}% Match
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">{deal.title}</h2>
            <p className="text-xs text-slate-200">{deal.startingCity} ➔ {deal.destination} • {deal.duration}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Package Overview */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Package Overview & Inclusions
            </h4>

            <div className="space-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-2.5">
                <Plane className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Transport</span>
                  <span className="text-slate-600">{deal.inclusions.transport}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <Building className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Hotel Stay</span>
                  <span className="text-slate-600">{deal.inclusions.hotel} ({deal.inclusions.hotelRating})</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <Car className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Local Transfers</span>
                  <span className="text-slate-600">{deal.inclusions.transfers}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <Compass className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Activities & Passes</span>
                  <span className="text-slate-600">{deal.inclusions.activitiesList.join(' • ')}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/60">
                <Utensils className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Meals Included</span>
                  <span className="text-slate-600">{deal.inclusions.meals}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Price Breakdown */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Transparent Price Breakdown
            </h4>

            <div className="space-y-1.5 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Transport Allocation</span>
                <span className="font-bold text-slate-900">₹{deal.breakdown.transport.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Hotel Accommodation</span>
                <span className="font-bold text-slate-900">₹{deal.breakdown.hotel.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Dedicated Transfers</span>
                <span className="font-bold text-slate-900">₹{deal.breakdown.transfers.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">Activity Passes & Guide</span>
                <span className="font-bold text-slate-900">₹{deal.breakdown.activities.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-600">SafeBound Escrow & GST</span>
                <span className="font-bold text-emerald-600">INCLUDED (₹0 extra)</span>
              </div>
            </div>
          </div>

          {/* Provider & Cancellation Trust Bar */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Provider: <strong>{deal.provider.name}</strong></span>
            </div>
            <span className="font-bold">{deal.cancellationPolicy}</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Package Payable</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-brand-700">
                ₹{deal.currentPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{deal.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOptimize(deal);
              }}
              className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 transition"
            >
              Optimize with AI
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookPackage(deal);
              }}
              className="flex-1 sm:flex-none px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-2 transition"
            >
              <Lock className="w-4 h-4" />
              <span>Book This Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
