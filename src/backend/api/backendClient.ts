import { AITravelOrchestrator } from '../orchestrator/aiTravelOrchestrator';
import { PricingEngine } from '../pricing/pricingEngine';
import { RazorpayEscrowService } from '../payments/razorpayEscrowService';
import { BookingStateMachine } from '../bookings/bookingStateMachine';
import { RecoveryAgent } from '../agents/recoveryAgent';
import { LiveMonitoringEngine } from '../monitoring/liveMonitoringEngine';
import { EventBus } from '../events/eventBus';

/**
 * Unified Backend Client exposing clean API calls to frontend UI components
 */
export class SafeBoundBackendClient {
  public static async planTripWithAI(prompt: string) {
    return AITravelOrchestrator.executePlanningPipeline(prompt);
  }

  public static calculatePrice(params: {
    transportCost: number;
    hotelCost: number;
    transferCost: number;
    activitiesCost: number;
    discountAmount?: number;
  }) {
    return PricingEngine.calculate(params);
  }

  public static createRazorpayOrder(params: {
    tripId: string;
    amount: number;
    idempotencyKey: string;
  }) {
    return RazorpayEscrowService.createOrder(params);
  }

  public static verifyPayment(params: {
    orderId: string;
    paymentId: string;
    signature: string;
  }) {
    return RazorpayEscrowService.verifyPaymentSignature(params);
  }

  public static async executeBooking(tripId: string, guestName: string) {
    return AITravelOrchestrator.executeAutonomousBooking(tripId, guestName);
  }

  public static async triggerRecovery(tripId: string, failedService: 'hotel' | 'transfer' | 'transport', errorMsg: string) {
    const recoveryPlan = await RecoveryAgent.executeRecovery(tripId, failedService, errorMsg);
    if (recoveryPlan.alternativeFound) {
      BookingStateMachine.onRecoverySuccess(
        tripId,
        failedService as any,
        recoveryPlan.alternativeDetails.newTokenRef
      );
    }
    return recoveryPlan;
  }

  public static simulateTransitDelay(tripId: string, delayMinutes: number) {
    return LiveMonitoringEngine.handleTransitDelay(tripId, delayMinutes);
  }

  public static subscribeToEvents(listener: (event: any) => void) {
    return EventBus.subscribe(listener);
  }

  public static getBookingState(tripId: string) {
    return BookingStateMachine.getContext(tripId);
  }
}
