import React from 'react';
import { 
  Bot, 
  MapPin, 
  Calendar, 
  Users, 
  Wallet, 
  ShieldCheck, 
  CloudSun, 
  Plane, 
  Building,
  Lock,
  Sparkles,
  Check
} from 'lucide-react';

interface RequirementSummaryProps {
  origin: string;
  destination: string;
  isAnywhere: boolean;
  departureDate: string;
  durationDays: number;
  adults: number;
  childrenCount: number;
  budget: number;
  isHardLimit: boolean;
  selectedStyles: string[];
  safetyPriority: string;
  selectedWeather: string[];
  preferredMode: string;
  stayCategory: string;
}

export const RequirementSummary: React.FC<RequirementSummaryProps> = ({
  origin,
  destination,
  isAnywhere,
  departureDate,
  durationDays,
  adults,
  childrenCount,
  budget,
  isHardLimit,
  selectedStyles,
  safetyPriority,
  selectedWeather,
  preferredMode,
  stayCategory,
}) => {
  const totalPeople = adults + childrenCount;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-card space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">SafeBound Understood</h4>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Synced with Natural Language
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-700">
          AI Context
        </span>
      </div>

      {/* Extracted Parameters Grid */}
      <div className="space-y-2.5 text-xs">
        
        {/* Origin & Destination */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-600" />
            <span>Route</span>
          </span>
          <span className="font-bold text-slate-900 truncate max-w-[180px]">
            {origin} → {isAnywhere ? 'AI Recommended' : destination || 'Anywhere'}
          </span>
        </div>

        {/* Duration & Dates */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-brand-600" />
            <span>Dates & Duration</span>
          </span>
          <span className="font-bold text-slate-900">
            {departureDate || 'Flexible'} • {durationDays} Days
          </span>
        </div>

        {/* Travellers */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-600" />
            <span>Travellers</span>
          </span>
          <span className="font-bold text-slate-900">
            {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child` : ''}
          </span>
        </div>

        {/* Budget */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-brand-600" />
            <span>Total Budget</span>
          </span>
          <span className="font-extrabold text-brand-600">
            ₹{budget.toLocaleString('en-IN')} {isHardLimit ? '(Hard Limit)' : ''}
          </span>
        </div>

        {/* Vibe & Style */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Style & Vibe</span>
          </span>
          <span className="font-bold text-slate-900 truncate max-w-[160px]">
            {selectedStyles.length > 0 ? selectedStyles.join(', ') : 'Any'}
          </span>
        </div>

        {/* Safety & Weather */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-slate-500 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>Safety & Weather</span>
          </span>
          <span className="font-bold text-slate-900">
            {safetyPriority} Safety • {selectedWeather.join('/') || 'Pleasant'}
          </span>
        </div>

      </div>

      {/* Hard Constraints Card */}
      <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Active Hard Constraints</span>
          </span>
          <span className="text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded font-mono">
            3 Locked
          </span>
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between text-slate-200">
            <span>• Budget</span>
            <span className="font-bold text-emerald-400">≤ ₹{budget.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex items-center justify-between text-slate-200">
            <span>• Safety Priority</span>
            <span className="font-bold text-amber-300">= {safetyPriority}</span>
          </div>
          <div className="flex items-center justify-between text-slate-200">
            <span>• Trip Duration</span>
            <span className="font-bold text-sky-300">= {durationDays} Days</span>
          </div>
        </div>
      </div>

    </div>
  );
};
