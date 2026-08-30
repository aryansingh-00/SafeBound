import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, Compass, Tag, MessageSquare, ArrowRight, Send } from 'lucide-react';

export const AICommandInput: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/ai-chat?query=${encodeURIComponent(query)}`);
  };

  const quickActions = [
    { label: '✨ Plan a Trip', path: '/plan-trip', icon: Sparkles, color: 'text-brand-600' },
    { label: '🔍 Find a Deal', path: '/deals', icon: Tag, color: 'text-purple-600' },
    { label: '🏔️ Discover Destinations', path: '/destinations', icon: Compass, color: 'text-amber-600' },
    { label: '🤖 Ask SafeBound AI', path: '/ai-chat', icon: MessageSquare, color: 'text-sky-600' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-card space-y-4">
      
      <div>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-600" />
          <span>What do you want to do today?</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Type naturally in plain English or Hindi — SafeBound parses constraints, budget and dates automatically.
        </p>
      </div>

      {/* Main NL Search Bar */}
      <form onSubmit={handleSearch} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Plan a 4-day peaceful mountain trip from Delhi under ₹30,000 for 2 people..."
          className="w-full pl-5 pr-28 py-4 bg-slate-50 border-2 border-slate-200/80 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:bg-white shadow-2xs transition"
        />

        <button
          type="submit"
          className="absolute right-2.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-brand-600/30 transition flex items-center gap-1.5"
        >
          <span>Ask AI</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* 4 Quick Action Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">
          Quick Launch:
        </span>
        {quickActions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => navigate(act.path)}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-brand-50 hover:border-brand-300 border border-slate-200/80 text-xs font-bold text-slate-700 hover:text-brand-800 transition flex items-center gap-1.5 shadow-2xs"
            >
              <Icon className={`w-3.5 h-3.5 ${act.color}`} />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
