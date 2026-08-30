import React from 'react';
import { User, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserProfileData } from '../../data/profileData';

interface ProfileHeaderProps {
  user: UserProfileData;
  onCompleteProfile: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, onCompleteProfile }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-brand-500/30 shadow-2xl text-white space-y-6 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        
        {/* Left: User Avatar & Badge */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white flex items-center justify-center text-2xl sm:text-3xl font-extrabold shadow-xl shadow-brand-500/30 ring-4 ring-brand-500/20">
            {user.name.charAt(0)}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-brand-200 font-medium flex items-center gap-2">
              <span>SafeBound Prime Traveller</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Member since {user.memberSince}</span>
            </p>
          </div>
        </div>

        {/* Right: Profile Completeness Widget */}
        <div className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-2.5 sm:w-80">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Profile Completeness</span>
            </span>
            <span className="font-mono font-extrabold text-emerald-400">
              {user.completionPercentage}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${user.completionPercentage}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium">Speed up 1-click bookings</span>
            <button
              type="button"
              onClick={onCompleteProfile}
              className="font-bold text-brand-300 hover:text-white flex items-center gap-1 transition"
            >
              <span>Add Info</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
