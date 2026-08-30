import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight, Sparkles, Download } from 'lucide-react';

interface NextJourneyTimelineCTAProps {
  tripId: string;
}

export const NextJourneyTimelineCTA: React.FC<NextJourneyTimelineCTAProps> = ({ tripId }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="space-y-1 relative z-10 max-w-xl">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-200 block">
          Day-by-Day Master Schedule
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Your Complete 4-Day Interactive Itinerary is Ready
        </h3>
        <p className="text-xs sm:text-sm text-brand-100 font-medium leading-relaxed">
          Departure times, check-in gates, local directions, and activity voucher slots are synchronized into a single unified timeline.
        </p>
      </div>

      <div className="pt-2 border-t border-white/20 flex flex-wrap items-center gap-3 relative z-10">
        <button
          type="button"
          onClick={() => navigate(`/trips/${tripId}/confirmed`)}
          className="px-6 py-3 bg-white hover:bg-brand-50 text-brand-900 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <span>View Complete Itinerary</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => navigate('/trips')}
          className="px-5 py-3 bg-brand-900/40 hover:bg-brand-900/60 text-white font-bold text-xs rounded-xl border border-white/20 transition"
        >
          Open My Trips Dashboard
        </button>
      </div>

    </div>
  );
};
