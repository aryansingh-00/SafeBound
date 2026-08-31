import { EmailDeliveryState } from './itineraryTypes';
import { EventBus } from '../events/eventBus';

interface EmailRecord {
  emailId: string;
  tripId: string;
  template: 'BOOKING_CONFIRMED' | 'DISRUPTION_UPDATE' | 'RECOVERY_COMPLETED' | 'REFUND_INITIATED';
  subject: string;
  recipientEmail: string;
  state: EmailDeliveryState;
  queuedAt: string;
  sentAt?: string;
}

export class EmailEngineService {
  private static queue = new Map<string, EmailRecord>();

  public static queueConfirmationEmail(tripId: string, recipientEmail: string = 'aryansingh@example.com'): EmailRecord {
    const emailId = `EMAIL_${Date.now()}`;
    const record: EmailRecord = {
      emailId,
      tripId,
      template: 'BOOKING_CONFIRMED',
      subject: '🎉 Your SafeBound trip to Mussoorie is confirmed!',
      recipientEmail,
      state: 'QUEUED',
      queuedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    this.queue.set(emailId, record);

    // Simulate async delivery (400ms)
    setTimeout(() => {
      record.state = 'SENT';
      record.sentAt = new Date().toLocaleTimeString('en-US', { hour12: false });
      this.queue.set(emailId, record);

      EventBus.publish({
        id: `evt_email_${Date.now()}`,
        type: 'EMAIL_DELIVERED',
        tripId,
        agent: 'Email Engine',
        timestamp: record.sentAt,
        payload: { emailId, subject: record.subject, recipient: recipientEmail },
      });
    }, 400);

    return record;
  }

  public static queueDisruptionEmail(tripId: string, changeDescription: string): EmailRecord {
    const emailId = `EMAIL_UPD_${Date.now()}`;
    const record: EmailRecord = {
      emailId,
      tripId,
      template: 'DISRUPTION_UPDATE',
      subject: '⚠️ Important update to your Mussoorie trip',
      recipientEmail: 'aryansingh@example.com',
      state: 'SENDING',
      queuedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
    };

    this.queue.set(emailId, record);
    return record;
  }

  public static getLatestEmail(tripId: string): EmailRecord | undefined {
    const entries = Array.from(this.queue.values()).filter((r) => r.tripId === tripId);
    return entries[entries.length - 1];
  }

  public static getAllEmails(tripId: string): EmailRecord[] {
    return Array.from(this.queue.values()).filter((r) => r.tripId === tripId);
  }
}
