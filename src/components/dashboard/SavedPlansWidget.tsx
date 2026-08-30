import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { INITIAL_SAVED_PLANS } from '../../data/profileData';

export const SavedPlansWidget: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-brand-600" />
          <span>♡ Saved AI Trip Plans ({INITIAL_SAVED_PLANS.length})</span>
        </h3>

        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="text-xs font-bold text-brand-600 hover:text-brand-700"
        >
          Manage All
        </button>
      </div>

      <div className="space-y-3">
        {INITIAL_SAVED_PLANS.map((plan) => (
          <div
            key={plan.id}
            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex items-center justify-between gap-3 text-xs"
          >
            <div>
              <h4 className="font-extrabold text-slate-900">{plan.title}</h4>
              <p className="text-slate-500 text-[11px]">{plan.duration} • 2 Travellers • ₹{plan.cost.toLocaleString('en-IN')}</p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/plan-trip')}
              className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold rounded-xl border border-brand-200 transition shrink-0"
            >
              Resume
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
