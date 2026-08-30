import React, { useState } from 'react';
import { Mail, CheckCircle2, RotateCw, ArrowRight, X } from 'lucide-react';

interface EmailVerificationModalProps {
  email: string;
  isOpen: boolean;
  onVerified: () => void;
  onClose: () => void;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  email,
  isOpen,
  onVerified,
  onClose,
}) => {
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  if (!isOpen) return null;

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 2500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-150">
        
        <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-xs">
          <Mail className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-extrabold text-slate-900">
            Check your email 📧
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            We've sent a 6-digit confirmation link to <strong className="text-slate-800 font-bold">{email}</strong>.
          </p>
        </div>

        {resendSuccess && (
          <span className="text-xs font-bold text-emerald-600 block animate-fadeIn">
            ✓ New verification link dispatched!
          </span>
        )}

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={onVerified}
            className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
          >
            <span>Confirm & Enter SafeBound (Demo Instant Verify)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            disabled={resending}
            onClick={handleResend}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
          >
            <RotateCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
            <span>{resending ? 'Sending...' : 'Resend Verification Email'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
