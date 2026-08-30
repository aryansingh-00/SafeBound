export type OrchestrationServiceStatus = 
  | 'PENDING' 
  | 'PROCESSING' 
  | 'CONFIRMED' 
  | 'FAILED' 
  | 'RECOVERING' 
  | 'REBOOKED' 
  | 'CANCELLED';

export type OrchestrationOverallState = 
  | 'CREATED'
  | 'VALIDATING'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_SUCCESS'
  | 'BOOKING_PROCESSING'
  | 'PARTIALLY_CONFIRMED'
  | 'FULLY_CONFIRMED'
  | 'RECOVERY_REQUIRED'
  | 'RECOVERING'
  | 'REFUND_REQUIRED'
  | 'REFUNDED';

export type FailureClassification = 
  | 'RETRYABLE_TIMEOUT'
  | 'RETRYABLE_RATE_LIMIT'
  | 'PERMANENT_INVENTORY_SOLD_OUT'
  | 'PERMANENT_POLICY_REJECTION'
  | 'PERMANENT_SCHEDULE_CANCELLED';

export interface ServiceBookingItem {
  id: string;
  type: 'TRANSPORT' | 'HOTEL' | 'TRANSFER' | 'ACTIVITY';
  providerName: string;
  status: OrchestrationServiceStatus;
  bookingReference?: string;
  price: number;
  currency: 'INR';
  dependsOn?: string;
  failureReason?: string;
  lastAttemptAt: string;
}

export interface BookingAttemptRecord {
  bookingAttemptId: string;
  tripId: string;
  packageId: string;
  orderId: string;
  paymentId: string;
  idempotencyKey: string;
  currentState: OrchestrationOverallState;
  services: ServiceBookingItem[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingAuditEntry {
  id: string;
  timestamp: string;
  tripId: string;
  agentOrService: string;
  action: string;
  provider: string;
  result: 'SUCCESS' | 'FAILURE' | 'RETRY' | 'RECOVERY' | 'REFUND';
  details: string;
  metadata?: Record<string, any>;
}

export interface AlternativeApprovalOption {
  alternativeId: string;
  tripId: string;
  failedServiceType: 'HOTEL' | 'TRANSFER' | 'ACTIVITY' | 'TRANSPORT';
  originalServiceTitle: string;
  replacementServiceTitle: string;
  priceDifference: number; // e.g. -800
  refundCreditAmount: number;
  whyChosen: string;
  newTokenRef: string;
  status: 'PENDING_USER_APPROVAL' | 'APPROVED' | 'REJECTED';
}
