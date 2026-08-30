export type DataStatus = 'LIVE' | 'ESTIMATED' | 'CACHED' | 'MOCK';

export type ProviderErrorCode = 
  | 'TIMEOUT'
  | 'RATE_LIMIT'
  | 'TEMPORARY_UNAVAILABLE'
  | 'SOLD_OUT'
  | 'INVALID_DETAILS'
  | 'PRICE_CHANGED'
  | 'BOOKING_REJECTED'
  | 'AUTH_ERROR'
  | 'UNKNOWN';

export interface ProviderHealthMetric {
  providerId: string;
  name: string;
  domain: 'TRANSPORT' | 'HOTEL' | 'TRANSFER' | 'ACTIVITY' | 'WEATHER' | 'SAFETY';
  status: 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE';
  latencyMs: number;
  errorRatePercent: number;
  lastSuccessfulRequest: string;
}

export interface NormalizedTransportOption {
  id: string;
  type: 'TRAIN' | 'FLIGHT' | 'BUS';
  provider: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  durationMinutes: number;
  price: number;
  currency: 'INR';
  cabinClass: string;
  seatsAvailable: number;
  dataStatus: DataStatus;
}

export interface NormalizedHotelOption {
  hotelId: string;
  name: string;
  location: string;
  rating: number;
  category: string;
  roomType: string;
  pricePerNight: number;
  totalPrice: number;
  breakfastIncluded: boolean;
  cancellationPolicy: string;
  availability: 'AVAILABLE' | 'FEW_LEFT' | 'SOLD_OUT';
  dataStatus: DataStatus;
}

export interface NormalizedTransferOption {
  transferId: string;
  mode: 'FIXED' | 'FLEXIBLE' | 'DYNAMIC';
  vehicleType: string;
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
  durationMinutes: number;
  price: number;
  driverStatus: 'ASSIGNED' | 'PENDING_ARRIVAL' | 'WINDOW_SECURED';
  dataStatus: DataStatus;
}

export interface NormalizedActivityOption {
  activityId: string;
  title: string;
  destination: string;
  durationHours: number;
  startTime: string;
  endTime: string;
  pricePerPerson: number;
  isWeatherSensitive: boolean;
  participantCapacity: number;
  dataStatus: DataStatus;
}

export interface NormalizedWeatherReport {
  destination: string;
  temperatureCelsius: number;
  condition: string;
  rainProbabilityPercent: number;
  weatherRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  affectedActivities: string[];
  lastRadarSync: string;
  dataStatus: DataStatus;
}

export interface NormalizedSafetyReport {
  destination: string;
  overallSafetyScore: number; // 0-100
  corridorRoadRisk: 'LOW' | 'MODERATE' | 'HIGH';
  verifiedChauffeurCoverage: boolean;
  activeAdvisoriesCount: number;
  advisorySummary: string;
  lastUpdated: string;
  dataStatus: DataStatus;
}
