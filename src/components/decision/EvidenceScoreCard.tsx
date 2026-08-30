import React from 'react';
import { CandidateEvaluationEvidence } from '../../backend/decision/decisionTypes';
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Wallet, 
  CloudSun, 
  Train, 
  Building, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EvidenceScoreCardProps {
  candidate: CandidateEvaluationEvidence;
  rank: number;
  onSelectPackage?: (pkgId: string) => void;
}

export const EvidenceScoreCard: React.FC<EvidenceScoreCardProps> = ({
  candidate,
  rank,
  onSelectPackage,
}) => {
  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition space-y-4 shadow-card text-white flex flex-col justify-between">
      
      <div className="space-y-3">
        {/* Header: Destination & Match Score */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-mono font-extrabold flex items-center justify-center">
                #{rank}
              </span>
              <h3 className="text-lg font-extrabold text-white">{candidate.destination}</h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium block">
              {candidate.state} • 4-Day Verified Corridor
            </span>
          </div>

          <div className="text-right">
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              {candidate.totalScore}%
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-mono font-bold">
              Match Score
            </span>
          </div>
        </div>

        {/* Why Explanation Callout */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
          <strong className="text-brand-300 font-bold block mb-1">
            Why SafeBound Shortlisted {candidate.destination}:
          </strong>
          {candidate.whyExplanation}
        </div>

        {/* Multi-Factor Score Meters */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Supporting Evidence Signals
          </span>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5">
              <span className="text-slate-400 flex items-center gap-1">
                <Wallet className="w-3 h-3 text-emerald-400" />
                <span>Budget Fit ({candidate.scores.budgetFit}%)</span>
              </span>
              <span className="text-slate-200 font-bold block truncate text-[10px]">
                {candidate.evidenceFactors.budgetAssessment}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5">
              <span className="text-slate-400 flex items-center gap-1">
                <CloudSun className="w-3 h-3 text-sky-400" />
                <span>Weather ({candidate.scores.weatherFit}%)</span>
              </span>
              <span className="text-slate-200 font-bold block truncate text-[10px]">
                {candidate.evidenceFactors.weatherAssessment}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5">
              <span className="text-slate-400 flex items-center gap-1">
                <Train className="w-3 h-3 text-brand-400" />
                <span>Transit ({candidate.scores.travelConvenience}%)</span>
              </span>
              <span className="text-slate-200 font-bold block truncate text-[10px]">
                {candidate.evidenceFactors.transportAssessment}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-0.5">
              <span className="text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-400" />
                <span>Safety ({candidate.scores.safetySignals}%)</span>
              </span>
              <span className="text-slate-200 font-bold block truncate text-[10px]">
                {candidate.evidenceFactors.safetyAssessment}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Package CTA */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-mono">Itemized Package Total:</span>
          <span className="text-base font-extrabold text-white font-mono">
            ₹{candidate.packageEstimatedPrice.toLocaleString('en-IN')}
          </span>
        </div>

        <Link
          to={`/package/pkg-${candidate.destination.toLowerCase()}`}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <span>Inspect Package</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
