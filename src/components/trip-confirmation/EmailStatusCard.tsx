import React, { useState } from 'react';
import { Mail, CheckCircle2, RefreshCw } from 'lucide-react';

export const EmailStatusCard: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleResend = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-card space-y-3">
      
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            Email Confirmation
          </h4>
        </div>

        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Sent</span>
        </span>
      </div>

      <div className="space-y-1 text-xs">
        <p className="text-slate-600 font-medium">
          Complete itinerary and booking passes dispatched to:
        </p>
        <p className="font-bold text-slate-900 font-mono">aryan@safebound.ai</p>
      </div>

      <button
        type="button"
        disabled={isResending}
        onClick={handleResend}
        className="w-full py-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
        <span>{resendSuccess ? '✓ Email Dispatched!' : isResending ? 'Sending...' : 'Resend Email Confirmation'}</span>
      </button>

    </div>
  );
};
