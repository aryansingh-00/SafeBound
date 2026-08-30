import { 
  BookingAttemptRecord, 
  OrchestrationOverallState, 
  ServiceBookingItem 
} from './bookingTypes';
import { IdempotencyManager } from './idempotencyManager';
import { BookingAuditLogger } from './bookingAuditLogger';
import { RecoveryApprovalService } from './recoveryApprovalService';
import { EventBus } from '../events/eventBus';

export class BookingOrchestratorEngine {
  private static activeAttempts = new Map<string, BookingAttemptRecord>();

  /**
   * Initializes a controlled booking attempt after Razorpay payment verification.
   */
  public static async startBookingOrchestration(params: {
    tripId: string;
    packageId: string;
    orderId: string;
    paymentId: string;
    idempotencyKey: string;
    simulateActivityFailure?: boolean;
  }): Promise<BookingAttemptRecord> {
    const {
      tripId,
      packageId,
      orderId,
      paymentId,
      idempotencyKey,
      simulateActivityFailure = false,
    } = params;

    // 1. Idempotency Lock Check
    const lockCheck = IdempotencyManager.acquireLock(idempotencyKey);
    if (!lockCheck.acquired && lockCheck.existingRecord) {
      return lockCheck.existingRecord;
    }

    const bookingAttemptId = `BA_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

    const initialServices: ServiceBookingItem[] = [
      {
        id: 'svc-trn',
        type: 'TRANSPORT',
        providerName: 'Indian Railways (IRCTC)',
        status: 'PROCESSING',
        price: 3300,
        currency: 'INR',
        lastAttemptAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
      },
      {
        id: 'svc-htl',
        type: 'HOTEL',
        providerName: 'The Cedar View Resort & Spa',
        status: 'PROCESSING',
        price: 19200,
        currency: 'INR',
        lastAttemptAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
      },
      {
        id: 'svc-trf',
        type: 'TRANSFER',
        providerName: 'SafeBound Verified Hill Fleet',
        status: 'PENDING',
        price: 3700,
        currency: 'INR',
        dependsOn: 'svc-trn',
        lastAttemptAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
      },
      {
        id: 'svc-act',
        type: 'ACTIVITY',
        providerName: 'Gun Hill Cable Car VIP Consortium',
        status: 'PENDING',
        price: 3600,
        currency: 'INR',
        lastAttemptAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
      },
    ];

    const attemptRecord: BookingAttemptRecord = {
      bookingAttemptId,
      tripId,
      packageId,
      orderId,
      paymentId,
      idempotencyKey,
      currentState: 'BOOKING_PROCESSING',
      services: initialServices,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.activeAttempts.set(tripId, attemptRecord);
    IdempotencyManager.registerAttempt(idempotencyKey, attemptRecord);

    BookingAuditLogger.log({
      tripId,
      agentOrService: 'Booking Orchestrator',
      action: 'Transaction Initiated',
      provider: 'SafeBound Core Orchestrator',
      result: 'SUCCESS',
      details: `Razorpay payment verified (${paymentId}). Orchestration started for Attempt ${bookingAttemptId}.`,
    });

    return attemptRecord;
  }

  /**
   * Advances the booking orchestration simulation.
   */
  public static async advanceSimulation(
    tripId: string, 
    stepIndex: number, 
    triggerActivityFailure: boolean = false
  ): Promise<BookingAttemptRecord | undefined> {
    const attempt = this.activeAttempts.get(tripId);
    if (!attempt) return undefined;

    if (stepIndex === 1) {
      // Step 1: Transport confirmed
      attempt.services[0].status = 'CONFIRMED';
      attempt.services[0].bookingReference = 'PNR-8841920412';
      BookingAuditLogger.log({
        tripId,
        agentOrService: 'Transport Agent',
        action: 'PNR Confirmed',
        provider: 'IRCTC Direct Adapter',
        result: 'SUCCESS',
        details: 'Confirmed 2 seats on Vande Bharat #22457. PNR PNR-8841920412.',
      });
    } else if (stepIndex === 2) {
      // Step 2: Hotel confirmed
      attempt.services[1].status = 'CONFIRMED';
      attempt.services[1].bookingReference = 'HTL-RES-8K92L';
      BookingAuditLogger.log({
        tripId,
        agentOrService: 'Hotel Agent',
        action: 'Room Reserved',
        provider: 'The Cedar View Luxury PMS',
        result: 'SUCCESS',
        details: 'Deluxe Valley View Suite reserved for 4 nights.',
      });
    } else if (stepIndex === 3) {
      // Step 3: Transfer confirmed
      attempt.services[2].status = 'CONFIRMED';
      attempt.services[2].bookingReference = 'CAB-HILL-992';
      BookingAuditLogger.log({
        tripId,
        agentOrService: 'Transfer Agent',
        action: 'Chauffeur Dispatched',
        provider: 'SafeBound Verified Fleet',
        result: 'SUCCESS',
        details: 'Chauffeur assigned for 12:15 PM Dehradun station pickup.',
      });
    } else if (stepIndex === 4) {
      // Step 4: Activity handling
      if (triggerActivityFailure) {
        attempt.services[3].status = 'FAILED';
        attempt.services[3].failureReason = 'Ropeway maintenance window closed by local authorities.';
        attempt.currentState = 'RECOVERY_REQUIRED';

        BookingAuditLogger.log({
          tripId,
          agentOrService: 'Activity Agent',
          action: 'Provider Inventory Error',
          provider: 'Gun Hill Cable Car System',
          result: 'FAILURE',
          details: 'Slot allocation failed: Maintenance scheduled during travel window.',
        });

        // Trigger autonomous alternative discovery
        RecoveryApprovalService.createAlternativeProposal({
          tripId,
          failedServiceType: 'ACTIVITY',
          originalTitle: 'Gun Hill Cable Car VIP Fast-Track Pass',
          replacementTitle: 'Landour Heritage Nature Trail & Tea Tasting VIP Walk',
          priceDifference: 0,
          whyChosen: 'Zero extra charge, 4.9★ traveler rating, and guaranteed mountain weather suitability.',
        });
      } else {
        attempt.services[3].status = 'CONFIRMED';
        attempt.services[3].bookingReference = 'ACT-VIP-3310';
        attempt.currentState = 'FULLY_CONFIRMED';

        BookingAuditLogger.log({
          tripId,
          agentOrService: 'Activity Agent',
          action: 'Passes Issued',
          provider: 'Activity Gateway',
          result: 'SUCCESS',
          details: 'VIP Cable Car Passes confirmed & QR voucher generated.',
        });
      }
    }

    attempt.updatedAt = new Date().toISOString();
    return attempt;
  }

  public static getAttempt(tripId: string): BookingAttemptRecord | undefined {
    return this.activeAttempts.get(tripId);
  }
}
