import React from 'react';
import { Send, Sparkles, Zap, ShieldCheck, RefreshCw, Star } from 'lucide-react';

export const AuthSplitHero: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'AI Conversational Trip Planning',
      desc: 'Plan multi-modal journeys across India in seconds with plain English.',
    },
    {
      icon: Zap,
      title: 'Autonomous Price & Route Optimization',
      desc: 'Continuous fare scanner locks instant discounts on stays and transit.',
    },
    {
      icon: ShieldCheck,
      title: 'Safety & Weather Sentinel',
      desc: 'Real-time telemetry checks for road clearances, IMD radar, and hotel quality.',
    },
    {
      icon: RefreshCw,
      title: 'Self-Healing Adaptive Transfers',
      desc: 'Train delay detected? Chauffeurs auto-reschedule without any phone calls.',
    },
  ];

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-brand-950 to-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Brand */}
      <div className="relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <Send className="w-5 h-5 transform -rotate-45 translate-x-0.5 -translate-y-0.5" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight">
            Safe<span className="text-brand-400">Bound</span>
          </span>
        </div>
      </div>

      {/* Center Value Proposition */}
      <div className="space-y-8 relative z-10 max-w-lg">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-brand-500/20 text-brand-300 border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Travel Commerce</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Your journey. <br />
            <span className="bg-gradient-to-r from-brand-300 via-indigo-200 to-amber-300 bg-clip-text text-transparent">
              Smarter with AI.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            Let SafeBound discover, book, synchronize and protect your entire trip in a single automated flow.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 gap-4 pt-2">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5 shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-white">{b.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Trust Quote */}
      <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <strong className="text-white">4.9/5</strong> rated by 12,000+ travellers
        </span>
        <span className="font-mono">Escrow Powered by Razorpay</span>
      </div>

    </div>
  );
};
