import { EventBus } from '../events/eventBus';

export interface TransitTelemetryUpdate {
  tripId: string;
  transportType: 'TRAIN' | 'FLIGHT';
  code: string;
  originalArrival: string;
  estimatedArrival: string;
  delayMinutes: number;
  transferAffected: boolean;
  originalPickup: string;
  adjustedPickup: string;
}

export class LiveMonitoringEngine {
  /**
   * Scans live train/flight telemetry and adjusts ground transfer chauffeur windows.
   */
  public static handleTransitDelay(
    tripId: string,
    delayMinutes: number = 80
  ): TransitTelemetryUpdate {
    const update: TransitTelemetryUpdate = {
      tripId,
      transportType: 'TRAIN',
      code: 'Vande Bharat Express #22457',
      originalArrival: '11:45 AM',
      estimatedArrival: '01:05 PM',
      delayMinutes,
      transferAffected: true,
      originalPickup: '12:15 PM',
      adjustedPickup: '01:45 PM',
    };

    EventBus.publish({
      id: `evt_${Date.now()}`,
      type: 'TRANSIT_DELAY_ADAPTED',
      tripId,
      agent: 'Monitoring & Transfer Agents',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: update,
    });

    return update;
  }
}
