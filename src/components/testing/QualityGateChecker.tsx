import React from 'react';
import { QualityGate } from '../../backend/testing/testingTypes';
import { CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface QualityGateCheckerProps {
  gates: QualityGate[];
}

export const QualityGateChecker: React.FC<QualityGateCheckerProps> = ({ gates }) => {
  const allPassed = gates.every((g) => g.passed);
  const passCount = gates.filter((g) => g.passed).length;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card text-white space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-brand-400" />
          <h3 className="text-sm font-extrabold text-white">Quality Gates</h3>
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-extrabold ${allPassed ? 'text-emerald-400' : 'text-rose-400'}`}>
          {allPassed
            ? <><CheckCircle2 className="w-4 h-4" /> {passCount}/{gates.length} — READY TO DEPLOY</>
            : <><XCircle className="w-4 h-4" /> {passCount}/{gates.length} — BLOCKED</>}
        </div>
      </div>

      <div className="space-y-2">
        {gates.map((gate) => (
          <div
            key={gate.id}
            className={`flex items-start gap-3 p-3 rounded-2xl text-xs border ${
              gate.passed
                ? 'bg-emerald-950/20 border-emerald-500/30'
                : 'bg-rose-950/20 border-rose-500/30'
            }`}
          >
            {gate.passed
              ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              : <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
            <div className="space-y-0.5">
              <p className="font-bold text-white">{gate.label}</p>
              <p className="text-slate-400 text-[11px] leading-relaxed">{gate.description}</p>
            </div>
          </div>
        ))}
      </div>

      {allPassed && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 text-center font-extrabold">
          🚀 All {gates.length} quality gates passed. SafeBound is deployment-ready.
        </div>
      )}
    </div>
  );
};
