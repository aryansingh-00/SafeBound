import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProblemStatement } from '../components/demo/ProblemStatement';
import { DemoSequencer } from '../components/demo/DemoSequencer';
import { ArchitectureDiagram } from '../components/demo/ArchitectureDiagram';
import { JudgeQAPanel } from '../components/demo/JudgeQAPanel';
import { PitchScript } from '../components/demo/PitchScript';
import {
  Rocket,
  ExternalLink,
  Map,
  FlaskConical,
  Shield,
  BookOpen,
  Activity,
  CreditCard,
  Bot
} from 'lucide-react';

const QUICK_LINKS = [
  { to: '/decision-agent',    icon: Bot,          label: '🎯 Decision Agent',        color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { to: '/package-builder',   icon: Map,           label: '📦 Package Builder',       color: 'text-sky-600 bg-sky-50 border-sky-200' },
  { to: '/booking-orchestrator', icon: Rocket,     label: '🛡️ Booking Orchestrator',  color: 'text-brand-600 bg-brand-50 border-brand-200' },
  { to: '/checkout/SB-TRIP-MUSSOORIE-4D', icon: CreditCard, label: '💳 Razorpay Checkout', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { to: '/live-monitoring',   icon: Activity,      label: '📡 Live Monitoring',       color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { to: '/trips/SB-TRIP-MUSSOORIE-4D/itinerary', icon: BookOpen, label: '📋 Smart Itinerary', color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { to: '/security',          icon: Shield,        label: '🔐 Security Hub',          color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { to: '/testing',           icon: FlaskConical,  label: '🧪 Test Lab',              color: 'text-teal-600 bg-teal-50 border-teal-200' },
];

export const DemoPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-10">

      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center space-y-5 py-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
          <Rocket className="w-3.5 h-3.5" />
          <span>SafeBound Buildathon — Final Demo & Pitch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Plan. Pay. Book.{' '}
          <span className="text-brand-400">Adapt.</span>
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          SafeBound is an AI Travel Commerce Agent that understands the dependencies between travel bookings and continuously manages the trip when reality changes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://safe-bound.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-sm shadow-lg shadow-brand-600/30 transition"
          >
            <ExternalLink className="w-4 h-4" /> View Live Demo
          </a>
          <a
            href="https://github.com/aryansingh-00/SafeBound"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition"
          >
            GitHub Repo →
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">

        {/* 1. Problem */}
        <section className="space-y-3">
          <SectionLabel number="01" label="The Problem" />
          <ProblemStatement />
        </section>

        {/* 2. Interactive Demo */}
        <section className="space-y-3">
          <SectionLabel number="02" label={`Interactive Demo — Step ${currentStep}/9`} />
          <DemoSequencer onStepChange={setCurrentStep} />
        </section>

        {/* 3. Architecture */}
        <section className="space-y-3">
          <SectionLabel number="03" label="Full Agent Architecture" />
          <ArchitectureDiagram />
        </section>

        {/* 4. Judge Q&A */}
        <section className="space-y-3">
          <SectionLabel number="04" label="Judge Q&A — Ready Answers" />
          <JudgeQAPanel />
        </section>

        {/* 5. Pitch Script + USPs */}
        <section className="space-y-3">
          <SectionLabel number="05" label="30-Second Pitch & USPs" />
          <PitchScript />
        </section>

        {/* 6. Quick links to all 27 pages */}
        <section className="space-y-3">
          <SectionLabel number="06" label="Explore All 28 Steps" />
          <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {QUICK_LINKS.map(({ to, label, color }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition hover:brightness-105 ${color}`}
                >
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center py-8 space-y-2">
          <p className="text-sm font-extrabold text-white">
            "Existing platforms help you book a trip.
          </p>
          <p className="text-base font-extrabold text-brand-400">
            SafeBound helps you manage the trip when reality changes."
          </p>
          <p className="text-xs text-slate-500 font-mono mt-4">
            Built in 28 steps · {new Date().getFullYear()} · Buildathon
          </p>
        </div>

      </div>
    </div>
  );
};

const SectionLabel: React.FC<{ number: string; label: string }> = ({ number, label }) => (
  <div className="flex items-center gap-3">
    <span className="font-mono text-[11px] font-extrabold text-brand-400 bg-brand-500/10 border border-brand-500/30 px-2 py-0.5 rounded-lg">{number}</span>
    <h2 className="text-lg font-extrabold text-white">{label}</h2>
  </div>
);
