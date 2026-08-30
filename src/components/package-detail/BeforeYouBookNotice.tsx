import React from 'react';
import { AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const BeforeYouBookNotice: React.FC = () => {
  return (
    <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200/90 text-xs text-amber-950 space-y-3">
      
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <h4 className="text-sm font-extrabold text-amber-900">
          Important Notes Before You Book
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-amber-900 leading-relaxed text-[11px]">
        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>Government Photo ID (Aadhaar/Passport/Driving License) required at hotel check-in for all adult guests.</span>
        </div>

        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>IRCTC train tickets are electronically mapped to passenger legal names provided at checkout.</span>
        </div>

        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>Weather in Mussoorie can drop to 16°C in late evenings; light woollens or windcheaters are recommended.</span>
        </div>

        <div className="flex items-start gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          <span>SafeBound holds your payment in a 256-bit escrow vault until all individual provider bookings are locked.</span>
        </div>
      </div>

    </div>
  );
};
