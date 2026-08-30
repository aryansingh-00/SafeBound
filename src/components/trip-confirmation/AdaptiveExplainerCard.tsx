import React from 'react';
import { Zap, Train, Car, Building, Bell, ArrowRight, ShieldCheck } from 'lucide-react';

export const AdaptiveExplainerCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-brand-50/70 border border-brand-200/90 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xs">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-xs">
            <Zap className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">
              If something changes, SafeBound adapts automatically
            </h4>
            <p className="text-xs text-slate-500 font-medium">
              How our autonomous agents keep your entire journey synchronized.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-brand-100 text-brand-800 border border-brand-200 hidden sm:block">
          Zero Effort Required
        </span>
      </div>

      {/* Visual Step-by-Step Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
        
        <div className="p-3 rounded-2xl bg-white border border-slate-200/80 space-y-1">
          <span className="text-[10px] text-amber-700 font-bold uppercase block flex items-center gap-1">
            <Train className="w-3 h-3 text-amber-600" />
            <span>1. Delay Detected</span>
          </span>
          <p className="font-bold text-slate-800">Train held +1h 20m</p>
          <span className="text-[10px] text-slate-400">IRCTC API track alert</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200/80 space-y-1">
          <span className="text-[10px] text-brand-700 font-bold uppercase block flex items-center gap-1">
            <Zap className="w-3 h-3 text-brand-600" />
            <span>2. Agent Triggers</span>
          </span>
          <p className="font-bold text-slate-800">Evaluates Impact</p>
          <span className="text-[10px] text-slate-400">Transfer & check-in check</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200/80 space-y-1">
          <span className="text-[10px] text-emerald-700 font-bold uppercase block flex items-center gap-1">
            <Car className="w-3 h-3 text-emerald-600" />
            <span>3. Transfer Adjusted</span>
          </span>
          <p className="font-bold text-slate-800">Pickup ➔ 12:20 PM</p>
          <span className="text-[10px] text-slate-400">Driver Ramesh notified</span>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200/80 space-y-1">
          <span className="text-[10px] text-sky-700 font-bold uppercase block flex items-center gap-1">
            <Building className="w-3 h-3 text-sky-600" />
            <span>4. Stay Updated</span>
          </span>
          <p className="font-bold text-slate-800">Late Arrival Noted</p>
          <span className="text-[10px] text-slate-400">Suite held guarantee</span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1">
          <span className="text-[10px] text-emerald-800 font-bold uppercase block flex items-center gap-1">
            <Bell className="w-3 h-3 text-emerald-600" />
            <span>5. You're Notified</span>
          </span>
          <p className="font-bold text-emerald-950">Push Alert Sent</p>
          <span className="text-[10px] text-emerald-700">Everything resolved!</span>
        </div>

      </div>

    </div>
  );
};
