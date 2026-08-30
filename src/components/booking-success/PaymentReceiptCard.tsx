import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ChevronDown, ChevronUp, Lock, Receipt } from 'lucide-react';
import { BookingSuccessRecord } from '../../data/bookingSuccessData';

interface PaymentReceiptCardProps {
  record: BookingSuccessRecord;
}

export const PaymentReceiptCard: React.FC<PaymentReceiptCardProps> = ({ record }) => {
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-card space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
              Payment Confirmed
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">
              Processed via Razorpay 256-Bit Escrow Vault
            </span>
          </div>
        </div>

        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          ✓ Verified Paid
        </span>
      </div>

      {/* Amount & Transaction Details */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-500 font-semibold">Total Escrow Amount:</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            ₹{record.totalAmount.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs font-mono">
          <div className="flex justify-between text-slate-600">
            <span>Transaction ID:</span>
            <span className="font-bold text-slate-900">{record.payment.transactionId}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Method:</span>
            <span className="text-slate-800">{record.payment.method}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Timestamp:</span>
            <span className="text-slate-800">{record.payment.paymentDate}</span>
          </div>
        </div>
      </div>

      {/* Budget Summary Line */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 space-y-1">
        <div className="flex justify-between font-bold">
          <span>Your Target Budget: ₹{record.plannedBudget.toLocaleString('en-IN')}</span>
          <span className="text-emerald-700">₹{record.remainingBuffer.toLocaleString('en-IN')} Saved</span>
        </div>
        <p className="text-[11px] text-emerald-800">
          You stayed ₹{record.remainingBuffer.toLocaleString('en-IN')} comfortably under your maximum budget limit.
        </p>
      </div>

      {/* Expandable Price Breakdown */}
      <div className="pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setBreakdownOpen(!breakdownOpen)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-brand-700 py-1"
        >
          <span className="flex items-center gap-1.5">
            <Receipt className="w-3.5 h-3.5 text-slate-400" />
            <span>Itemized Component Breakdown</span>
          </span>
          {breakdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {breakdownOpen && (
          <div className="space-y-1.5 pt-2 text-xs text-slate-600 animate-fadeIn font-mono">
            <div className="flex justify-between">
              <span>Return Train (Vande Bharat):</span>
              <span className="font-bold text-slate-900">₹7,800</span>
            </div>
            <div className="flex justify-between">
              <span>4★ Cedar View Suite (3 Nights):</span>
              <span className="font-bold text-slate-900">₹16,500</span>
            </div>
            <div className="flex justify-between">
              <span>Dedicated Chauffeur Hill Cab:</span>
              <span className="font-bold text-slate-900">₹2,500</span>
            </div>
            <div className="flex justify-between">
              <span>2 Curated VIP Activity Passes:</span>
              <span className="font-bold text-slate-900">₹4,500</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-slate-200 font-bold text-slate-900">
              <span>Total Inclusive Paid:</span>
              <span>₹31,300</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
