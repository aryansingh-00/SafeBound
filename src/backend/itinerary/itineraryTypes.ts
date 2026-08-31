export type BookingStatus = 'CONFIRMED' | 'PROCESSING' | 'CHANGED' | 'CANCELLED' | 'ACTION_REQUIRED';
export type EventType = 'TRANSPORT' | 'HOTEL' | 'TRANSFER' | 'ACTIVITY' | 'FREE_TIME';
export type DocumentStatus = 'READY' | 'GENERATING' | 'FAILED';
export type EmailDeliveryState = 'QUEUED' | 'SENDING' | 'SENT' | 'DELIVERED' | 'FAILED';

export interface TimelineEvent {
  id: string;
  type: EventType;
  title: string;
  subtitle: string;
  startTime: string;
  endTime: string;
  location: string;
  bookingRef: string;
  status: BookingStatus;
  isAdjusted?: boolean;
  adjustedNote?: string;
  icon: string;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  label: string;
  events: TimelineEvent[];
}

export interface ItineraryVersion {
  version: number;
  generatedAt: string;
  reason: string;
  changedEventIds: string[];
}

export interface ItineraryChangeRecord {
  id: string;
  timestamp: string;
  version: number;
  field: string;
  before: string;
  after: string;
  reason: string;
  handledBy: string;
}

export interface TripDocument {
  id: string;
  name: string;
  type: 'TICKET' | 'VOUCHER' | 'CONFIRMATION' | 'RECEIPT' | 'PASS';
  category: 'TRANSPORT' | 'HOTEL' | 'TRANSFER' | 'ACTIVITY' | 'PAYMENT';
  status: DocumentStatus;
  bookingRef: string;
  createdAt: string;
  signedUrl: string;
}

export interface TripHealthSnapshot {
  transport: BookingStatus;
  hotel: BookingStatus;
  transfer: BookingStatus;
  activities: BookingStatus;
  overallHealth: 'GOOD' | 'WARNING' | 'CRITICAL';
}

export interface FullItinerary {
  tripId: string;
  destination: string;
  version: number;
  days: ItineraryDay[];
  health: TripHealthSnapshot;
  documents: TripDocument[];
  changeHistory: ItineraryChangeRecord[];
  emailState: EmailDeliveryState;
  lastUpdatedAt: string;
}
