import { BookingAuditEntry } from './bookingTypes';
import { EventBus } from '../events/eventBus';

export class BookingAuditLogger {
  private static auditLogs: BookingAuditEntry[] = [];

  /**
   * Appends an immutable audit entry and dispatches to EventBus.
   */
  public static log(entry: Omit<BookingAuditEntry, 'id' | 'timestamp'>): BookingAuditEntry {
    const fullEntry: BookingAuditEntry = {
      id: `AUDIT_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      ...entry,
    };

    this.auditLogs.unshift(fullEntry);

    EventBus.publish({
      id: fullEntry.id,
      type: 'BOOKING_AUDIT_LOGGED',
      tripId: fullEntry.tripId,
      agent: fullEntry.agentOrService,
      timestamp: fullEntry.timestamp,
      payload: {
        action: fullEntry.action,
        provider: fullEntry.provider,
        result: fullEntry.result,
        details: fullEntry.details,
      },
    });

    return fullEntry;
  }

  public static getLogsForTrip(tripId: string): BookingAuditEntry[] {
    return this.auditLogs.filter((l) => l.tripId === tripId);
  }

  public static getAllLogs(): BookingAuditEntry[] {
    return [...this.auditLogs];
  }
}
