import React from 'react';
import { PendingAIAction } from '../../backend/security/securityTypes';
import { AlertTriangle, Bot, CheckCircle2, XCircle } from 'lucide-react';

interface AIActionApprovalModalProps {
  action: PendingAIAction;
  onApprove: (actionId: string) => void;
  onReject: (actionId: string) => void;
}

export const AIActionApprovalModal: React.FC<AIActionApprovalModalProps> = ({
  action,
  onApprove,
  onReject,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-amber-500/50 shadow-2xl shadow-amber-500/10 space-y-5 p-6 sm:p-7 text-white">

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">User Approval Required</h3>
            <p className="text-xs text-amber-300 mt-0.5">SafeBound is blocking this AI action until you approve.</p>
          </div>
        </div>

        {/* Agent info */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Bot className="w-3.5 h-3.5 text-brand-400" />
            <span className="font-mono font-bold">{action.agent}</span>
            <span>is requesting:</span>
          </div>
          <p className="font-extrabold text-white text-sm">{action.description}</p>
        </div>

        {/* Cost impact */}
        {action.additionalCostRupees > 0 && (
          <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-xs space-y-1">
            <p className="font-bold text-rose-300">💸 This change has a cost impact:</p>
            <p className="text-2xl font-extrabold text-white">+₹{action.additionalCostRupees.toLocaleString('en-IN')}</p>
            <p className="text-slate-400">SafeBound will never automatically spend more of your money without approval.</p>
          </div>
        )}

        {/* Auth chain visual */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-mono space-y-0.5 text-slate-500">
          <p className="text-emerald-400 font-bold">✓ AI can think and recommend</p>
          <p className="text-emerald-400 font-bold">✓ Backend validated the action</p>
          <p className="text-emerald-400 font-bold">✓ Business rules checked</p>
          <p className="text-amber-400 font-bold">⏳ Waiting: User approval (YOU)</p>
          <p className="text-slate-600">○ System executes</p>
          <p className="text-slate-600">○ Action logged in audit trail</p>
        </div>

        {/* CTA */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => onReject(action.actionId)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 transition"
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            Reject
          </button>
          <button
            onClick={() => onApprove(action.actionId)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-600/20 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};
