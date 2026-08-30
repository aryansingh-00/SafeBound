import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the SafeBound Terms and Privacy Policy.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/onboarding');
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Create your SafeBound account ✨
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Join thousands of smart travellers experiencing autonomous AI trip planning.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Full Name</label>
          <div className="relative flex items-center">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aryan Singh"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="aryan@safebound.ai"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Password</label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition"
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

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700">Confirm Password</label>
          <div className="relative flex items-center">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-brand-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start pt-1">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 text-brand-600 rounded border-slate-300 focus:ring-brand-500 accent-brand-600 shrink-0"
          />
          <label htmlFor="agreeTerms" className="ml-2 text-[11px] text-slate-600 cursor-pointer leading-tight">
            I agree to SafeBound's <span className="font-bold text-brand-600 underline">Terms of Service</span> and <span className="font-bold text-brand-600 underline">Privacy Policy</span>.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-brand-600/30 transition flex items-center justify-center gap-2 mt-2"
        >
          <span>{loading ? 'Creating Account...' : 'Continue to Personalization'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>

      {/* Switch to Login */}
      <div className="text-center pt-2 text-xs text-slate-500 font-medium">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-extrabold text-brand-600 hover:text-brand-700 hover:underline"
        >
          Log In
        </button>
      </div>

    </div>
  );
};
