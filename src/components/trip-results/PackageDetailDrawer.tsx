import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Train, 
  Building, 
  Car, 
  Compass, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  CloudSun 
} from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface PackageDetailDrawerProps {
  pkg: TripResultPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToReview: (pkg: TripResultPackage) => void;
}

export const PackageDetailDrawer: React.FC<PackageDetailDrawerProps> = ({
  pkg,
  isOpen,
  onClose,
  onProceedToReview,
}) => {
  if (!isOpen || !pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header with Hero Image */}
        <div>
          <div className="relative h-64 overflow-hidden">
            <img
              src={pkg.imageUrl}
              alt={pkg.destination}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/30 to-transparent"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-600 text-white w-fit block">
                {pkg.matchScore}% SafeBound Match
              </span>
              <h2 className="text-2xl font-extrabold">{pkg.title}</h2>
              <p className="text-xs text-brand-200">{pkg.tagline}</p>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-6 space-y-6">
            
            {/* Price & Buffer Strip */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">All-Inclusive Total</span>
                <span className="text-2xl font-extrabold text-slate-900">
                  ₹{pkg.totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                  ₹{pkg.remainingBuffer.toLocaleString('en-IN')} Under Budget
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Single Razorpay Escrow</span>
              </div>
            </div>

            {/* Included Services Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Included Components
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-brand-700 font-bold">
                    <Train className="w-4 h-4 text-brand-600" />
                    <span>{pkg.transport.mode}</span>
                  </div>
                  <p className="text-slate-600">{pkg.transport.operator} ({pkg.transport.travelTime})</p>
                  <span className="font-extrabold text-slate-900 block">₹{pkg.transport.cost.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-purple-700 font-bold">
                    <Building className="w-4 h-4 text-purple-600" />
                    <span>{pkg.hotel.stars} {pkg.hotel.name}</span>
                  </div>
                  <p className="text-slate-600">{pkg.hotel.roomType} (Breakfast incl.)</p>
                  <span className="font-extrabold text-slate-900 block">₹{pkg.hotel.cost.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-sky-700 font-bold">
                    <Car className="w-4 h-4 text-sky-600" />
                    <span>{pkg.transfer.type}</span>
                  </div>
                  <p className="text-slate-600">{pkg.transfer.details}</p>
                  <span className="font-extrabold text-slate-900 block">₹{pkg.transfer.cost.toLocaleString('en-IN')}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>{pkg.activities.count} Passes Included</span>
                  </div>
                  <p className="text-slate-600">{pkg.activities.list.join(', ')}</p>
                  <span className="font-extrabold text-slate-900 block">₹{pkg.activities.cost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Day-by-Day Schedule */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Itinerary Overview
              </h4>

              <div className="space-y-2 text-xs">
                {pkg.itinerarySummary.map((item) => (
                  <div key={item.day} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      D{item.day}
                    </span>
                    <div>
                      <h5 className="font-bold text-slate-900">{item.title}</h5>
                      <p className="text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Checkout CTA */}
        <div className="p-5 border-t border-slate-200 bg-white sticky bottom-0 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Amount</span>
            <span className="text-2xl font-extrabold text-slate-900">
              ₹{pkg.totalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onProceedToReview(pkg)}
            className="px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <span>Review & Book Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
