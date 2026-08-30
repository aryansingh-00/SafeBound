import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, AlertCircle, Check } from 'lucide-react';

export const CancellationPolicies: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
      
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
            Cancellation & Refund Policies
          </h4>
        </div>

        <div className="flex items-center gap-1 text-xs text-brand-600 font-bold">
          <span>{expanded ? 'Hide Policies' : 'View Full Policies'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>100% Full Refund if cancelled up to 48 hours before departure date.</span>
      </div>

      {expanded && (
        <div className="space-y-3 pt-2 border-t border-slate-100 text-xs text-slate-600 animate-fadeIn">
          
          <div className="space-y-1">
            <span className="font-bold text-slate-800 block">🏨 Hotel Cancellation</span>
            <p className="text-[11px] text-slate-500">Free cancellation up to 48 hours before check-in. 50% refund between 24-48 hours.</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-800 block">🚆 Transport & Train Policy</span>
            <p className="text-[11px] text-slate-500">Subject to IRCTC standard refund schedule. Free rescheduling supported by SafeBound Concierge.</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-800 block">🚕 Transfers & Activities</span>
            <p className="text-[11px] text-slate-500">100% refundable or swappable due to weather disruptions.</p>
          </div>

        </div>
      )}

    </div>
  );
};
