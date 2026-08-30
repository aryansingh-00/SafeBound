import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, Bot, X, ArrowRight } from 'lucide-react';

export const FloatingAIAssistant: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const samplePrompts = [
    '🛡️ Which package is safest right now?',
    '💰 Can you make the Mussoorie package cheaper?',
    '🏔️ Why is Mussoorie ranked higher than Manali?',
    '🏖️ Show me a coastal beach option under ₹40K',
  ];

  const handleAsk = (prompt: string) => {
    navigate(`/ai-chat?query=${encodeURIComponent(prompt)}`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900 text-white rounded-3xl p-5 shadow-2xl border border-brand-500/40 space-y-3.5 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                Ask SafeBound AI
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            SafeBound has full context of your 4 generated packages and budget constraints.
          </p>

          <div className="space-y-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(p)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-brand-900/60 border border-slate-700 text-xs text-slate-200 hover:text-white transition truncate block"
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => navigate('/ai-chat')}
            className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open Travel AI Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3.5 bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-2xl shadow-brand-600/40 transition flex items-center gap-2 transform hover:-translate-y-1"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>✨ Ask SafeBound</span>
      </button>

    </div>
  );
};
