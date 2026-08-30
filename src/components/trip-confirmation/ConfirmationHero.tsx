import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Train, 
  Building, 
  Car, 
  Compass, 
  CheckCircle2, 
  ArrowDown, 
  FileText, 
  Download, 
  Mail, 
  MessageSquare 
} from 'lucide-react';
import { TripHealthBadge } from './TripHealthBadge';

interface ConfirmationHeroProps {
  onScrollToItinerary: () => void;
  onDownloadDetails: () => void;
  onEmailDetails: () => void;
  onAskAI: () => void;
}

export const ConfirmationHero: React.FC<ConfirmationHeroProps> = ({
  onScrollToItinerary,
  onDownloadDetails,
  onEmailDetails,
  onAskAI,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-10 border-2 border-emerald-500/40 shadow-2xl text-white space-y-8 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar: Badges & Trip Health */}
      <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🟢 All Bookings Confirmed</span>
          </span>
          <span className="text-xs font-mono text-slate-300 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700">
            Booking ID: #SB-MUSSOORIE-4D
          </span>
        </div>

        <TripHealthBadge />
      </div>

      {/* Main Headline */}
      <div className="relative z-10 space-y-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <span>🎉 Your trip is ready!</span>
        </h1>
        <p className="text-sm sm:text-base text-brand-200 font-medium max-w-2xl leading-relaxed">
          SafeBound has coordinated your complete journey — transport seats, 4★ suite, mountain chauffeur and curated passes are verified and escrow-secured.
        </p>
      </div>

      {/* Destination & Meta Strip */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 pt-2 border-t border-slate-800 relative z-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span className="font-extrabold text-white text-base">🏔️ Mussoorie, Uttarakhand</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-400" />
          <span className="font-bold">Sep 15 – Sep 19, 2026 (4 Days / 3 Nights)</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-400" />
          <span className="font-bold">2 Travellers (Aryan & Rhea)</span>
        </div>
      </div>

      {/* Visual Multi-Modal Route Stream */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 relative z-10 space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Coordinated Route Schedule
        </span>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm font-bold">
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center text-white">
              <Train className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white block">Delhi (DEL)</span>
              <span className="text-[10px] text-slate-400 font-normal">08:20 AM Departure</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-1 items-center justify-center px-4">
            <div className="w-full border-t-2 border-dashed border-slate-600 relative text-center">
              <span className="text-[10px] text-emerald-400 font-mono px-2 bg-slate-900 -top-2.5 relative rounded border border-slate-700">
                🚆 Vande Bharat Express
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-slate-700 flex items-center justify-center text-white">
              <Car className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="text-white block">Dehradun Hub</span>
              <span className="text-[10px] text-slate-400 font-normal">12:20 PM Synchronized Chauffeur</span>
            </div>
          </div>

          <div className="hidden sm:flex flex-1 items-center justify-center px-4">
            <div className="w-full border-t-2 border-dashed border-slate-600 relative text-center">
              <span className="text-[10px] text-amber-400 font-mono px-2 bg-slate-900 -top-2.5 relative rounded border border-slate-700">
                🚕 Dedicated Sedan
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Building className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-white block">Mussoorie Valley</span>
              <span className="text-[10px] text-slate-400 font-normal">Cedar View Heritage Retreat</span>
            </div>
          </div>

        </div>
      </div>

      {/* Top Prominent Quick Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2 relative z-10">
        <button
          type="button"
          onClick={onScrollToItinerary}
          className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center gap-1.5 transform hover:-translate-y-0.5"
        >
          <FileText className="w-4 h-4" />
          <span>View Full Itinerary</span>
        </button>

        <button
          type="button"
          onClick={onDownloadDetails}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download Trip Details (PDF)</span>
        </button>

        <button
          type="button"
          onClick={onEmailDetails}
          className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition flex items-center gap-1.5"
        >
          <Mail className="w-4 h-4 text-sky-400" />
          <span>Email Me Everything</span>
        </button>

        <button
          type="button"
          onClick={onAskAI}
          className="px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-1.5 ml-auto"
        >
          <MessageSquare className="w-4 h-4 text-amber-300" />
          <span>Ask SafeBound AI</span>
        </button>
      </div>

    </div>
  );
};
