import React, { useState } from 'react';
import { Mail, CheckCircle2, RotateCw, Edit3 } from 'lucide-react';

interface EmailDispatchNoticeProps {
  email: string;
}

export const EmailDispatchNotice: React.FC<EmailDispatchNoticeProps> = ({ email }) => {
  const [resending, setResending] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setSentMessage(true);
      setTimeout(() => setSentMessage(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold shrink-0">
          <Mail className="w-5 h-5" />
        </div>

        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-slate-900 text-sm">
              Trip Details Emailed
            </h4>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Dispatched</span>
            </span>
          </div>

          <p className="text-slate-500 font-medium">
            Electronic vouchers and receipt sent to: <strong className="text-slate-800">{email}</strong>
          </p>

          {sentMessage && (
            <span className="text-emerald-600 font-bold block pt-1 animate-fadeIn">
              ✓ Confirmation email re-sent successfully!
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <button
          type="button"
          disabled={resending}
          onClick={handleResend}
          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5"
        >
          <RotateCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
          <span>{resending ? 'Sending...' : 'Resend Email'}</span>
        </button>
      </div>

    </div>
  );
};
