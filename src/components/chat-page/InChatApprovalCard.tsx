import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight, Wallet, Sparkles } from 'lucide-react';

interface InChatApprovalCardProps {
  destination: string;
  duration: string;
  travellers: number;
  totalPrice: number;
  maxBudget: number;
  onProceedToBookingReview: () => void;
}

export const InChatApprovalCard: React.FC<InChatApprovalCardProps> = ({
  destination,
  duration,
  travellers,
  totalPrice,
  maxBudget,
  onProceedToBookingReview,
}) => {
  const buffer = maxBudget - totalPrice;

  return (
    <div className="w-full max-w-lg bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-700 text-white rounded-3xl p-6 shadow-xl space-y-4 my-2 animate-fadeIn">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h4 className="text-base font-extrabold">Ready to book?</h4>
            <p className="text-xs text-brand-100 font-medium">All components unified into one checkout</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
          Price Locked
        </span>
      </div>

      {/* Package Summary Box */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 space-y-2 text-xs">
        <div className="flex justify-between font-semibold">
          <span className="text-brand-100">Package</span>
          <span className="text-white font-bold">{destination} — {duration}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className="text-brand-100">Travellers</span>
          <span className="text-white font-bold">{travellers} Travellers</span>
        </div>
        <div className="flex justify-between font-semibold pt-2 border-t border-white/10">
          <span className="text-brand-100">Total Due</span>
          <span className="text-xl font-extrabold text-white">₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-[11px] text-emerald-300 font-medium">
          <span>Max Budget: ₹{maxBudget.toLocaleString('en-IN')}</span>
          <span>Savings buffer: ₹{buffer.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onProceedToBookingReview}
        className="w-full py-3.5 bg-white hover:bg-slate-50 text-brand-700 font-extrabold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
      >
        <span>Review & Book →</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-[10px] text-center text-brand-200">
        Review traveller details and confirm with Razorpay secure single escrow.
      </p>

    </div>
  );
};
