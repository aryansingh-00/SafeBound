import React from 'react';
import { X, Edit3, Hotel, Car, Compass, AlertCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { UpcomingTripData } from '../../data/tripsData';

interface ManageTripMenuProps {
  trip: UpcomingTripData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ManageTripMenu: React.FC<ManageTripMenuProps> = ({
  trip,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !trip) return null;

  const actions = [
    { title: 'Modify Trip Dates / Route', desc: 'Reschedule travel dates with free date change guarantee', icon: Edit3 },
    { title: 'Change Hotel or Room Type', desc: 'Upgrade to Luxury Balcony Suite or change property', icon: Hotel },
    { title: 'Adjust Transfer Pickup Time', desc: 'Change station/airport chauffeur schedule', icon: Car },
    { title: 'Swap Activity Passes', desc: 'Exchange Kempty pass for local heritage monastery tour', icon: Compass },
    { title: 'Cancel Entire Package', desc: '100% Escrow refund according to flexible cancellation policy', icon: AlertCircle, danger: true },
  ];

  const handleAction = (title: string) => {
    alert(`Action initialized: ${title}. SafeBound Concierge will update your booking.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Manage Trip Bookings</h3>
            <p className="text-xs text-slate-500 font-medium">{trip.title} (#{trip.id})</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action List */}
        <div className="p-5 space-y-2.5">
          {actions.map((act, i) => {
            const Icon = act.icon;

            return (
              <button
                key={i}
                type="button"
                onClick={() => handleAction(act.title)}
                className={`w-full p-3 rounded-2xl border text-left flex items-start gap-3 transition ${
                  act.danger
                    ? 'bg-rose-50/50 hover:bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-slate-50 hover:bg-white border-slate-200 text-slate-800 hover:border-brand-300'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${act.danger ? 'bg-rose-100 text-rose-600' : 'bg-brand-50 text-brand-600'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">{act.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{act.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Support Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-brand-600" />
            <span>24/7 Dedicated Concierge Helpline</span>
          </span>
          <span className="font-bold text-slate-900">1800-SAFE-BD</span>
        </div>

      </div>
    </div>
  );
};
