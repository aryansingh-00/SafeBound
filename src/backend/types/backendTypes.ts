export interface StructuredTripRequirements {
  origin: string;
  hardConstraints: {
    maxBudget: number;
    durationDays: number;
    travellersCount: number;
    originCity: string;
  };
  preferences: {
    destinationTypes: string[];
    experienceVibe: string;
    hotelTier: string;
    transportPreferred: string[];
    safetyPriority: 'normal' | 'high' | 'very_high';
    weatherPreferred: string;
  };
}

export interface CoordinatedPackage {
  packageId: string;
  destination: string;
  state: string;
  durationDays: number;
  matchScore: number;
  services: {
    transport: {
      provider: string;
      mode: string;
      name: string;
      route: string;
      pnr?: string;
      baseCost: number;
    };
    hotel: {
      provider: string;
      name: string;
      tier: string;
      roomType: string;
      nights: number;
      voucherRef?: string;
      baseCost: number;
    };
    transfer: {
      provider: string;
      type: string;
      assignedVehicle: string;
      bookingRef?: string;
      baseCost: number;
    };
    activities: {
      id: string;
      name: string;
      slot: string;
      passRef?: string;
      cost: number;
    }[];
  };
  pricing: {
    transportCost: number;
    hotelCost: number;
    transferCost: number;
    activitiesCost: number;
    taxesAndFees: number;
    savingsApplied: number;
    finalTotal: number;
  };
}

export type PaymentState = 'PAYMENT_PENDING' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED';

export type BookingLifecycleState = 
  | 'CREATED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_SUCCESS'
  | 'BOOKING_PROCESSING'
  | 'PARTIALLY_CONFIRMED'
  | 'FULLY_CONFIRMED'
  | 'RECOVERY_REQUIRED'
  | 'REBOOKED'
  | 'CANCELLED';

export interface EscrowTransaction {
  orderId: string;
  transactionId: string;
  amount: number;
  currency: 'INR';
  status: PaymentState;
  idempotencyKey: string;
  timestamp: string;
  signatureVerified: boolean;
}

export interface BackendEventMessage {
  id: string;
  type: string;
  tripId: string;
  agent: string;
  timestamp: string;
  payload: Record<string, any>;
}
