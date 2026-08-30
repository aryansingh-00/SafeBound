import React, { useState } from 'react';
import { Zap, Sparkles, ShieldCheck, ArrowRight, Check, X, CreditCard } from 'lucide-react';
import { Deal, GeneratedTripPlan } from '../../types';
import { LIVE_DEALS } from '../../data/deals';
import { DealCard } from './DealCard';

interface LiveDealsProps {
  onBookDeal: (deal: Deal) => void;
}

export const LiveDeals: React.FC<LiveDealsProps> = ({ onBookDeal }) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  return (
    <section id="deals" className="py-14 sm:py-20 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Real-Time Travel Commerce Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Live deals picked by SafeBound
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 font-medium max-w-xl">
              SafeBound continuously scans airline GDS, boutique resorts, and verified cab partners to curate all-inclusive packages at wholesale pricing.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Live re-pricing active</span>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LIVE_DEALS.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onViewDeal={(d) => setSelectedDeal(d)}
            />
          ))}
        </div>

      </div>

      {/* Deal Detail & Checkout Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="relative h-56 bg-slate-900 overflow-hidden shrink-0">
              <img
                src={selectedDeal.imageUrl}
                alt={selectedDeal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <button
                onClick={() => setSelectedDeal(null)}
                className="absolute top-4 right-4 p-2 text-white bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                    {selectedDeal.discountPercentage}% OFF
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">
                    {selectedDeal.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{selectedDeal.title}</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Package Inclusions (All in One Payment)
                </h4>
                <div className="space-y-2">
                  {selectedDeal.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-700 p-2 rounded-xl bg-slate-50 border border-slate-200/70">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Included Activities & Passes ({selectedDeal.activitiesCount})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDeal.activitiesList.map((act, i) => (
                    <div key={i} className="text-xs font-medium text-slate-700 p-2.5 rounded-xl bg-brand-50/70 border border-brand-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 line-through">
                    ₹{selectedDeal.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    ₹{selectedDeal.currentPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-600 font-bold block">
                  ✓ Instant Razorpay Confirmation Guaranteed
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const deal = selectedDeal;
                  setSelectedDeal(null);
                  onBookDeal(deal);
                }}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm rounded-xl shadow-md shadow-brand-600/30 flex items-center gap-2"
              >
                <span>Book This Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
