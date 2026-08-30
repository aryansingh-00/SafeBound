import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      <button
        type="button"
        onClick={onBackToLogin}
        className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Login</span>
      </button>

      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Reset your password 🔑
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Enter your registered email address to receive a secure password recovery link.
        </p>
      </div>

      {submitted ? (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fadeIn">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm text-emerald-950">Password Reset Link Sent</h4>
            <p className="text-xs text-emerald-800 font-medium">
              We've dispatched password reset instructions to <strong className="font-bold">{email}</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={onBackToLogin}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
          >
            Return to Login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Sending Link...' : 'Send Reset Link'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

    </div>
  );
};
