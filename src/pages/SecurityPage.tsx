import React, { useState, useEffect } from 'react';
import { AuthEngine } from '../backend/security/authEngine';
import { AuditLogger } from '../backend/security/auditLogger';
import { ActionPolicyRegistry } from '../backend/security/actionPolicyRegistry';
import { AuthorizationEngine } from '../backend/security/authorizationEngine';
import { PendingAIAction, TravellerSnapshot, SecurityMetrics, AuditEvent, ActionPolicy } from '../backend/security/securityTypes';
import { TravellerConfirmCard } from '../components/security/TravellerConfirmCard';
import { AIActionApprovalModal } from '../components/security/AIActionApprovalModal';
import { SecurityMetricsDash } from '../components/security/SecurityMetricsDash';
import { AuditTrailFeed } from '../components/security/AuditTrailFeed';
import {
  Shield,
  Bot,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  Hotel,
  Shuffle,
  RefreshCw
} from 'lucide-react';

export const SecurityPage: React.FC = () => {
  const [snapshot, setSnapshot] = useState<TravellerSnapshot | undefined>();
  const [pendingAction, setPendingAction] = useState<PendingAIAction | null>(null);
  const [metrics, setMetrics] = useState<SecurityMetrics>(AuditLogger.getMetrics());
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [policies] = useState<ActionPolicy[]>(ActionPolicyRegistry.getAllPolicies());
  const [lastResult, setLastResult] = useState<string>('');

  // Ensure demo session + seed audit log
  useEffect(() => {
    AuthEngine.ensureDemoSession();
    AuditLogger.seedDemoEvents();
    refresh();
  }, []);

  const refresh = () => {
    setMetrics(AuditLogger.getMetrics());
    setAuditEvents(AuditLogger.getLog(30));
  };

  const profile = AuthEngine.getDemoTraveller();

  const handleConfirmTraveller = (snap: Omit<TravellerSnapshot, 'snapshotId' | 'takenAt'>) => {
    const full = AuthorizationEngine.createTravellerSnapshot('SB-TRIP-MUSSOORIE-4D', profile);
    setSnapshot(full);
    refresh();
  };

  const handleSimulateAuto = () => {
    const result = ActionPolicyRegistry.requestAction({
      tripId: 'SB-TRIP-MUSSOORIE-4D',
      agent: 'LiveMonitoringAgent',
      action: 'adjust_transfer_pickup',
      description: 'Reschedule chauffeur pickup from 12:15 PM to 01:35 PM due to train delay.',
      additionalCostRupees: 0,
    });
    setLastResult(result.allowed ? '✅ Auto-executed: Chauffeur rescheduled. No approval needed.' : '⏳ Queued for approval.');
    refresh();
  };

  const handleSimulateHotelReplace = () => {
    const result = ActionPolicyRegistry.requestAction({
      tripId: 'SB-TRIP-MUSSOORIE-4D',
      agent: 'RecoveryAgent',
      action: 'replace_hotel',
      description: 'Replace Cedar View Resort with Mountain Dew Lodge — original hotel overbooked.',
      additionalCostRupees: 2000,
    });
    if (result.requiresApproval) {
      const pending = ActionPolicyRegistry.getPendingActions()[0];
      if (pending) setPendingAction(pending);
    }
    refresh();
  };

  const handleApprove = (id: string) => {
    ActionPolicyRegistry.approveAction(id);
    setPendingAction(null);
    setLastResult('✅ Hotel replacement approved. Recovery Agent will now rebook.');
    refresh();
  };

  const handleReject = (id: string) => {
    ActionPolicyRegistry.rejectAction(id);
    setPendingAction(null);
    setLastResult('❌ Hotel replacement rejected. Original booking remains active.');
    refresh();
  };

  const handleFailedLogin = () => {
    AuditLogger.incrementFailedLogin();
    refresh();
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8">

      {/* AI Action Approval Modal */}
      {pendingAction && (
        <AIActionApprovalModal
          action={pendingAction}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {/* Page Header */}
      <div className="max-w-5xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
          <Shield className="w-3.5 h-3.5" />
          <span>Bounded Agency — Security, Authorization & Traveller Identity</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Security Hub</h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          SafeBound uses bounded agency. The AI can reason and coordinate, but it cannot independently access money, 
          sensitive data, or unrestricted booking operations. Every consequential action passes through authorization, 
          business rules, and verification.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">

        {/* Bounded Agency Flow */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-800">
            <Bot className="w-5 h-5 text-brand-400" />
            <h3 className="text-sm font-extrabold text-white">Bounded Agency Chain</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {[
              { label: 'AI THINKS', color: 'text-purple-300 bg-purple-500/10 border-purple-500/30' },
              { label: 'AI RECOMMENDS', color: 'text-purple-300 bg-purple-500/10 border-purple-500/30' },
              { label: 'BACKEND VALIDATES', color: 'text-sky-300 bg-sky-500/10 border-sky-500/30' },
              { label: 'USER APPROVES ✱', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30' },
              { label: 'SYSTEM EXECUTES', color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' },
              { label: 'ACTION LOGGED', color: 'text-slate-300 bg-slate-500/10 border-slate-500/30' },
            ].map(({ label, color }, i, arr) => (
              <React.Fragment key={label}>
                <span className={`px-2.5 py-1 rounded-full border font-bold text-[10px] ${color}`}>{label}</span>
                {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-slate-600" />}
              </React.Fragment>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-3 font-mono">✱ Only when action policy requires user approval (e.g. cost impact or hotel change)</p>
        </div>

        {/* Security Metrics */}
        <SecurityMetricsDash metrics={metrics} />

        {/* Traveller Confirm Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-400" /> Traveller Details Confirmation Gate
          </h3>
          <TravellerConfirmCard
            profile={profile}
            tripId="SB-TRIP-MUSSOORIE-4D"
            onConfirm={handleConfirmTraveller}
            alreadyConfirmed={!!snapshot}
          />
        </div>

        {/* Buildathon Demo Simulator */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Play className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-extrabold text-white">Buildathon Demo — AI Action Authorization</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleSimulateAuto}
              className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 hover:border-emerald-400 text-left space-y-1.5 transition group"
            >
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <Shuffle className="w-4 h-4" /> Auto-Execute
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">Adjust transfer pickup (+₹0) — AI acts automatically per policy.</p>
            </button>

            <button
              onClick={handleSimulateHotelReplace}
              className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 hover:border-amber-400 text-left space-y-1.5 transition group"
            >
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs">
                <Hotel className="w-4 h-4" /> User Approval Required
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">Replace hotel (+₹2,000) — AI blocked until you approve.</p>
            </button>

            <button
              onClick={handleFailedLogin}
              className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 hover:border-rose-400 text-left space-y-1.5 transition group"
            >
              <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                <Shield className="w-4 h-4" /> Simulate Threat
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">Failed login attempt — suspicious activity logged.</p>
            </button>
          </div>

          {lastResult && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200">
              {lastResult}
            </div>
          )}

          <button onClick={refresh} className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-300 transition">
            <RefreshCw className="w-3 h-3" /> Refresh metrics & audit log
          </button>
        </div>

        {/* Action Policy Registry */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <CheckCircle2 className="w-5 h-5 text-brand-400" />
            <h3 className="text-sm font-extrabold text-white">Action Policy Registry</h3>
          </div>
          <div className="space-y-2.5">
            {policies.map((policy) => (
              <div key={policy.action} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white">{policy.label}</span>
                  {policy.requiresUserApproval ? (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-[9px] font-bold">USER APPROVAL</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[9px] font-bold">AUTO</span>
                  )}
                </div>
                <p className="text-slate-400 leading-relaxed">{policy.description}</p>
                <p className="text-slate-600 font-mono text-[10px]">Max additional cost: ₹{policy.maxAdditionalCostRupees}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Trail */}
        <AuditTrailFeed events={auditEvents} />

      </div>
    </div>
  );
};
