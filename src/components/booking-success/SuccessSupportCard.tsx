import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, PhoneCall, MessageSquare, ShieldCheck } from 'lucide-react';

export const SuccessSupportCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-extrabold text-slate-900">
            Need Help or Travel Assistance?
          </h3>
        </div>
        <span className="text-[10px] font-extrabold text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
          24/7 Active
        </span>
      </div>

      <p className="text-xs text-slate-500 font-medium leading-relaxed">
        Our human concierge team and AI monitoring sentinel are standing by to assist with any itinerary modifications, dietary preferences, or hotel check-in requests.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
        <button
          type="button"
          onClick={() => alert('SafeBound 24/7 Dedicated Concierge Support Helpline: +91 1800 247 7233 (Toll Free)')}
          className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-bold text-slate-800 transition flex items-center justify-center gap-2"
        >
          <PhoneCall className="w-4 h-4 text-brand-600" />
          <span>Call 24/7 Helpline</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/ai-chat')}
          className="p-3 rounded-2xl bg-brand-50 hover:bg-brand-100 border border-brand-200 font-bold text-brand-800 transition flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-brand-600" />
          <span>Chat with SafeBound AI</span>
        </button>
      </div>

    </div>
  );
};
