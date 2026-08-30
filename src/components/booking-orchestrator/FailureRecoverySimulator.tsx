import React from 'react';
import { AlternativeApprovalOption } from '../../backend/booking-orchestrator/bookingTypes';
import { 
  AlertTriangle, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  RotateCw 
} from 'lucide-react';

interface FailureRecoverySimulatorProps {
  proposal?: AlternativeApprovalOption;
  onApproveAlternative: () => void;
  approving: boolean;
}

export const FailureRecoverySimulator: React.FC<FailureRecoverySimulatorProps> = ({
  proposal,
  onApproveAlternative,
  approving,
}) => {
  if (!proposal || proposal.status === 'APPROVED') return null;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-7 border border-amber-500/40 space-y-5 text-white shadow-card animate-fadeIn">
      
      {/* Alert Header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px] border border-amber-500/30">
              RECOVERY AGENT ACTIVE
            </span>
            <h3 className="text-sm font-extrabold text-white">
              Supplier Inventory Disruption Resolved by Autonomous Recovery
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            The original Gun Hill Cable Car slot encountered maintenance. SafeBound's Recovery Agent negotiated an equivalent VIP replacement.
          </p>
        </div>
      </div>

      {/* Replacement Card */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <span className="text-[10px] text-slate-400 uppercase">Proposed Alternative Service:</span>
            <h4 className="font-extrabold text-brand-300 text-sm">{proposal.replacementServiceTitle}</h4>
          </div>

          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 self-start sm:self-auto">
            ✓ 0 Extra Charge (Covered)
          </span>
        </div>

        <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
          <strong className="text-slate-200">Why Selected:</strong> {proposal.whyChosen}
        </p>
      </div>

      {/* Approval CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <span className="text-[11px] text-slate-400 font-mono">
          Awaiting 1-Click User Confirmation to Rebook:
        </span>

        <button
          type="button"
          disabled={approving}
          onClick={onApproveAlternative}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Check className={`w-4 h-4 ${approving ? 'animate-spin' : ''}`} />
          <span>{approving ? 'Authorizing Rebooking...' : 'Approve Alternative & Rebook'}</span>
        </button>
      </div>

    </div>
  );
};
