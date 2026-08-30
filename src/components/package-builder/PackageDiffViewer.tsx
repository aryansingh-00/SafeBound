import React from 'react';
import { PackageOptimizationDiff, VersionedTripPackage } from '../../backend/package-builder/packageBuilderTypes';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building, 
  Train, 
  Car, 
  Ticket, 
  RotateCcw,
  Check
} from 'lucide-react';

interface PackageDiffViewerProps {
  originalPkg: VersionedTripPackage;
  optimizedPkg: VersionedTripPackage;
  diff: PackageOptimizationDiff;
  onApplyOptimization: () => void;
  onKeepOriginal: () => void;
}

export const PackageDiffViewer: React.FC<PackageDiffViewerProps> = ({
  originalPkg,
  optimizedPkg,
  diff,
  onApplyOptimization,
  onKeepOriginal,
}) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-6 text-white shadow-card animate-fadeIn">
      
      {/* Top Banner: Net Savings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-extrabold">
              Optimization Found: Save ₹{diff.netSavings.toLocaleString('en-IN')}!
            </h3>
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {diff.userFacingExplanation}
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs text-slate-400 font-mono">New Package Total:</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono">
            ₹{diff.optimizedPrice.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Itemized Changes Diff Table */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-mono">
          Itemized Component Modifications (v{diff.originalVersion} ➔ v{diff.optimizedVersion}):
        </span>

        <div className="space-y-2.5">
          {diff.changes.map((ch, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.2 rounded bg-slate-800 text-brand-300 font-bold text-[10px]">
                    {ch.serviceType}
                  </span>
                  <span className="text-slate-400 line-through text-[11px]">{ch.originalTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-white font-bold text-xs">{ch.newTitle}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">{ch.rationale}</p>
              </div>

              <span className="text-emerald-400 font-extrabold text-sm self-end sm:self-auto shrink-0">
                -₹{ch.savingsDelta.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* User Decision Action Buttons */}
      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-end gap-3">
        <button
          type="button"
          onClick={onKeepOriginal}
          className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition"
        >
          Keep Original Package (v{originalPkg.version})
        </button>

        <button
          type="button"
          onClick={onApplyOptimization}
          className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Apply Optimization & Lock v{optimizedPkg.version}</span>
        </button>
      </div>

    </div>
  );
};
