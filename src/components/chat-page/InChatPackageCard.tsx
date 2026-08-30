import React from 'react';
import { 
  Sparkles, 
  Check, 
  Plane, 
  Building, 
  Car, 
  Compass, 
  ArrowRight, 
  Zap, 
  SlidersHorizontal,
  ShieldCheck 
} from 'lucide-react';

interface InChatPackageCardProps {
  onReviewPackage: () => void;
  onFindBetterDeal: () => void;
  onCompareAlternatives: () => void;
  isOptimized?: boolean;
}

export const InChatPackageCard: React.FC<InChatPackageCardProps> = ({
  onReviewPackage,
  onFindBetterDeal,
  onCompareAlternatives,
  isOptimized = false,
}) => {
  const currentTotal = isOptimized ? 29850 : 31300;

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl p-5 border-2 border-brand-300 shadow-md space-y-4 my-2 animate-fadeIn">
      
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-600 text-white">
              ⚡ LIVE AI PACKAGE
            </span>
            <span className="text-xs font-bold text-brand-700">92% Match</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            🏔️ Mussoorie — 4 Days Package
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Delhi ➔ Mussoorie • 2 Travellers • 15–19 Sep 2026
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Package</span>
          <div className="text-xl sm:text-2xl font-extrabold text-brand-700">
            ₹{currentTotal.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block">
            ✓ ₹{40000 - currentTotal} under budget
          </span>
        </div>
      </div>

      {/* Itemized Breakdown Table */}
      <div className="space-y-1.5 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
          <span className="text-slate-600 font-medium flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-sky-500" />
            <span>🚆 Transport (AC Volvo Deluxe Return)</span>
          </span>
          <span className="font-bold text-slate-900">₹7,800</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
          <span className="text-slate-600 font-medium flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-purple-500" />
            <span>🏨 Hotel (4★ Cedar View Retreat + Breakfast)</span>
          </span>
          <span className="font-bold text-slate-900">₹{isOptimized ? '15,650' : '16,500'}</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
          <span className="text-slate-600 font-medium flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-emerald-500" />
            <span>🚕 Local Chauffeur Sightseeing</span>
          </span>
          <span className="font-bold text-slate-900">₹{isOptimized ? '1,900' : '2,500'}</span>
        </div>

        <div className="flex items-center justify-between py-1">
          <span className="text-slate-600 font-medium flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>🎟️ 4 Activities & Ropeway Passes</span>
          </span>
          <span className="font-bold text-slate-900">₹4,500</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-slate-700">
        <span className="flex items-center gap-1 text-emerald-700"><Check className="w-3.5 h-3.5 text-emerald-600" /> Within ₹40,000 limit</span>
        <span className="flex items-center gap-1 text-emerald-700"><Check className="w-3.5 h-3.5 text-emerald-600" /> Live seats checked</span>
        <span className="flex items-center gap-1 text-emerald-700"><Check className="w-3.5 h-3.5 text-emerald-600" /> 18°C Weather match</span>
        <span className="flex items-center gap-1 text-emerald-700"><Check className="w-3.5 h-3.5 text-emerald-600" /> 9.3 Safety Index</span>
      </div>

      {/* Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
        <button
          type="button"
          onClick={onReviewPackage}
          className="w-full sm:flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-1.5 transition"
        >
          <span>Review Package</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {!isOptimized && (
          <button
            type="button"
            onClick={onFindBetterDeal}
            className="w-full sm:w-auto px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded-xl border border-amber-300 flex items-center justify-center gap-1 transition"
          >
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>Find Better Deal</span>
          </button>
        )}

        <button
          type="button"
          onClick={onCompareAlternatives}
          className="w-full sm:w-auto px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
        >
          Compare
        </button>
      </div>

    </div>
  );
};
