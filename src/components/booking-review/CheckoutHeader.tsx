import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ShieldCheck, Lock } from 'lucide-react';

export const CheckoutHeader: React.FC = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* SafeBound Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-500 flex items-center justify-center shadow-md shadow-brand-500/25">
              <Send className="w-4 h-4 text-white transform -rotate-45 translate-x-0.5 -translate-y-0.5" />
            </div>
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-sans">
              Safe<span className="text-brand-600">Bound</span>
            </span>
          </Link>

          {/* Right: Security & Escrow Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Escrow Encrypted</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-600" />
              <span>Razorpay Verified</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
