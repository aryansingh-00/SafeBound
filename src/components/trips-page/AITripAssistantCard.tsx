import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, Bot, ArrowRight, HelpCircle } from 'lucide-react';

interface AITripAssistantCardProps {
  tripId: string;
}

export const AITripAssistantCard: React.FC<AITripAssistantCardProps> = ({ tripId }) => {
  const navigate = useNavigate();

  const sampleQuestions = [
    '⏰ When should I leave for the station?',
    '🚆 Is my train still delayed?',
    '🏨 What is my hotel check-in time?',
    '🎟️ Can you find an indoor alternative activity?',
  ];

  const handleAskQuestion = (q: string) => {
    navigate(`/ai-chat?trip=${tripId}`);
  };

  return (
    <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-700 text-white rounded-3xl p-5 shadow-xl space-y-4 relative overflow-hidden">
      
      <div className="relative z-10 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-200 flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-amber-300" />
            <span>24/7 Concierge AI</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        <h4 className="text-base font-extrabold">Ask SafeBound AI</h4>
        <p className="text-xs text-brand-100 font-medium">
          Contextually aware of your tickets, hotel check-ins and driver pickups.
        </p>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="space-y-1.5 relative z-10">
        {sampleQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAskQuestion(q)}
            className="w-full text-left p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white font-medium transition truncate"
          >
            {q}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate(`/ai-chat?trip=${tripId}`)}
        className="w-full py-2.5 bg-white hover:bg-slate-50 text-brand-700 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 relative z-10"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>Open Trip AI Command Center</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
