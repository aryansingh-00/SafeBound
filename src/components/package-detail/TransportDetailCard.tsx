import React from 'react';
import { Train, Clock, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { TripResultPackage } from '../../data/tripResultsData';

interface TransportDetailCardProps {
  pkg: TripResultPackage;
}

export const TransportDetailCard: React.FC<TransportDetailCardProps> = ({ pkg }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Train className="w-5 h-5 text-brand-600" />
            <span>🚆 Transport & Transit Connections</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Pre-booked reserved seats with direct return transit and on-board catering.
          </p>
        </div>

        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>IRCTC Reserved Coach</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Outbound Journey */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-200">
              Outbound Journey • Sep 15
            </span>
            <span className="font-mono text-slate-500">Train #22457</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-base font-extrabold text-slate-900 block">08:20 AM</span>
              <span className="text-slate-500">New Delhi (NDLS)</span>
            </div>

            <div className="text-center px-3">
              <span className="text-[10px] text-slate-400 font-mono block">5h 40m Non-stop</span>
              <div className="w-20 h-0.5 bg-brand-400 relative my-1 mx-auto">
                <ArrowRight className="w-3 h-3 text-brand-600 absolute -right-1.5 -top-1.5" />
              </div>
              <span className="text-[10px] font-bold text-brand-600">AC Chair Car</span>
            </div>

            <div className="text-right">
              <span className="text-base font-extrabold text-slate-900 block">02:00 PM</span>
              <span className="text-slate-500">Dehradun (DDN)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Operator: Vande Bharat Express</span>
            <span className="font-bold text-emerald-700">Breakfast Included</span>
          </div>
        </div>

        {/* Return Journey */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
              Return Journey • Sep 18
            </span>
            <span className="font-mono text-slate-500">Train #22458</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-base font-extrabold text-slate-900 block">02:00 PM</span>
              <span className="text-slate-500">Dehradun (DDN)</span>
            </div>

            <div className="text-center px-3">
              <span className="text-[10px] text-slate-400 font-mono block">5h 40m Non-stop</span>
              <div className="w-20 h-0.5 bg-purple-400 relative my-1 mx-auto">
                <ArrowRight className="w-3 h-3 text-purple-600 absolute -right-1.5 -top-1.5" />
              </div>
              <span className="text-[10px] font-bold text-purple-600">AC Chair Car</span>
            </div>

            <div className="text-right">
              <span className="text-base font-extrabold text-slate-900 block">07:40 PM</span>
              <span className="text-slate-500">New Delhi (NDLS)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Operator: Vande Bharat Express</span>
            <span className="font-bold text-emerald-700">Dinner Included</span>
          </div>
        </div>

      </div>

    </div>
  );
};
