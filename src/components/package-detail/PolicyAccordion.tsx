import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, FileText, CheckCircle2 } from 'lucide-react';

export const PolicyAccordion: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>('hotel');

  const policies = [
    {
      id: 'hotel',
      title: '🏨 Hotel Cancellation Policy (Cedar View Retreat)',
      content: '100% Free cancellation up to 48 hours prior to check-in (Sep 13, 02:00 PM). Cancellations made within 48 hours are subject to a 1-night retention charge.',
    },
    {
      id: 'transport',
      title: '🚆 Transport Cancellation Policy (IRCTC Vande Bharat)',
      content: 'Cancellations up to 48 hours before train departure incur IRCTC standard flat deduction of ₹240/passenger. Cancellations between 48h and 12h incur a 25% fare deduction.',
    },
    {
      id: 'transfer',
      title: '🚕 Dedicated Chauffeur Transfer Policy',
      content: 'Free cancellation or route modification up to 24 hours before pickup. In case of flight/train delay, chauffeur pickup window automatically extends at no extra fee.',
    },
    {
      id: 'activities',
      title: '🎟️ VIP Activity Passes & Experiences',
      content: 'Cable Car and Guided Nature Trail passes are refundable up to 24 hours prior if bad weather or high winds shut down the ropeway.',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            <span>Cancellation & Refund Policies</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Transparent breakdown of individual supplier terms before you authorize payment.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
          Zero Platform Penalty
        </span>
      </div>

      <div className="space-y-2">
        {policies.map((p) => {
          const isOpen = openSection === p.id;
          return (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-200/80 bg-slate-50 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : p.id)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-100 transition"
              >
                <span>{p.title}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {isOpen && (
                <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed animate-fadeIn">
                  {p.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
