export type DisruptionSeverity = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type MonitoringEventType = 
  | 'TRANSPORT_ON_TIME'
  | 'TRANSPORT_DELAYED'
  | 'TRANSPORT_CANCELLED'
  | 'HOTEL_UNAVAILABLE'
  | 'TRANSFER_CONFLICT'
  | 'ACTIVITY_WEATHER_IMPACT'
  | 'WEATHER_ALERT'
  | 'CORRIDOR_SAFETY_WARNING';

export interface DisruptionSnapshot {
  tripId: string;
  destination: string;
  lastCheckedAt: string;
  transportStatus: {
    serviceName: string;
    originalArrival: string;
    currentArrival: string;
    delayMinutes: number;
    isOnTime: boolean;
  };
  transferStatus: {
    serviceName: string;
    originalPickup: string;
    currentPickup: string;
    hasConflict: boolean;
  };
  weatherStatus: {
    condition: string;
    rainProbability: number;
    alertLevel: 'NORMAL' | 'ADVISORY' | 'WARNING';
  };
}

export interface DisruptionImpactReport {
  eventId: string;
  eventType: MonitoringEventType;
  severity: DisruptionSeverity;
  headline: string;
  impactExplanation: string;
  affectedComponents: ('TRANSPORT' | 'TRANSFER' | 'HOTEL' | 'ACTIVITY')[];
  requiresAction: boolean;
  detectedAt: string;
}

export interface RecoveryOptionItem {
  id: string;
  type: 'MODIFY_EXISTING_TRANSFER' | 'BOOK_EXPRESS_REPLACEMENT' | 'UPGRADE_SUV_CHAUFFEUR';
  title: string;
  description: string;
  newPickupTime: string;
  priceDelta: number; // 0 for no cost, +300, etc.
  isAutoExecutable: boolean;
  isBestValue: boolean;
}

export interface ActiveRecoveryState {
  recoveryId: string;
  tripId: string;
  disruptionReport: DisruptionImpactReport;
  options: RecoveryOptionItem[];
  status: 'ANALYZED' | 'AWAITING_USER_APPROVAL' | 'EXECUTING' | 'RESOLVED';
  resolvedActionSummary?: string;
}
