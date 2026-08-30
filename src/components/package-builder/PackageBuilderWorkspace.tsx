import React, { useState } from 'react';
import { PackageBuilderEngine } from '../../backend/package-builder/packageBuilderEngine';
import { PackageOptimizerEngine } from '../../backend/optimizer/packageOptimizerEngine';
import { VersionedTripPackage, OptimizationMode, PackageOptimizationDiff } from '../../backend/package-builder/packageBuilderTypes';
import { JourneyGraphTimeline } from './JourneyGraphTimeline';
import { OptimizationControlPanel } from './OptimizationControlPanel';
import { PackageDiffViewer } from './PackageDiffViewer';
import { Layers, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PackageBuilderWorkspace: React.FC = () => {
  const [activePackage, setActivePackage] = useState<VersionedTripPackage>(() =>
    PackageBuilderEngine.buildPackage({ destination: 'Mussoorie' })
  );
  const [selectedMode, setSelectedMode] = useState<OptimizationMode>('BEST_VALUE');
  const [running, setRunning] = useState(false);
  const [optimizationDiff, setOptimizationDiff] = useState<PackageOptimizationDiff | null>(null);
  const [optimizedCandidate, setOptimizedCandidate] = useState<VersionedTripPackage | null>(null);
  const [appliedNotice, setAppliedNotice] = useState(false);

  const handleRunOptimization = () => {
    setRunning(true);
    setTimeout(() => {
      const { optimizedPackage, diff } = PackageOptimizerEngine.optimizePackage(activePackage, selectedMode);
      setOptimizedCandidate(optimizedPackage);
      setOptimizationDiff(diff);
      setRunning(false);
    }, 600);
  };

  const handleApplyOptimization = () => {
    if (optimizedCandidate) {
      setActivePackage(optimizedCandidate);
      setOptimizationDiff(null);
      setOptimizedCandidate(null);
      setAppliedNotice(true);
      setTimeout(() => setAppliedNotice(false), 3500);
    }
  };

  return (
    <div className="space-y-6">
      
      {appliedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>✓ Package version locked to v{activePackage.version}! Total payable: ₹{activePackage.pricing.finalTotal.toLocaleString('en-IN')}.</span>
          </div>
          <Link
            to="/booking/review"
            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-extrabold"
          >
            Proceed to Checkout ➔
          </Link>
        </div>
      )}

      {/* Package Header KPI Strip */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-mono font-bold text-[10px] border border-brand-500/30">
              PACKAGE {activePackage.packageId} (v{activePackage.version})
            </span>
            <span className="text-slate-400">•</span>
            <h3 className="text-lg font-extrabold text-white">🏔️ {activePackage.destination} Escape (4 Days)</h3>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Whole-journey multi-modal coordination • 2 Travellers • Verified Timing Compatibility
          </p>
        </div>

        <div className="flex items-center gap-4 self-end md:self-auto font-mono">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block uppercase">Authoritative Price:</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              ₹{activePackage.pricing.finalTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <Link
            to="/booking/review"
            className="px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center gap-1.5"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 1. Visual Journey Graph Timeline */}
      <JourneyGraphTimeline nodes={activePackage.timeline} />

      {/* 2. Strategy Selector Panel */}
      <OptimizationControlPanel
        selectedMode={selectedMode}
        onSelectMode={setSelectedMode}
        onRunOptimization={handleRunOptimization}
        running={running}
      />

      {/* 3. Side-by-side Diff Viewer if Optimization Run */}
      {optimizationDiff && optimizedCandidate && (
        <PackageDiffViewer
          originalPkg={activePackage}
          optimizedPkg={optimizedCandidate}
          diff={optimizationDiff}
          onApplyOptimization={handleApplyOptimization}
          onKeepOriginal={() => {
            setOptimizationDiff(null);
            setOptimizedCandidate(null);
          }}
        />
      )}

    </div>
  );
};
