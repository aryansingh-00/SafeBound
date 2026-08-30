import { PaymentLedgerRecord, PaymentLifecycleState } from './commerceTypes';
import { EventBus } from '../events/eventBus';

export class PaymentLedgerService {
  private static ledger = new Map<string, PaymentLedgerRecord>();

  /**
   * Records a new transaction in the immutable ledger.
   */
  public static recordPayment(entry: PaymentLedgerRecord): void {
    this.ledger.set(entry.paymentId, entry);

    EventBus.publish({
      id: `evt_led_${Date.now()}`,
      type: 'PAYMENT_LEDGER_RECORDED',
      tripId: entry.tripId,
      agent: 'Payment Ledger Service',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: {
        paymentId: entry.paymentId,
        orderId: entry.orderId,
        amount: entry.amount,
        status: entry.status,
      },
    });
  }

  /**
   * Updates payment state upon capture or refund.
   */
  public static updateStatus(
    paymentId: string, 
    status: PaymentLifecycleState, 
    refundAmount?: number,
    refundReason?: string
  ): void {
    const record = this.ledger.get(paymentId);
    if (!record) return;

    record.status = status;
    if (status === 'CAPTURED' || status === 'PAYMENT_SUCCESS') {
      record.capturedAt = new Date().toISOString();
    }
    if (refundAmount !== undefined) {
      record.refundAmount = (record.refundAmount || 0) + refundAmount;
      record.refundReason = refundReason;
    }

    this.ledger.set(paymentId, record);
  }

  public static getRecord(paymentId: string): PaymentLedgerRecord | undefined {
    return this.ledger.get(paymentId);
  }

  public static getAllRecords(): PaymentLedgerRecord[] {
    return Array.from(this.ledger.values());
  }
}
