import React from 'react';
import { Car, Zap, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface TransferDetailCardProps {
  pkg: TripResultPackage;
}

export const TransferDetailCard: React.FC<TransferDetailCardProps> = ({ pkg }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Car className="w-5 h-5 text-sky-600" />
            <span>🚕 Private Chauffeur & Transfers</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Dedicated hill sedan assigned for all arrival pickups, drops and day excursions.
          </p>
        </div>

        <span className="text-xs font-bold text-sky-800 bg-sky-50 px-3 py-1 rounded-xl border border-sky-200">
          Dedicated Chauffeur Cab
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Route Details */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <span className="font-extrabold text-slate-900 block">Covered Routes:</span>
          <ul className="space-y-1.5 text-slate-600">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Dehradun Station ➔ Mussoorie Hotel (Sep 15)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Full-Day Sightseeing: Kempty Falls & Landour (Sep 16)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Gun Hill Cable Car Base Transfer (Sep 17)</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Mussoorie Hotel ➔ Dehradun Station Return (Sep 18)</span>
            </li>
          </ul>
        </div>

        {/* Adaptive Sync Callout */}
        <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/80 space-y-2 text-slate-700">
          <div className="flex items-center gap-2 text-brand-700 font-extrabold">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Autonomous Arrival Synchronization</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            SafeBound's monitoring agent watches your Vande Bharat train live. If your train is delayed by even 15 minutes, your chauffeur pickup timing automatically adapts so your driver is never late or missing.
          </p>
        </div>

      </div>

    </div>
  );
};
