import React, { useState } from 'react';
import { BookingOrchestratorEngine } from '../../backend/booking-orchestrator/bookingOrchestratorEngine';
import { RecoveryApprovalService } from '../../backend/booking-orchestrator/recoveryApprovalService';
import { BookingAuditLogger } from '../../backend/booking-orchestrator/bookingAuditLogger';
import { 
  BookingAttemptRecord, 
  AlternativeApprovalOption, 
  BookingAuditEntry 
} from '../../backend/booking-orchestrator/bookingTypes';
import { BookingOrchestrationLiveMesh } from './BookingOrchestrationLiveMesh';
import { FailureRecoverySimulator } from './FailureRecoverySimulator';
import { AuditTrailViewer } from './AuditTrailViewer';
import { 
  Play, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ArrowRight, 
  RotateCw 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookingOrchestratorWorkspace: React.FC = () => {
  const [tripId] = useState('SB-TRIP-MUSSOORIE-4D');
  const [orchestrating, setOrchestrating] = useState(false);
  const [attemptRecord, setAttemptRecord] = useState<BookingAttemptRecord | null>(null);
  const [pendingProposal, setPendingProposal] = useState<AlternativeApprovalOption | undefined>(undefined);
  const [approving, setApproving] = useState(false);
  const [logs, setLogs] = useState<BookingAuditEntry[]>([]);

  const handleStartDemoOrchestration = async () => {
    setOrchestrating(true);
    setPendingProposal(undefined);

    // 1. Initialize attempt with idempotency key
    const initial = await BookingOrchestratorEngine.startBookingOrchestration({
      tripId,
      packageId: 'PKG_MUSSOORIE_4D',
      orderId: 'order_RZP_99210',
      paymentId: 'pay_RZP_881920',
      idempotencyKey: `IDEM_${Date.now()}`,
    });

    setAttemptRecord({ ...initial });
    setLogs(BookingAuditLogger.getAllLogs());

    // Step 1: Transport confirmed (after 500ms)
    await new Promise((r) => setTimeout(r, 600));
    const step1 = await BookingOrchestratorEngine.advanceSimulation(tripId, 1, false);
    if (step1) setAttemptRecord({ ...step1 });
    setLogs(BookingAuditLogger.getAllLogs());

    // Step 2: Hotel confirmed (after 600ms)
    await new Promise((r) => setTimeout(r, 600));
    const step2 = await BookingOrchestratorEngine.advanceSimulation(tripId, 2, false);
    if (step2) setAttemptRecord({ ...step2 });
    setLogs(BookingAuditLogger.getAllLogs());

    // Step 3: Transfer confirmed (after 600ms)
    await new Promise((r) => setTimeout(r, 600));
    const step3 = await BookingOrchestratorEngine.advanceSimulation(tripId, 3, false);
    if (step3) setAttemptRecord({ ...step3 });
    setLogs(BookingAuditLogger.getAllLogs());

    // Step 4: Activity Provider Fails -> Recovery Agent Discovers Alternative
    await new Promise((r) => setTimeout(r, 700));
    const step4 = await BookingOrchestratorEngine.advanceSimulation(tripId, 4, true);
    if (step4) setAttemptRecord({ ...step4 });
    setLogs(BookingAuditLogger.getAllLogs());

    const proposal = RecoveryApprovalService.getPendingProposal(tripId);
    setPendingProposal(proposal);
    setOrchestrating(false);
  };

  const handleApproveAlternative = async () => {
    setApproving(true);
    await new Promise((r) => setTimeout(r, 800));

    RecoveryApprovalService.approveAlternative(tripId);

    if (attemptRecord) {
      const updated = {
        ...attemptRecord,
        currentState: 'FULLY_CONFIRMED' as const,
        services: attemptRecord.services.map((s) =>
          s.type === 'ACTIVITY'
            ? {
                ...s,
                status: 'CONFIRMED' as const,
                providerName: 'Landour Heritage Nature Trail & Tea Tasting VIP Walk',
                bookingReference: 'ACT-REC-9942',
                failureReason: undefined,
              }
            : s
        ),
      };
      setAttemptRecord(updated);
    }

    setLogs(BookingAuditLogger.getAllLogs());
    setPendingProposal(undefined);
    setApproving(false);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Action Strip */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-white shadow-card">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-400" />
            <h3 className="text-base font-extrabold text-white">
              Deterministic Booking Orchestration Swarm
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Payment HMAC Verified ➔ Idempotency Locked ➔ 4-Agent Parallel Swarm ➔ Failure Recovery
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={orchestrating}
            onClick={handleStartDemoOrchestration}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-600/30 transition flex items-center gap-2 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${orchestrating ? 'animate-spin' : 'fill-white'}`} />
            <span>{orchestrating ? 'Orchestrating Domain Swarm...' : 'Run Buildathon Demo Transaction'}</span>
          </button>

          {attemptRecord?.currentState === 'FULLY_CONFIRMED' && (
            <Link
              to="/booking/success/SB-TRIP-MUSSOORIE-4D"
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <span>View Confirmed Vouchers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* 2. Visual Multi-Agent Live Mesh */}
      {attemptRecord && (
        <BookingOrchestrationLiveMesh
          services={attemptRecord.services}
          overallState={attemptRecord.currentState}
        />
      )}

      {/* 3. Autonomous Recovery Card (Triggered on simulated activity supplier disruption) */}
      <FailureRecoverySimulator
        proposal={pendingProposal}
        onApproveAlternative={handleApproveAlternative}
        approving={approving}
      />

      {/* 4. Immutable Audit Trail Telemetry Viewer */}
      <AuditTrailViewer logs={logs} />

    </div>
  );
};
