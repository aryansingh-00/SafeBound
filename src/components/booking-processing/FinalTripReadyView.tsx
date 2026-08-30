import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, FileText, Download, Sparkles, ShieldCheck } from 'lucide-react';
import { GeneratedTripPlan } from '../../types';

interface FinalTripReadyViewProps {
  plan: GeneratedTripPlan | null;
}

export const FinalTripReadyView: React.FC<FinalTripReadyViewProps> = ({ plan }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-8 sm:p-12 border-2 border-emerald-500/50 shadow-2xl text-center space-y-6 animate-fadeIn relative overflow-hidden">
      
      {/* Background celebration glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-3">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-emerald-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
          All Services Confirmed & Verified
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          🎉 Your trip is ready!
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-lg mx-auto leading-relaxed">
          SafeBound autonomous agents successfully secured your transport, 4★ hotel suite, private transfers and curated passes.
        </p>
      </div>

      {/* 5 Verified Checks */}
      <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 text-xs font-bold text-emerald-300">
        <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Transport (PNR Locked)</span>
        </span>
        <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Hotel (Suite Pre-Registered)</span>
        </span>
        <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Transfer (Chauffeur Synced)</span>
        </span>
        <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Activities (Passes Issued)</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 relative z-10">
        <button
          type="button"
          onClick={() => navigate('/booking/success/SB-TRIP-8X72K')}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-500/30 transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
        >
          <span>View Booking Success & Documents</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => navigate(`/trips/${plan?.id || 'SB-MUSSOORIE-4D'}/confirmed`)}
          className="w-full sm:w-auto px-6 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-2xl border border-slate-700 transition flex items-center justify-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>Interactive Itinerary</span>
        </button>
      </div>

    </div>
  );
};
