import React from 'react';
import { MessageSquare, Sparkles, Bot } from 'lucide-react';

interface AgentBannerProps {
  onOpenChat: () => void;
}

export const AgentBanner: React.FC<AgentBannerProps> = ({ onOpenChat }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-3xl bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-600 p-6 sm:p-8 lg:p-10 text-white shadow-card overflow-hidden">
        
        {/* Glow & subtle decorative circles */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: 3D AI Robot Avatar & Message */}
          <div className="flex items-center gap-5 sm:gap-6">
            
            {/* Robot Avatar Badge */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white flex items-center justify-center shadow-md">
                  <Bot className="w-8 h-8 sm:w-9 sm:h-9 text-brand-600 animate-pulse-subtle" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-brand-700"></span>
              </span>
            </div>

            {/* Text Content */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
                  Your AI Travel Commerce Agent
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-white/20 text-white rounded-full uppercase tracking-wider">
                  Always Active
                </span>
              </div>
              <p className="text-sm sm:text-base text-brand-100 font-medium max-w-2xl leading-snug">
                I continuously filter, optimize and book the best options for you. Just tell me what you need!
              </p>
            </div>

          </div>

          {/* Right: Chat CTA Button */}
          <div className="w-full md:w-auto shrink-0">
            <button
              onClick={onOpenChat}
              className="w-full md:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-brand-700 font-bold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageSquare className="w-5 h-5 text-brand-600" />
              <span>Chat with SafeBound AI</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
