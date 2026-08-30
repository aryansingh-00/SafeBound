import React from 'react';
import { Train, Building, Car, Compass, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ConfirmedServiceItem } from '../../data/bookingSuccessData';

interface ConfirmedServicesCardsProps {
  services: ConfirmedServiceItem[];
}

export const ConfirmedServicesCards: React.FC<ConfirmedServicesCardsProps> = ({ services }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'transport': return Train;
      case 'hotel': return Building;
      case 'transfer': return Car;
      default: return Compass;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'transport': return 'text-brand-600 bg-brand-50 border-brand-200';
      case 'hotel': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'transfer': return 'text-sky-600 bg-sky-50 border-sky-200';
      default: return 'text-amber-600 bg-amber-50 border-amber-200';
    }
  };

  return (
    <div className="space-y-4">
      
      <div className="flex items-center justify-between pb-1">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Your Bookings are 100% Confirmed</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Individual supplier reservations locked with guaranteed reference tokens.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
          4 of 4 Verified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((srv) => {
          const Icon = getIcon(srv.type);
          const colorClass = getBorderColor(srv.type);

          return (
            <div
              key={srv.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:border-brand-300 transition flex flex-col justify-between space-y-3.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold border ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">{srv.title}</h4>
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">{srv.subtitle}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Confirmed</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                <div className="flex justify-between font-mono font-bold text-slate-700">
                  <span>{srv.confirmationRef}</span>
                  <span className="text-slate-400 font-normal">{srv.dateRange}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed pt-0.5">
                  {srv.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
