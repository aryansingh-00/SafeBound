import { BookingAttemptRecord } from './bookingTypes';

export class IdempotencyManager {
  private static processedKeys = new Map<string, BookingAttemptRecord>();
  private static inFlightLocks = new Set<string>();

  /**
   * Acquires a booking execution lock for an idempotency key.
   */
  public static acquireLock(idempotencyKey: string): { acquired: boolean; existingRecord?: BookingAttemptRecord } {
    if (this.processedKeys.has(idempotencyKey)) {
      return { acquired: false, existingRecord: this.processedKeys.get(idempotencyKey) };
    }

    if (this.inFlightLocks.has(idempotencyKey)) {
      return { acquired: false };
    }

    this.inFlightLocks.add(idempotencyKey);
    return { acquired: true };
  }

  /**
   * Stores completed or in-progress booking attempt against the idempotency key.
   */
  public static registerAttempt(idempotencyKey: string, record: BookingAttemptRecord): void {
    this.inFlightLocks.delete(idempotencyKey);
    this.processedKeys.set(idempotencyKey, record);
  }

  /**
   * Releases lock in case of early validation rejection.
   */
  public static releaseLock(idempotencyKey: string): void {
    this.inFlightLocks.delete(idempotencyKey);
  }
}
