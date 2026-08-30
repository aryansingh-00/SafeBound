import React from 'react';
import { Bot, Sparkles, Radio, CloudSun, Plane, Building, Compass, ShieldCheck } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white px-5 py-4 border-b border-slate-200/80 rounded-t-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 shadow-xs">
      
      {/* Title & Agent Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-brand-500/25">
          <Bot className="w-5 h-5 animate-pulse-subtle" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-sans">
              Chat with SafeBound AI
            </h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Live Data Enabled
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium">
            Your AI travel commerce agent • Natural language to complete booking
          </p>
        </div>
      </div>

      {/* Live Data Stream Telemetry Chips */}
      <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80">
        <span className="flex items-center gap-1 text-sky-700"><Plane className="w-3 h-3 text-sky-500" /> Transport</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-purple-700"><Building className="w-3 h-3 text-purple-500" /> Hotels</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-amber-700"><CloudSun className="w-3 h-3 text-amber-500" /> Weather</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-emerald-700"><Compass className="w-3 h-3 text-emerald-500" /> Activities</span>
      </div>

    </div>
  );
};
