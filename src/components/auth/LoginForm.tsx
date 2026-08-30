import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onOpenForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToSignup,
  onOpenForgotPassword,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('aryan@safebound.ai');
  const [password, setPassword] = useState('safebound2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Welcome back to SafeBound 👋
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Access your AI travel command center, live bookings and saved plans.
        </p>
      </div>

      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-2xs transition flex items-center justify-center gap-2.5"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-200 w-full"></div>
        <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Or with email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Email Input */}
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

        {/* Password Input */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <button
              type="button"
              onClick={onOpenForgotPassword}
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500 accent-brand-600"
          />
          <label htmlFor="rememberMe" className="ml-2 text-xs font-medium text-slate-600 cursor-pointer">
            Remember me on this device
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2"
        >
          <span>{loading ? 'Authenticating...' : 'Login to Dashboard'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>

      {/* Switch to Signup */}
      <div className="text-center pt-2 text-xs text-slate-500 font-medium">
        Don't have an account yet?{' '}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="font-extrabold text-brand-600 hover:text-brand-700 hover:underline"
        >
          Sign Up (Free)
        </button>
      </div>

    </div>
  );
};
