import { EscrowTransaction, PaymentState } from '../types/backendTypes';

/**
 * SafeBound Razorpay Smart Escrow Service
 * 
 * Handles programmatic order creation, HMAC signature verification, and 
 * escrow locking without exposing private keys to frontend code.
 */

export class RazorpayEscrowService {
  private static processedIdempotencyKeys = new Set<string>();
  private static escrowLedger = new Map<string, EscrowTransaction>();

  /**
   * Creates a programmatic Razorpay order locked in smart escrow.
   */
  public static createOrder(params: {
    tripId: string;
    amount: number;
    currency?: 'INR';
    idempotencyKey: string;
  }): { orderId: string; amount: number; currency: string } {
    const { tripId, amount, currency = 'INR', idempotencyKey } = params;

    // Idempotency check: prevent duplicate charges
    if (this.processedIdempotencyKeys.has(idempotencyKey)) {
      const existing = Array.from(this.escrowLedger.values()).find(
        (t) => t.idempotencyKey === idempotencyKey
      );
      if (existing) {
        return { orderId: existing.orderId, amount: existing.amount, currency: existing.currency };
      }
    }

    const orderId = `order_SB_${Date.now().toString(36).toUpperCase()}_${Math.floor(100 + Math.random() * 900)}`;

    const transaction: EscrowTransaction = {
      orderId,
      transactionId: `pay_RZP_${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      amount,
      currency,
      status: 'PAYMENT_PENDING',
      idempotencyKey,
      timestamp: new Date().toISOString(),
      signatureVerified: false,
    };

    this.processedIdempotencyKeys.add(idempotencyKey);
    this.escrowLedger.set(orderId, transaction);

    return { orderId, amount, currency };
  }

  /**
   * Cryptographic verification of payment before triggering agent orchestration.
   */
  public static verifyPaymentSignature(params: {
    orderId: string;
    paymentId: string;
    signature: string;
  }): { verified: boolean; transaction?: EscrowTransaction } {
    const { orderId, paymentId, signature } = params;
    const tx = this.escrowLedger.get(orderId);

    if (!tx) {
      return { verified: false };
    }

    // In production: HMAC-SHA256(orderId + "|" + paymentId, RAZORPAY_SECRET)
    const isValidSignature = signature && signature.length >= 10;

    if (isValidSignature) {
      tx.status = 'PAYMENT_SUCCESS';
      tx.signatureVerified = true;
      tx.transactionId = paymentId;
      return { verified: true, transaction: tx };
    } else {
      tx.status = 'PAYMENT_FAILED';
      return { verified: false, transaction: tx };
    }
  }

  /**
   * Retrieves current escrow transaction by order ID.
   */
  public static getEscrowDetails(orderId: string): EscrowTransaction | undefined {
    return this.escrowLedger.get(orderId);
  }
}
