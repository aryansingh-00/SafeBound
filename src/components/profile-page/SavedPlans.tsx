import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calendar, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { SavedTripPlanItem } from '../../data/profileData';

interface SavedPlansProps {
  plans: SavedTripPlanItem[];
  onDeletePlan: (id: string) => void;
}

export const SavedPlans: React.FC<SavedPlansProps> = ({ plans, onDeletePlan }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-6 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" />
            <span>Saved AI Trip Plans</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Pre-generated multi-modal packages saved for future booking or customization.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500">
          {plans.length} Saved Packages
        </span>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-extrabold text-slate-900">{plan.title}</h4>
                <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-brand-100 text-brand-800">
                  {plan.duration}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="font-semibold text-slate-800">₹{plan.cost.toLocaleString('en-IN')} Total</span>
                <span>•</span>
                <span>{plan.travellers} Travellers</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>Saved on {plan.createdDate}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
              <button
                type="button"
                onClick={() => onDeletePlan(plan.id)}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-white transition"
                title="Delete plan"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/plan-trip')}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Open Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
