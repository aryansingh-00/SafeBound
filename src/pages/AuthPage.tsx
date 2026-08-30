import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthSplitHero } from '../components/auth/AuthSplitHero';
import { LoginForm } from '../components/auth/LoginForm';
import { SignupForm } from '../components/auth/SignupForm';
import { Send, ArrowLeft } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initial mode from path or prop
  const isSignupPath = location.pathname.includes('signup');
  const [mode, setMode] = useState<'login' | 'signup'>(isSignupPath ? 'signup' : 'login');

  return (
    <div className="min-h-screen bg-[#FBFBFE] flex flex-col lg:flex-row">
      
      {/* 1. Left Split-Screen Hero */}
      <AuthSplitHero />

      {/* 2. Right Form Container */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold transition">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Login / Sign Up Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`px-4 py-1.5 rounded-lg transition ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`px-4 py-1.5 rounded-lg transition ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Auth Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card my-auto">
          {mode === 'login' ? (
            <LoginForm
              onSwitchToSignup={() => setMode('signup')}
              onOpenForgotPassword={() => navigate('/forgot-password')}
            />
          ) : (
            <SignupForm
              onSwitchToLogin={() => setMode('login')}
            />
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-slate-400 font-medium pt-6">
          SafeBound Autonomous Travel Commerce • 256-Bit Escrow Secured
        </div>

      </div>

    </div>
  );
};
