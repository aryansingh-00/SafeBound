import { ActionPolicy, PendingAIAction } from './securityTypes';
import { AuditLogger } from './auditLogger';
import { AuthEngine } from './authEngine';

/** Policy registry — defines what an AI agent can do automatically vs. what requires user approval. */
const POLICIES: ActionPolicy[] = [
  {
    action: 'adjust_transfer_pickup',
    label: 'Adjust Transfer Pickup Time',
    automatic: true,
    maxAdditionalCostRupees: 0,
    requiresUserApproval: false,
    description: 'SafeBound can automatically reschedule your cab pickup when a train is delayed, at no extra cost.',
  },
  {
    action: 'upgrade_transfer_vehicle',
    label: 'Upgrade Transfer Vehicle',
    automatic: true,
    maxAdditionalCostRupees: 500,
    requiresUserApproval: false,
    description: 'SafeBound can auto-upgrade your transfer vehicle if the original is unavailable, up to ₹500 extra.',
  },
  {
    action: 'replace_activity',
    label: 'Replace Unavailable Activity',
    automatic: false,
    maxAdditionalCostRupees: 0,
    requiresUserApproval: true,
    description: 'Replacing an activity requires your approval even if the cost is unchanged, because preferences matter.',
  },
  {
    action: 'replace_hotel',
    label: 'Replace Hotel',
    automatic: false,
    maxAdditionalCostRupees: 0,
    requiresUserApproval: true,
    description: 'Any hotel change always requires explicit user approval — SafeBound never changes your accommodation silently.',
  },
  {
    action: 'initiate_refund',
    label: 'Initiate Refund',
    automatic: false,
    maxAdditionalCostRupees: 0,
    requiresUserApproval: true,
    description: 'Refunds are always triggered manually and require authorization from the system.',
  },
];

let pendingActions: PendingAIAction[] = [];

export class ActionPolicyRegistry {
  public static getPolicy(action: string): ActionPolicy | undefined {
    return POLICIES.find((p) => p.action === action);
  }

  public static getAllPolicies(): ActionPolicy[] {
    return [...POLICIES];
  }

  /**
   * The AI agent submits an intended action.
   * Returns whether it was auto-executed or queued for user approval.
   */
  public static requestAction(params: {
    tripId: string;
    agent: string;
    action: string;
    description: string;
    additionalCostRupees: number;
  }): { allowed: boolean; requiresApproval: boolean; pendingActionId?: string } {
    const policy = this.getPolicy(params.action);
    const session = AuthEngine.getCurrentSession();

    if (!policy) {
      AuditLogger.record({
        type: 'AI_TOOL_BLOCKED',
        actor: params.agent,
        actorRole: 'SYSTEM',
        resource: `trip:${params.tripId}`,
        action: params.action,
        result: 'DENIED',
        metadata: { reason: 'No policy found for action' },
      });
      return { allowed: false, requiresApproval: false };
    }

    // Over cost limit — always escalate
    const overLimit = params.additionalCostRupees > policy.maxAdditionalCostRupees;

    if (policy.requiresUserApproval || overLimit) {
      const pending: PendingAIAction = {
        actionId: `ACT_${Date.now()}`,
        tripId: params.tripId,
        agent: params.agent,
        action: params.action,
        description: params.description,
        additionalCostRupees: params.additionalCostRupees,
        requestedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
        status: 'PENDING',
      };
      pendingActions = [pending, ...pendingActions];

      AuditLogger.record({
        type: 'USER_APPROVAL_REQUESTED',
        actor: params.agent,
        actorRole: 'SYSTEM',
        resource: `trip:${params.tripId}`,
        action: params.action,
        result: 'SUCCESS',
        metadata: { additionalCost: params.additionalCostRupees, pendingId: pending.actionId },
      });

      return { allowed: false, requiresApproval: true, pendingActionId: pending.actionId };
    }

    // Auto-approved
    AuditLogger.record({
      type: 'AI_TOOL_CALLED',
      actor: params.agent,
      actorRole: 'SYSTEM',
      resource: `trip:${params.tripId}`,
      action: params.action,
      result: 'SUCCESS',
      metadata: { automatic: true },
    });

    return { allowed: true, requiresApproval: false };
  }

  public static approveAction(actionId: string): void {
    const act = pendingActions.find((a) => a.actionId === actionId);
    if (act) {
      act.status = 'APPROVED';
      const session = AuthEngine.getCurrentSession();
      AuditLogger.record({
        type: 'USER_APPROVED',
        actor: session?.email ?? 'user',
        actorRole: session?.role ?? 'USER',
        resource: `trip:${act.tripId}`,
        action: act.action,
        result: 'SUCCESS',
        metadata: { additionalCost: act.additionalCostRupees },
      });
    }
  }

  public static rejectAction(actionId: string): void {
    const act = pendingActions.find((a) => a.actionId === actionId);
    if (act) {
      act.status = 'REJECTED';
      const session = AuthEngine.getCurrentSession();
      AuditLogger.record({
        type: 'USER_REJECTED',
        actor: session?.email ?? 'user',
        actorRole: session?.role ?? 'USER',
        resource: `trip:${act.tripId}`,
        action: act.action,
        result: 'DENIED',
      });
    }
  }

  public static getPendingActions(): PendingAIAction[] {
    return pendingActions.filter((a) => a.status === 'PENDING');
  }
}
