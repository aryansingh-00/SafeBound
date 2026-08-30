import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';
import { AuthSplitHero } from '../components/auth/AuthSplitHero';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FBFBFE] flex flex-col lg:flex-row">
      <AuthSplitHero />

      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 max-w-xl mx-auto w-full">
        <div></div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card my-auto">
          <ForgotPasswordForm onBackToLogin={() => navigate('/login')} />
        </div>

        <div className="text-center text-[11px] text-slate-400 font-medium pt-6">
          SafeBound Autonomous Travel Commerce • Password Recovery
        </div>
      </div>
    </div>
  );
};
