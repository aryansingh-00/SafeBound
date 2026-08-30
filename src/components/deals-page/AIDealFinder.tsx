import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Wallet, Calendar, Compass, ArrowRight, Bot } from 'lucide-react';

export const AIDealFinder: React.FC = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('Delhi (DEL)');
  const [budget, setBudget] = useState(30000);
  const [days, setDays] = useState(4);
  const [tripType, setTripType] = useState('Mountains');

  const handleHunt = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/plan-trip');
  };

  return (
    <section className="rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-700 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden my-6">
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-5">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider">
              <Bot className="w-4 h-4 text-amber-300" />
              <span>Autonomous Deal Hunter</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Let SafeBound hunt the deal for you.
            </h2>
            <p className="text-xs sm:text-sm text-brand-100 font-medium max-w-lg leading-relaxed">
              Tell us your budget and departure city. SafeBound will search live inventory and build the best-value combination.
            </p>
          </div>
        </div>

        {/* 4 Fields */}
        <form onSubmit={handleHunt} className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs text-slate-800">
            
            <div className="p-2.5 bg-white rounded-xl space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">From</label>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              />
            </div>

            <div className="p-2.5 bg-white rounded-xl space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Max Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              >
                <option value={15000}>₹15,000</option>
                <option value={25000}>₹25,000</option>
                <option value={35000}>₹35,000</option>
                <option value={50000}>₹50,000+</option>
              </select>
            </div>

            <div className="p-2.5 bg-white rounded-xl space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Days</label>
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              >
                <option value={3}>3 Days</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
                <option value={7}>7+ Days</option>
              </select>
            </div>

            <div className="p-2.5 bg-white rounded-xl space-y-1">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Trip Type</label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full font-bold text-slate-900 bg-transparent border-none p-0 focus:outline-none"
              >
                <option value="Mountains">Mountains</option>
                <option value="Beach">Beach</option>
                <option value="Nature">Nature</option>
                <option value="Culture">Culture</option>
              </select>
            </div>

          </div>

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-white hover:bg-slate-50 text-brand-700 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>✨ Find My Deal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};
