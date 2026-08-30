import { AlternativeApprovalOption, FailureClassification } from './bookingTypes';
import { BookingAuditLogger } from './bookingAuditLogger';
import { EventBus } from '../events/eventBus';

export class RecoveryApprovalService {
  private static pendingApprovals = new Map<string, AlternativeApprovalOption>();

  /**
   * Classifies error to determine if retry is possible or recovery is required.
   */
  public static classifyError(errorMsg: string): FailureClassification {
    const msg = errorMsg.toLowerCase();
    if (msg.includes('timeout') || msg.includes('timed out') || msg.includes('network')) {
      return 'RETRYABLE_TIMEOUT';
    }
    if (msg.includes('rate limit') || msg.includes('429')) {
      return 'RETRYABLE_RATE_LIMIT';
    }
    if (msg.includes('sold out') || msg.includes('unavailable') || msg.includes('overbooked')) {
      return 'PERMANENT_INVENTORY_SOLD_OUT';
    }
    return 'PERMANENT_POLICY_REJECTION';
  }

  /**
   * Creates an alternative proposal awaiting user 1-click approval.
   */
  public static createAlternativeProposal(params: {
    tripId: string;
    failedServiceType: 'HOTEL' | 'TRANSFER' | 'ACTIVITY' | 'TRANSPORT';
    originalTitle: string;
    replacementTitle: string;
    priceDifference: number;
    whyChosen: string;
  }): AlternativeApprovalOption {
    const alternativeId = `ALT_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

    const proposal: AlternativeApprovalOption = {
      alternativeId,
      tripId: params.tripId,
      failedServiceType: params.failedServiceType,
      originalServiceTitle: params.originalTitle,
      replacementServiceTitle: params.replacementTitle,
      priceDifference: params.priceDifference,
      refundCreditAmount: Math.max(0, -params.priceDifference),
      whyChosen: params.whyChosen,
      newTokenRef: `REC_TOK_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      status: 'PENDING_USER_APPROVAL',
    };

    this.pendingApprovals.set(params.tripId, proposal);

    BookingAuditLogger.log({
      tripId: params.tripId,
      agentOrService: 'Recovery Agent',
      action: 'Discovered Alternative Proposal',
      provider: 'SafeBound Recovery Engine',
      result: 'RECOVERY',
      details: `Generated proposal ${alternativeId}: ${params.replacementTitle} (${params.priceDifference <= 0 ? `-₹${Math.abs(params.priceDifference)} Refund` : `+₹${params.priceDifference}`}).`,
    });

    EventBus.publish({
      id: `evt_alt_${Date.now()}`,
      type: 'USER_APPROVAL_REQUIRED',
      tripId: params.tripId,
      agent: 'Recovery Agent',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: proposal,
    });

    return proposal;
  }

  /**
   * Approves and executes the proposed replacement.
   */
  public static approveAlternative(tripId: string): { approved: boolean; alternative?: AlternativeApprovalOption } {
    const proposal = this.pendingApprovals.get(tripId);
    if (!proposal) return { approved: false };

    proposal.status = 'APPROVED';

    BookingAuditLogger.log({
      tripId,
      agentOrService: 'Booking Orchestrator',
      action: 'User Approved Alternative Replacement',
      provider: 'SafeBound Autonomous Rebooker',
      result: 'SUCCESS',
      details: `Replacement ${proposal.replacementServiceTitle} authorized. Token ${proposal.newTokenRef} locked.`,
    });

    EventBus.publish({
      id: `evt_app_${Date.now()}`,
      type: 'ALTERNATIVE_APPROVED_AND_REBOOKED',
      tripId,
      agent: 'Booking Orchestrator',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: proposal,
    });

    return { approved: true, alternative: proposal };
  }

  public static getPendingProposal(tripId: string): AlternativeApprovalOption | undefined {
    return this.pendingApprovals.get(tripId);
  }
}
