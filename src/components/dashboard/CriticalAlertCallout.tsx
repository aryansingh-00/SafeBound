import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight, Zap } from 'lucide-react';

export const CriticalAlertCallout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-rose-50 border-2 border-rose-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-rose-950 animate-fadeIn">
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 font-bold">
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <strong className="text-sm font-extrabold text-rose-900">
              Action Required: Alternative Hotel Suite Found
            </strong>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-rose-200/60 text-rose-900">
              Needs Approval
            </span>
          </div>

          <p className="text-rose-800 leading-relaxed">
            SafeBound auto-negotiated a 4★ Executive Pine Suite at the same property with ₹700 savings for your Mussoorie trip.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('/notifications')}
        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 shrink-0"
      >
        <span>Review & Resolve Now</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
