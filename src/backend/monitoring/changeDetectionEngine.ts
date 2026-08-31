import { DisruptionSnapshot } from './monitoringTypes';

export class ChangeDetectionEngine {
  private static baselineSnapshots = new Map<string, DisruptionSnapshot>();

  /**
   * Initializes or updates the baseline telemetry snapshot for a trip.
   */
  public static getOrCreateSnapshot(tripId: string): DisruptionSnapshot {
    if (!this.baselineSnapshots.has(tripId)) {
      this.baselineSnapshots.set(tripId, {
        tripId,
        destination: 'Mussoorie',
        lastCheckedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
        transportStatus: {
          serviceName: 'Vande Bharat Express #22457',
          originalArrival: '11:45 AM',
          currentArrival: '11:45 AM',
          delayMinutes: 0,
          isOnTime: true,
        },
        transferStatus: {
          serviceName: 'Private Hill Chauffeur (Sedan)',
          originalPickup: '12:15 PM',
          currentPickup: '12:15 PM',
          hasConflict: false,
        },
        weatherStatus: {
          condition: 'Clear Mountain Skies',
          rainProbability: 12,
          alertLevel: 'NORMAL',
        },
      });
    }
    return this.baselineSnapshots.get(tripId)!;
  }

  /**
   * Simulates detection of live train arrival delay.
   */
  public static recordTrainDelay(tripId: string, delayMinutes: number = 80): {
    snapshot: DisruptionSnapshot;
    isMeaningfulChange: boolean;
  } {
    const snapshot = this.getOrCreateSnapshot(tripId);
    
    snapshot.transportStatus.delayMinutes = delayMinutes;
    snapshot.transportStatus.isOnTime = delayMinutes <= 15;
    snapshot.transportStatus.currentArrival = '01:05 PM'; // 11:45 AM + 80m
    snapshot.transferStatus.hasConflict = delayMinutes > 15;
    snapshot.lastCheckedAt = new Date().toLocaleTimeString('en-US', { hour12: false });

    this.baselineSnapshots.set(tripId, snapshot);

    return {
      snapshot,
      isMeaningfulChange: delayMinutes >= 20, // 20m threshold
    };
  }

  /**
   * Resets baseline to on-time state.
   */
  public static resetBaseline(tripId: string): DisruptionSnapshot {
    this.baselineSnapshots.delete(tripId);
    return this.getOrCreateSnapshot(tripId);
  }
}
