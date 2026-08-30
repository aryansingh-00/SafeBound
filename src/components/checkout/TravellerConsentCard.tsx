import React from 'react';
import { User, Mail, Phone, CheckSquare, Square, ShieldCheck, Lock, CreditCard } from 'lucide-react';

interface TravellerConsentCardProps {
  confirmedConsent: boolean;
  onToggleConsent: () => void;
  onTriggerPayment: () => void;
  payableAmount: number;
  loading: boolean;
}

export const TravellerConsentCard: React.FC<TravellerConsentCardProps> = ({
  confirmedConsent,
  onToggleConsent,
  onTriggerPayment,
  payableAmount,
  loading,
}) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 text-white shadow-card">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-sm font-extrabold text-white">
          Traveller Information & Authorization
        </h3>
        <span className="text-[10px] font-mono text-slate-400">
          2 Verified Travellers
        </span>
      </div>

      {/* Traveller summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-brand-300 font-bold">
            <User className="w-3.5 h-3.5" />
            <span>Primary Traveller (Adult 1)</span>
          </div>
          <p className="text-slate-200 font-semibold">Aryan Singh · Age 28</p>
          <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> aryansingh@example.com</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 98765 43210</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-brand-300 font-bold">
            <User className="w-3.5 h-3.5" />
            <span>Co-Traveller (Adult 2)</span>
          </div>
          <p className="text-slate-200 font-semibold">Neha Sharma · Age 27</p>
          <p className="text-[10px] text-slate-400 pt-1">Government Photo ID on file (Aadhaar verified)</p>
        </div>
      </div>

      {/* Mandatory Checkbox */}
      <div
        onClick={onToggleConsent}
        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-brand-500/40 cursor-pointer transition flex items-start gap-3 text-xs"
      >
        <button type="button" className="mt-0.5 text-brand-400 shrink-0">
          {confirmedConsent ? (
            <CheckSquare className="w-4 h-4 text-emerald-400" />
          ) : (
            <Square className="w-4 h-4 text-slate-500" />
          )}
        </button>
        <p className="text-slate-300 leading-relaxed select-none">
          I have reviewed the package itinerary, transit timings, hotel cancellation policy, and traveller names. I authorize SafeBound to initiate Razorpay Smart Escrow payment.
        </p>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        disabled={!confirmedConsent || loading}
        onClick={onTriggerPayment}
        className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <CreditCard className="w-4 h-4" />
        <span>
          {loading ? 'Initializing Razorpay Checkout...' : `Pay ₹${payableAmount.toLocaleString('en-IN')}`}
        </span>
      </button>
    </div>
  );
};
