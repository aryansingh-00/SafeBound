import React from 'react';
import { EmailDeliveryState } from '../../backend/itinerary/itineraryTypes';
import { Mail, CheckCircle2, RefreshCw, Send } from 'lucide-react';

interface EmailConfirmationCardProps {
  emailState: EmailDeliveryState;
  recipientEmail?: string;
  subject?: string;
  onResend?: () => void;
}

export const EmailConfirmationCard: React.FC<EmailConfirmationCardProps> = ({
  emailState,
  recipientEmail = 'aryansingh@example.com',
  subject = '🎉 Your SafeBound trip to Mussoorie is confirmed!',
  onResend,
}) => {
  const stateConfig: Record<EmailDeliveryState, { label: string; cls: string; icon: React.ReactNode }> = {
    QUEUED:    { label: 'Queued for Delivery', cls: 'text-slate-400', icon: <RefreshCw className="w-4 h-4 animate-spin" /> },
    SENDING:   { label: 'Sending...', cls: 'text-amber-400', icon: <Send className="w-4 h-4 animate-bounce" /> },
    SENT:      { label: 'Email Sent', cls: 'text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
    DELIVERED: { label: 'Delivered', cls: 'text-emerald-400', icon: <CheckCircle2 className="w-4 h-4" /> },
    FAILED:    { label: 'Delivery Failed — Retry', cls: 'text-rose-400', icon: <Mail className="w-4 h-4" /> },
  };

  const { label, cls, icon } = stateConfig[emailState];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5 text-white shadow-card">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-sky-400" />
          <h3 className="text-sm font-extrabold text-white">Trip Confirmation Email</h3>
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-bold ${cls}`}>
          {icon}
          <span>{label}</span>
        </div>
      </div>

      {/* Email Preview */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
        <div className="space-y-1 text-slate-400 text-[11px]">
          <div className="flex gap-2"><span className="text-slate-600 w-10">To:</span><span className="text-slate-200">{recipientEmail}</span></div>
          <div className="flex gap-2"><span className="text-slate-600 w-10">Subj:</span><span className="text-slate-200">{subject}</span></div>
        </div>

        <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] text-slate-300 font-sans leading-relaxed">
          <p className="font-extrabold text-white text-sm">Trip Confirmed ✓</p>
          <p>🏔️ <strong>Mussoorie</strong> · Sep 15 – Sep 18 · 2 Travellers</p>

          <div className="border border-slate-800 rounded-xl p-3 space-y-1 font-mono text-[10px] text-slate-400">
            <p className="text-emerald-400 font-bold">🚆 Transport · ✓ Confirmed (PNR-WL8247)</p>
            <p className="text-emerald-400 font-bold">🏨 Hotel · ✓ Confirmed (HTL-CV4421)</p>
            <p className="text-emerald-400 font-bold">🚕 Transfer · ✓ Confirmed (TRF-8821)</p>
            <p className="text-emerald-400 font-bold">🎟️ Activities · ✓ 3 Experiences Confirmed</p>
          </div>

          <p><strong>Total Paid:</strong> ₹31,300 · Trip ID: SB-TRIP-8X72K</p>
          <p className="text-slate-500 text-[10px]">
            Documents available in your SafeBound Secure Vault. Not attached directly to protect sensitive information.
          </p>
        </div>
      </div>

      {/* Resend Button */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-slate-500">
          Trip remains confirmed regardless of email delivery status.
        </p>
        <button
          type="button"
          onClick={onResend}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Resend Email
        </button>
      </div>
    </div>
  );
};
