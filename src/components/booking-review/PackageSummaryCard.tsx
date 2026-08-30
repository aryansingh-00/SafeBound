import React from 'react';
import { Calendar, Users, MapPin, Train, Car, Building, Sparkles } from 'lucide-react';
import { GeneratedTripPlan } from '../../types';

interface PackageSummaryCardProps {
  plan: GeneratedTripPlan;
}

export const PackageSummaryCard: React.FC<PackageSummaryCardProps> = ({ plan }) => {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-50 text-brand-700 border border-brand-200">
              ⚡ All-Inclusive AI Package
            </span>
            <span className="text-xs font-bold text-slate-500">Ref: #{plan.id}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            🏔️ {plan.title}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {plan.startingCity} ➔ {plan.destination}
          </p>
        </div>

        <div className="text-right sm:text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration & Travellers</span>
          <span className="text-sm font-extrabold text-slate-900">{plan.duration}</span>
          <span className="text-xs text-slate-500 font-semibold block">{plan.travellers} Travellers</span>
        </div>
      </div>

      {/* Visual Multi-Modal Route Stream */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Coordinated Route Schedule
        </span>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-bold">
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white text-[11px]">
              1
            </div>
            <div>
              <span className="text-slate-900 block">Delhi (DEL)</span>
              <span className="text-[10px] text-slate-400 font-normal">Departure Point</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-1 items-center justify-center px-3">
            <div className="w-full border-t-2 border-dashed border-slate-300 relative text-center">
              <span className="text-[10px] text-slate-500 font-medium px-2 bg-slate-50 -top-2 relative">
                🚆 AC Volvo / Vande Bharat
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-white text-[11px]">
              2
            </div>
            <div>
              <span className="text-slate-900 block">Dehradun Transit</span>
              <span className="text-[10px] text-slate-400 font-normal">Station Exit</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-1 items-center justify-center px-3">
            <div className="w-full border-t-2 border-dashed border-slate-300 relative text-center">
              <span className="text-[10px] text-slate-500 font-medium px-2 bg-slate-50 -top-2 relative">
                🚕 Dedicated Cab
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-600 flex items-center justify-center text-white text-[11px]">
              3
            </div>
            <div>
              <span className="text-slate-900 block">Mussoorie Resort</span>
              <span className="text-[10px] text-slate-400 font-normal">Cedar View Retreat</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
