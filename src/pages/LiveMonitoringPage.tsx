import React from 'react';
import { LiveMonitoringSimulator } from '../components/live-monitoring/LiveMonitoringSimulator';
import { Activity, ShieldCheck, Zap, Layers, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LiveMonitoringPage: React.FC = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Activity className="w-3.5 h-3.5" />
              <span>Post-Booking Autonomous Sentinel</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Trip Monitoring & Recovery Engine
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-2xl leading-relaxed">
              Booking is not the end of the journey — it is the beginning of SafeBound's responsibility. The system monitors transit schedules, predicts downstream collisions, and recovers your itinerary automatically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/booking-orchestrator"
              className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
            >
              Booking Orchestrator
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl border border-slate-700 transition"
            >
              Ops Console
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Core Architecture Axioms */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Telemetry Change Detection</h3>
          <p className="text-slate-400 leading-relaxed">
            Continuous background polling monitors IRCTC GDS, flight radars, and IMD Doppler alerts, triggering events only when changes exceed meaningful thresholds.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Cascading Downstream Impact</h3>
          <p className="text-slate-400 leading-relaxed">
            SafeBound never alerts you for trivial noise. It simulates your entire schedule to verify whether a train delay causes a chauffeur pickup conflict or missed hotel check-in.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-white text-sm">Policy-Driven Recovery</h3>
          <p className="text-slate-400 leading-relaxed">
            Finds replacement options with preference for ₹0 extra cost, reschedules drivers, synchronizes vouchers, and notifies you with clear explanations.
          </p>
        </div>
      </div>

      {/* Interactive Simulator */}
      <div className="max-w-7xl mx-auto">
        <LiveMonitoringSimulator />
      </div>

    </div>
  );
};
