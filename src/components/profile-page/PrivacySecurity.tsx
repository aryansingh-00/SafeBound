import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, CreditCard, Download, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

export const PrivacySecurity: React.FC = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const activeSessions = [
    { device: 'Windows 11 PC (Chrome / Edge)', location: 'New Delhi, India', current: true, lastActive: 'Active Now' },
    { device: 'iPhone 15 Pro (Safari Mobile)', location: 'New Delhi, India', current: false, lastActive: '2 days ago' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card space-y-8 animate-fadeIn">
      
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Lock className="w-5 h-5 text-brand-600" />
            <span>Privacy, Security & Data Controls</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage your credentials, active login devices, and tokenized payment authorizations.
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Escrow Vault</span>
        </span>
      </div>

      {/* 1. Account Security & Password */}
      <div className="space-y-3">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
          Account Password & Authentication
        </label>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Password</h4>
            <p className="text-xs text-slate-500">Last changed 3 months ago. Two-Factor Authentication is active.</p>
          </div>

          <button
            type="button"
            onClick={() => alert('Password update link sent to your registered email.')}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* 2. Active Sessions */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-brand-600" />
            <span>Active Login Sessions</span>
          </label>
          <button
            type="button"
            onClick={() => alert('Logged out from all other devices.')}
            className="text-xs font-bold text-rose-600 hover:underline"
          >
            Log Out Other Sessions
          </button>
        </div>

        <div className="space-y-2">
          {activeSessions.map((session, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
            >
              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <span>{session.device}</span>
                  {session.current && (
                    <span className="px-2 py-0.2 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded">
                      Current Device
                    </span>
                  )}
                </h4>
                <p className="text-slate-500 mt-0.5">{session.location} • {session.lastActive}</p>
              </div>

              <span className="text-slate-400 font-mono text-[10px]">Verified</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Tokenized Payment Reference (Section 21) */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-brand-600" />
          <span>Tokenized Payment Authorizations (Razorpay)</span>
        </label>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-mono font-bold text-xs">
              VISA
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">HDFC Bank Visa Debit Card</h4>
              <span className="text-[11px] font-mono text-slate-500">•••• •••• •••• 1234 (Razorpay Token ID: tok_rzp_9841)</span>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            ✓ Tokenized
          </span>
        </div>

        <p className="text-[11px] text-slate-400">
          SafeBound never stores raw card numbers or CVV codes on our servers. Transactions are processed directly through PCI-DSS Level 1 certified Razorpay gateways.
        </p>
      </div>

      {/* 4. Data Privacy & Account Deletion */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
          Personal Data Archive & Account Deletion
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => alert('Preparing complete JSON travel history archive... Download starting.')}
            className="flex-1 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-brand-600" />
            <span>Download My Travel Data Archive (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to permanently delete your SafeBound account and booking history?')) {
                alert('Account deletion requested. Support will process within 24 hours.');
              }
            }}
            className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs transition flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Delete Account</span>
          </button>
        </div>
      </div>

    </div>
  );
};
