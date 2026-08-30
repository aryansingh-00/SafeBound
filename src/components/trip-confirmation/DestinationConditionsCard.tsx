import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Radio } from 'lucide-react';

export const DestinationConditionsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3.5">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            🛡️ Destination Safety & Conditions
          </h4>
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          Normal (Safe)
        </span>
      </div>

      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex items-center justify-between">
          <span>Dehradun–Mussoorie Highway (NH-707)</span>
          <span className="font-bold text-emerald-700">✓ All Clear (No Landslides)</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Local Weather & Visibility</span>
          <span className="font-bold text-emerald-700">✓ Good (No Heavy Fog)</span>
        </div>
        <div className="flex items-center justify-between">
          <span>State Tourism Advisory</span>
          <span className="font-bold text-emerald-700">✓ Green Zone</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span>Source: Uttarakhand State Disaster API</span>
        <span>Updated 4 mins ago</span>
      </div>

    </div>
  );
};
