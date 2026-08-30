import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, X, Bot, Check } from 'lucide-react';

export const ProactiveInsightCard: React.FC = () => {
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-brand-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-brand-500/40 shadow-xl space-y-4 relative overflow-hidden animate-fadeIn">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                ✨ SafeBound AI Proactive Insight
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-brand-500/30 text-brand-200 border border-brand-400/30">
                Learned Pattern
              </span>
            </div>
            <p className="text-xs text-brand-100 font-medium mt-0.5">
              Derived from your 90% mountain affinity score and ₹20K–₹40K typical trip budget.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 self-end sm:self-auto"
          title="Dismiss insight"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed relative z-10">
        You usually prefer short 4-day mountain escapes from Delhi. Next weekend has favorable 22°C sunny weather across Himachal valleys with train seats currently available under ₹28,000 all-inclusive.
      </p>

      <div className="pt-2 border-t border-slate-700/80 flex items-center gap-3 relative z-10">
        <button
          type="button"
          onClick={() => navigate('/destinations')}
          className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <span>Explore Himalayan Packages</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition"
        >
          Not Interested
        </button>
      </div>

    </div>
  );
};
