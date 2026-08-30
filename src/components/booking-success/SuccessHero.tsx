import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Copy, Check, ShieldCheck, MapPin, Calendar, Users, Share2 } from 'lucide-react';
import { BookingSuccessRecord } from '../../data/bookingSuccessData';

interface SuccessHeroProps {
  record: BookingSuccessRecord;
  onOpenShareModal: () => void;
}

export const SuccessHero: React.FC<SuccessHeroProps> = ({ record, onOpenShareModal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard?.writeText(record.tripId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-brand-500/40 shadow-2xl space-y-6 text-center relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Success Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold shadow-md relative z-10 animate-bounce">
        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        <span>🟢 100% Services Confirmed & Locked</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-2 relative z-10 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
          🎉 Your Trip is Confirmed!
        </h1>
        <p className="text-xs sm:text-base text-brand-200 font-medium leading-relaxed">
          SafeBound has finalized your train tickets, 4★ luxury suite, dedicated chauffeur, and curated VIP passes.
        </p>
      </div>

      {/* Destination Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs relative z-10">
        <div className="text-center sm:text-left space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Destination</span>
          <h3 className="text-lg font-extrabold text-white flex items-center justify-center sm:justify-start gap-1.5">
            <span>🏔️ {record.destination}, {record.state}</span>
          </h3>
          <p className="text-brand-200 font-medium">{record.dateRange} • {record.duration}</p>
        </div>

        <div className="text-center sm:text-right space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Travellers</span>
          <span className="font-extrabold text-white bg-slate-700/80 px-3 py-1 rounded-lg inline-block">
            👥 {record.travellersCount} Travellers
          </span>
        </div>
      </div>

      {/* SafeBound Trip ID & Share Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 relative z-10 text-xs">
        <div className="flex items-center gap-2 bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-700 shadow-inner">
          <span className="text-slate-400 font-medium">SafeBound Trip ID:</span>
          <span className="font-mono font-extrabold text-amber-300 text-sm tracking-wider">
            {record.tripId}
          </span>
          <button
            type="button"
            onClick={handleCopyId}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition ml-1"
            title="Copy Trip ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenShareModal}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold rounded-2xl border border-slate-700 transition flex items-center gap-1.5 shadow-xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Trip Summary</span>
        </button>
      </div>

    </div>
  );
};
