import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface SuccessAIAssistantProps {
  tripId: string;
}

export const SuccessAIAssistant: React.FC<SuccessAIAssistantProps> = ({ tripId }) => {
  const navigate = useNavigate();

  const prompts = [
    '“When should I leave for NDLS station?”',
    '“What should I pack for Mussoorie in Sep?”',
    '“Where is my chauffeur pickup point?”',
    '“What is my Day 2 activity schedule?”',
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-600" />
          <h3 className="text-base font-extrabold text-slate-900">
            ✨ Ask SafeBound AI (Mussoorie Assistant)
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Context Loaded</span>
      </div>

      <p className="text-xs text-slate-500 font-medium">
        Have questions about departure times, packing tips, or weather? SafeBound has full context on your booking.
      </p>

      {/* Suggested Prompts */}
      <div className="space-y-2">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => navigate(`/ai-chat?query=${encodeURIComponent(p.replace(/“|”/g, ''))}`)}
            className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-brand-50 hover:border-brand-200 border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-brand-800 transition flex items-center justify-between group"
          >
            <span>{p}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-600 transition" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate(`/ai-chat?tripId=${tripId}`)}
        className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Open Dedicated Trip Assistant</span>
      </button>

    </div>
  );
};
