export type PaymentLifecycleState = 
  | 'CREATED'
  | 'CHECKOUT_OPENED'
  | 'AUTHORIZED'
  | 'CAPTURED'
  | 'PAYMENT_SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'EXPIRED'
  | 'REFUND_REQUIRED'
  | 'REFUND_REQUESTED'
  | 'REFUND_PROCESSING'
  | 'REFUNDED';

export interface RazorpayOrderPayload {
  orderId: string;
  tripId: string;
  packageId: string;
  amountPaise: number;
  amountRupees: number;
  currency: 'INR';
  keyId: string;
  createdAt: string;
  expiresAt: string;
  priceLockToken: string;
}

export interface PaymentVerificationRequest {
  orderId: string;
  paymentId: string;
  signature: string;
  tripId: string;
  amountRupees: number;
}

export interface PaymentVerificationResult {
  verified: boolean;
  paymentId: string;
  orderId: string;
  state: PaymentLifecycleState;
  verifiedAt: string;
  bookingTriggered: boolean;
  hmacDigest: string;
}

export interface RazorpayWebhookEvent {
  eventId: string;
  event: 
    | 'payment.authorized'
    | 'payment.captured'
    | 'payment.failed'
    | 'order.paid'
    | 'refund.created'
    | 'refund.processed';
  orderId: string;
  paymentId: string;
  amountPaise: number;
  currency: 'INR';
  timestamp: string;
  signature: string;
}

export interface PaymentLedgerRecord {
  paymentId: string;
  orderId: string;
  tripId: string;
  packageId: string;
  amount: number;
  currency: 'INR';
  status: PaymentLifecycleState;
  provider: 'razorpay';
  createdAt: string;
  capturedAt?: string;
  refundAmount?: number;
  refundReason?: string;
}
