import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, User, CheckCircle2, Edit3 } from 'lucide-react';

export const TravellerPreviewBadge: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold shrink-0">
          <Users className="w-4 h-4" />
        </div>

        <div>
          <span className="font-extrabold text-slate-900 block">
            Travelling (2 Persons): Aryan Singh & Rhea Sharma
          </span>
          <span className="text-slate-500 text-[11px]">
            Saved profiles will be suggested at checkout for instant 1-click verification.
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/profile')}
        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Edit Profiles</span>
      </button>

    </div>
  );
};
