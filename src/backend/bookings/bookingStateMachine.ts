import { BookingLifecycleState, PaymentState } from '../types/backendTypes';

export interface BookingStateContext {
  tripId: string;
  orderId: string;
  currentState: BookingLifecycleState;
  paymentState: PaymentState;
  servicesStatus: {
    transport: boolean;
    hotel: boolean;
    transfer: boolean;
    activities: boolean;
  };
  pnrMap: Record<string, string>;
  recoveryAttempts: number;
  lastUpdated: string;
}

export class BookingStateMachine {
  private static sessions = new Map<string, BookingStateContext>();

  /**
   * Initializes a booking context for a selected trip package.
   */
  public static initializeBooking(tripId: string, orderId: string): BookingStateContext {
    const context: BookingStateContext = {
      tripId,
      orderId,
      currentState: 'CREATED',
      paymentState: 'PAYMENT_PENDING',
      servicesStatus: {
        transport: false,
        hotel: false,
        transfer: false,
        activities: false,
      },
      pnrMap: {},
      recoveryAttempts: 0,
      lastUpdated: new Date().toISOString(),
    };

    this.sessions.set(tripId, context);
    return context;
  }

  /**
   * Transitions state upon confirmed payment verification.
   */
  public static onPaymentSuccess(tripId: string): BookingStateContext {
    const ctx = this.getContext(tripId);
    ctx.paymentState = 'PAYMENT_SUCCESS';
    ctx.currentState = 'BOOKING_PROCESSING';
    ctx.lastUpdated = new Date().toISOString();
    return ctx;
  }

  /**
   * Updates an individual domain micro-agent's booking outcome.
   */
  public static updateServiceConfirmation(
    tripId: string,
    service: 'transport' | 'hotel' | 'transfer' | 'activities',
    confirmed: boolean,
    tokenRef?: string
  ): BookingStateContext {
    const ctx = this.getContext(tripId);
    ctx.servicesStatus[service] = confirmed;

    if (tokenRef) {
      ctx.pnrMap[service] = tokenRef;
    }

    const { transport, hotel, transfer, activities } = ctx.servicesStatus;

    if (transport && hotel && transfer && activities) {
      ctx.currentState = 'FULLY_CONFIRMED';
    } else if (transport || hotel || transfer || activities) {
      ctx.currentState = 'PARTIALLY_CONFIRMED';
    }

    ctx.lastUpdated = new Date().toISOString();
    return ctx;
  }

  /**
   * Flags failure on a critical service and triggers recovery state.
   */
  public static flagRecoveryRequired(tripId: string, failedService: string): BookingStateContext {
    const ctx = this.getContext(tripId);
    ctx.currentState = 'RECOVERY_REQUIRED';
    ctx.recoveryAttempts += 1;
    ctx.lastUpdated = new Date().toISOString();
    return ctx;
  }

  /**
   * Marks a recovery action successful and transitions to REBOOKED / FULLY_CONFIRMED.
   */
  public static onRecoverySuccess(tripId: string, service: 'transport' | 'hotel' | 'transfer' | 'activities', newToken: string): BookingStateContext {
    const ctx = this.getContext(tripId);
    ctx.servicesStatus[service] = true;
    ctx.pnrMap[service] = newToken;
    ctx.currentState = 'REBOOKED';
    
    const allDone = Object.values(ctx.servicesStatus).every(Boolean);
    if (allDone) {
      ctx.currentState = 'FULLY_CONFIRMED';
    }

    ctx.lastUpdated = new Date().toISOString();
    return ctx;
  }

  public static getContext(tripId: string): BookingStateContext {
    const ctx = this.sessions.get(tripId);
    if (!ctx) {
      return this.initializeBooking(tripId, `order_${tripId}`);
    }
    return ctx;
  }
}
