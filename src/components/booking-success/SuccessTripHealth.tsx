import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SuccessTripHealth: React.FC = () => {
  const healthFactors = [
    { name: 'Bookings Locked', ok: true },
    { name: 'Transport PNR Active', ok: true },
    { name: 'Hotel Voucher Valid', ok: true },
    { name: 'Chauffeur Assigned', ok: true },
    { name: 'Activities Ready', ok: true },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h3 className="text-base font-extrabold text-slate-900">
            🟢 Trip Health: Everything Ready
          </h3>
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg">
          100% Prepared
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {healthFactors.map((f, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70"
          >
            <span className="font-bold text-slate-800">{f.name}</span>
            <span className="text-emerald-700 font-extrabold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified</span>
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
