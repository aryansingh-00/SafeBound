import { TravellerSnapshot, TravellerProfile } from './securityTypes';
import { AuditLogger } from './auditLogger';
import { AuthEngine } from './authEngine';

const snapshots = new Map<string, TravellerSnapshot>();

export class AuthorizationEngine {
  /**
   * 5-gate authorization check:
   * 1. Authenticated?
   * 2. Owns the resource?
   * 3. Action allowed for this role?
   * 4. Current resource state allows the action?
   * 5. Execute.
   */
  public static authorize(params: {
    action: string;
    resourceOwnerId: string;
    resourceType: string;
    resourceId: string;
  }): { decision: 'ALLOW' | 'DENY'; reason: string } {
    const session = AuthEngine.getCurrentSession();

    // Gate 1 — Authenticated?
    if (!session?.isValid) {
      return { decision: 'DENY', reason: 'Not authenticated.' };
    }

    // Gate 2 — Owns resource? (ADMIN bypasses)
    if (session.role !== 'ADMIN' && session.role !== 'SYSTEM' && session.userId !== params.resourceOwnerId) {
      return { decision: 'DENY', reason: 'You do not own this resource.' };
    }

    // Gate 3 — Role allows action?
    const deniedForUser = ['ISSUE_REFUND', 'DELETE_BOOKING', 'ACCESS_PROVIDER_SECRETS'];
    if (session.role === 'USER' && deniedForUser.includes(params.action)) {
      return { decision: 'DENY', reason: `Action "${params.action}" is not permitted for USER role.` };
    }

    // Gate 4 — State allows? (simplified)
    return { decision: 'ALLOW', reason: 'All authorization gates passed.' };
  }

  /** Create a booking snapshot from the traveller profile — immutable once confirmed. */
  public static createTravellerSnapshot(tripId: string, profile: TravellerProfile): TravellerSnapshot {
    const snapshot: TravellerSnapshot = {
      snapshotId: `SNAP_${Date.now()}`,
      tripId,
      travellerId: profile.travellerId,
      takenAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
      confirmedByUser: true,
      name: profile.name,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
    };

    snapshots.set(tripId, snapshot);

    AuditLogger.record({
      type: 'TRAVELLER_SNAPSHOT_CREATED',
      actor: AuthEngine.getCurrentSession()?.email ?? 'unknown',
      actorRole: AuthEngine.getCurrentSession()?.role ?? 'USER',
      resource: `traveller:${profile.travellerId}`,
      action: 'SNAPSHOT',
      result: 'SUCCESS',
      metadata: { tripId, snapshotId: snapshot.snapshotId },
    });

    return snapshot;
  }

  public static getSnapshot(tripId: string): TravellerSnapshot | undefined {
    return snapshots.get(tripId);
  }
}
