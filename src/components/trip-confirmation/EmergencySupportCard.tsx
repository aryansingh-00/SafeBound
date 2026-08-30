import React from 'react';
import { PhoneCall, MessageSquare, ShieldCheck, HeartPulse } from 'lucide-react';

export const EmergencySupportCard: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3.5">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-rose-500" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            🆘 24/7 Dedicated Trip Concierge
          </h4>
        </div>

        <span className="text-[10px] font-bold text-slate-400">
          Always On Call
        </span>
      </div>

      <p className="text-xs text-slate-600 font-medium leading-relaxed">
        Need assistance with rescheduling, luggage, late check-in or urgent route guidance? Our travel concierge is ready to assist.
      </p>

      <div className="space-y-2 pt-1 text-xs">
        <a
          href="tel:1800723323"
          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-2xl flex items-center justify-between font-bold text-slate-800 transition"
        >
          <span className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-brand-600" />
            <span>Toll-Free Helpline</span>
          </span>
          <span className="text-brand-700 font-mono">1800-SAFE-BD</span>
        </a>

        <button
          type="button"
          onClick={() => alert('Opening SafeBound 24/7 WhatsApp Concierge Support...')}
          className="w-full p-3 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/80 rounded-2xl flex items-center justify-between font-bold text-emerald-900 transition"
        >
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>WhatsApp Concierge</span>
          </span>
          <span className="text-xs text-emerald-700">Chat Now</span>
        </button>
      </div>

    </div>
  );
};
