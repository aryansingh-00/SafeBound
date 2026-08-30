import React, { useState } from 'react';
import { Train, Building, Car, Compass, CheckCircle2, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

export const BookingSummaryCards: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const bookings = [
    { type: 'Transport', provider: 'IRCTC / Vande Bharat', ref: 'TRN-VB894210', icon: Train, detail: 'AC Volvo Coach Seats 14 & 15' },
    { type: 'Hotel Stay', provider: 'Cedar View Retreat', ref: 'HTL-894102', icon: Building, detail: '4★ Valley Suite (4 Nights)' },
    { type: 'Private Transfer', provider: 'SafeBound Chauffeur', ref: 'CAB-774921', icon: Car, detail: 'Dehradun ➔ Mussoorie Dedicated Cab' },
    { type: 'Experiences', provider: 'Gun Hill Cable Car', ref: 'ACT-338190', icon: Compass, detail: '2 VIP Fast-Track Activity Passes' },
  ];

  const handleCopyAll = () => {
    const text = bookings.map((b) => `${b.type}: ${b.ref} (${b.provider})`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Booking References & Service Tokens
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Individual reservations synchronized under your SafeBound master escrow transaction.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyAll}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 w-fit"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy All References'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {bookings.map((b, idx) => {
          const Icon = b.icon;

          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Confirmed</span>
                  </span>
                </div>

                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {b.type}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-0.5">{b.provider}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{b.detail}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-brand-700">{b.ref}</span>
                <span className="text-[10px] text-slate-400 font-semibold">Verified</span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
