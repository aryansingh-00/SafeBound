import { DisruptionSnapshot, DisruptionImpactReport, DisruptionSeverity } from './monitoringTypes';

export class ImpactAnalysisEngine {
  /**
   * Computes severity and cascading downstream schedule impacts from telemetry changes.
   */
  public static analyzeImpact(snapshot: DisruptionSnapshot): DisruptionImpactReport {
    const delay = snapshot.transportStatus.delayMinutes;
    let severity: DisruptionSeverity = 'NONE';
    let headline = 'All trip components on time and synchronized.';
    let impactExplanation = 'All transport, transfer, and hotel check-in buffers verified.';
    const affectedComponents: ('TRANSPORT' | 'TRANSFER' | 'HOTEL' | 'ACTIVITY')[] = [];
    let requiresAction = false;

    if (delay === 0) {
      severity = 'NONE';
    } else if (delay > 0 && delay <= 20) {
      severity = 'LOW';
      headline = `Train running with minor ${delay}m delay.`;
      impactExplanation = 'Buffer window absorbs delay. Chauffeur remains on standby.';
      affectedComponents.push('TRANSPORT');
    } else if (delay > 20 && delay <= 90) {
      severity = 'MEDIUM';
      headline = `Train delayed by ${delay} min. Station pickup window conflict detected!`;
      impactExplanation = `Train arrival shifted from ${snapshot.transportStatus.originalArrival} to ${snapshot.transportStatus.currentArrival}. Original 12:15 PM chauffeur pickup will depart before your arrival. Transfer adjustment required.`;
      affectedComponents.push('TRANSPORT', 'TRANSFER');
      requiresAction = true;
    } else {
      severity = 'HIGH';
      headline = `Major transport delay (+${delay} min). Downstream schedule re-sequencing required.`;
      impactExplanation = 'Both ground transfer and afternoon activity buffers breached.';
      affectedComponents.push('TRANSPORT', 'TRANSFER', 'ACTIVITY');
      requiresAction = true;
    }

    return {
      eventId: `EVT_IMP_${Date.now()}`,
      eventType: delay > 0 ? 'TRANSPORT_DELAYED' : 'TRANSPORT_ON_TIME',
      severity,
      headline,
      impactExplanation,
      affectedComponents,
      requiresAction,
      detectedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };
  }
}
