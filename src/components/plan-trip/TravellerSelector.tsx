import React from 'react';
import { Users, User, Plus, Minus } from 'lucide-react';

interface TravellerSelectorProps {
  adults: number;
  childrenCount: number;
  infants: number;
  onAdultsChange: (count: number) => void;
  onChildrenChange: (count: number) => void;
  onInfantsChange: (count: number) => void;
}

export const TravellerSelector: React.FC<TravellerSelectorProps> = ({
  adults,
  childrenCount,
  infants,
  onAdultsChange,
  onChildrenChange,
  onInfantsChange,
}) => {
  const totalTravellers = adults + childrenCount + infants;

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
      
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-brand-600" />
          <span>Travellers</span>
        </label>

        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
          Total: {totalTravellers} {totalTravellers === 1 ? 'Person' : 'People'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        {/* Adults */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Adults</span>
            <span className="text-[10px] text-slate-400">12+ years</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={adults <= 1}
              onClick={() => onAdultsChange(Math.max(1, adults - 1))}
              className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-slate-900 w-4 text-center">{adults}</span>
            <button
              type="button"
              onClick={() => onAdultsChange(adults + 1)}
              className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Children */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Children</span>
            <span className="text-[10px] text-slate-400">2 - 11 years</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={childrenCount <= 0}
              onClick={() => onChildrenChange(Math.max(0, childrenCount - 1))}
              className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-slate-900 w-4 text-center">{childrenCount}</span>
            <button
              type="button"
              onClick={() => onChildrenChange(childrenCount + 1)}
              className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Infants */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Infants</span>
            <span className="text-[10px] text-slate-400">Under 2 years</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={infants <= 0}
              onClick={() => onInfantsChange(Math.max(0, infants - 1))}
              className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold text-slate-900 w-4 text-center">{infants}</span>
            <button
              type="button"
              onClick={() => onInfantsChange(infants + 1)}
              className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
