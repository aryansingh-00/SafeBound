import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export const EmptyTripsState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-card max-w-xl mx-auto space-y-6 my-10 animate-fadeIn">
      
      <div className="w-20 h-20 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-inner">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Your next adventure starts here.
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
          You don't have any booked trips yet. Plan your first journey with SafeBound AI and let our autonomous agents orchestrate transport, stays and passes.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => navigate('/plan-trip')}
          className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md shadow-brand-600/30 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>✨ Plan My Trip</span>
        </button>

        <button
          onClick={() => navigate('/ai-chat')}
          className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-brand-600" />
          <span>🤖 Chat with SafeBound AI</span>
        </button>
      </div>

    </div>
  );
};
