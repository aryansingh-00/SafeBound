import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Wallet, Calendar, Heart, ArrowRight } from 'lucide-react';

export const AIDestinationFinder: React.FC = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('Delhi (DEL)');
  const [budget, setBudget] = useState(30000);
  const [days, setDays] = useState(4);
  const [preference, setPreference] = useState('Mountains & Nature');

  const handleFind = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/plan-trip');
  };

  return (
    <section className="rounded-3xl bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-700 text-white p-6 sm:p-10 shadow-xl relative overflow-hidden">
      
      {/* Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>AI Concierge</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Can't decide where to go?
          </h2>
          <p className="text-xs sm:text-sm text-brand-100 font-medium leading-relaxed">
            Give SafeBound your budget, starting city and travel vibe. Our AI will evaluate 100+ parameters and build your complete itinerary.
          </p>
        </div>

        {/* 4-Field Interactive Planner Card */}
        <form onSubmit={handleFind} className="bg-white/10 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/20 shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Field 1: From */}
            <div className="p-3 bg-white rounded-2xl text-slate-800 space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-600" />
                <span>Starting From</span>
              </label>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full text-xs font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              />
            </div>

            {/* Field 2: Budget */}
            <div className="p-3 bg-white rounded-2xl text-slate-800 space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Wallet className="w-3 h-3 text-brand-600" />
                <span>Max Budget</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full text-xs font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              >
                <option value={15000}>₹15,000</option>
                <option value={30000}>₹30,000</option>
                <option value={45000}>₹45,000</option>
                <option value={70000}>₹70,000+</option>
              </select>
            </div>

            {/* Field 3: Days */}
            <div className="p-3 bg-white rounded-2xl text-slate-800 space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-brand-600" />
                <span>Trip Days</span>
              </label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full text-xs font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              >
                <option value={2}>2 Days (Weekend)</option>
                <option value={3}>3 Days</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
                <option value={7}>7+ Days</option>
              </select>
            </div>

            {/* Field 4: Preference */}
            <div className="p-3 bg-white rounded-2xl text-slate-800 space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Heart className="w-3 h-3 text-brand-600" />
                <span>Travel Vibe</span>
              </label>
              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full text-xs font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              >
                <option value="Mountains & Nature">Mountains & Nature</option>
                <option value="Beach & Relaxation">Beach & Relaxation</option>
                <option value="Culture & Forts">Culture & Forts</option>
                <option value="Wildlife Safari">Wildlife Safari</option>
              </select>
            </div>

          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-slate-50 text-brand-700 font-extrabold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>✨ Find My Destination</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};
