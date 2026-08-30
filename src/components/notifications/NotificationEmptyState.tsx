import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Compass, Sparkles } from 'lucide-react';

export const NotificationEmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200/90 shadow-card max-w-lg mx-auto space-y-5 my-8 animate-fadeIn">
      
      <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          🎉 You're all caught up!
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
          No new alerts right now. SafeBound is continuously monitoring your live transport and weather feeds in the background.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => navigate('/destinations')}
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 mx-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Destinations</span>
        </button>
      </div>

    </div>
  );
};
