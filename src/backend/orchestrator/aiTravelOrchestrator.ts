import { StructuredTripRequirements, CoordinatedPackage } from '../types/backendTypes';
import { DecisionAgent, DestinationScoreResult } from '../agents/decisionAgent';
import { PackageAgent } from '../agents/packageAgent';
import { OptimizationAgent, OptimizationResult } from '../agents/optimizationAgent';
import { TransportAgent, HotelAgent, TransferAgent, ActivityAgent } from '../agents/domainAgents';
import { BookingStateMachine, BookingStateContext } from '../bookings/bookingStateMachine';
import { EventBus } from '../events/eventBus';

export interface OrchestratorPlanResult {
  parsedRequirements: StructuredTripRequirements;
  rankedDestinations: DestinationScoreResult[];
  recommendedPackage: CoordinatedPackage;
  optimizedVariant?: OptimizationResult;
}

export class AITravelOrchestrator {
  /**
   * Translates freeform natural language user intent into hard constraints and soft preferences.
   */
  public static parseNaturalLanguage(prompt: string): StructuredTripRequirements {
    // Deterministic parsing with intelligent fallback
    const isMountain = prompt.toLowerCase().includes('mountain') || prompt.toLowerCase().includes('hill');
    const budgetMatch = prompt.match(/(?:under|below|budget|within|of)?\s*₹?\s*(\d+)(?:k|,\d+)?/i);
    let maxBudget = 40000;

    if (budgetMatch) {
      const raw = budgetMatch[1];
      if (prompt.toLowerCase().includes(`${raw}k`)) {
        maxBudget = parseInt(raw, 10) * 1000;
      } else {
        maxBudget = parseInt(raw.replace(',', ''), 10);
      }
    }

    const durationMatch = prompt.match(/(\d+)\s*(?:day|days|d)/i);
    const durationDays = durationMatch ? parseInt(durationMatch[1], 10) : 4;

    return {
      origin: 'Delhi',
      hardConstraints: {
        maxBudget,
        durationDays,
        travellersCount: 2,
        originCity: 'Delhi',
      },
      preferences: {
        destinationTypes: isMountain ? ['Mountains', 'Nature'] : ['Nature', 'Relaxing'],
        experienceVibe: 'Peaceful Valley Retreat',
        hotelTier: '4★ Upscale & Boutique',
        transportPreferred: ['Train (Vande Bharat)', 'Flight'],
        safetyPriority: 'high',
        weatherPreferred: 'Pleasant & Mild (18°C–25°C)',
      },
    };
  }

  /**
   * Runs the full discover -> decide -> build -> optimize pipeline.
   */
  public static async executePlanningPipeline(prompt: string): Promise<OrchestratorPlanResult> {
    // 1. Requirement Parser
    const parsedRequirements = this.parseNaturalLanguage(prompt);

    // 2. Decision Agent: Candidate ranking
    const rankedDestinations = DecisionAgent.evaluateCandidates(parsedRequirements);
    const topDestination = rankedDestinations[0]?.destination || 'Mussoorie';

    // 3. Package Agent: Multi-modal synthesis
    const recommendedPackage = PackageAgent.buildPackage(topDestination, parsedRequirements);

    // 4. Optimization Agent: Constraint-preserving savings
    const optimizedVariant = OptimizationAgent.optimizePackage(recommendedPackage);

    EventBus.publish({
      id: `evt_${Date.now()}`,
      type: 'TRIP_PACKAGE_GENERATED',
      tripId: recommendedPackage.packageId,
      agent: 'AI Travel Orchestrator',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: { destination: topDestination, finalPrice: recommendedPackage.pricing.finalTotal },
    });

    return {
      parsedRequirements,
      rankedDestinations,
      recommendedPackage,
      optimizedVariant,
    };
  }

  /**
   * Executes the post-payment 4-agent parallel reservation orchestration.
   */
  public static async executeAutonomousBooking(
    tripId: string,
    guestName: string
  ): Promise<BookingStateContext> {
    BookingStateMachine.onPaymentSuccess(tripId);

    // Trigger Domain Agents concurrently (Non-blocking parallel swarm)
    const [transportRes, hotelRes, transferRes, activityRes] = await Promise.all([
      TransportAgent.lockSeat(tripId, guestName),
      HotelAgent.reserveSuite(tripId, guestName),
      TransferAgent.lockChauffeur(tripId, guestName),
      ActivityAgent.issuePasses(tripId),
    ]);

    // Update state machine
    BookingStateMachine.updateServiceConfirmation(tripId, 'transport', true, transportRes.pnr);
    BookingStateMachine.updateServiceConfirmation(tripId, 'hotel', true, hotelRes.bookingRef);
    BookingStateMachine.updateServiceConfirmation(tripId, 'transfer', true, transferRes.chauffeurRef);
    BookingStateMachine.updateServiceConfirmation(tripId, 'activities', true, activityRes.passRef);

    EventBus.publish({
      id: `evt_${Date.now()}`,
      type: 'ALL_SERVICES_CONFIRMED',
      tripId,
      agent: 'Booking Orchestrator',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: {
        pnr: transportRes.pnr,
        hotelRef: hotelRes.bookingRef,
        cabRef: transferRes.chauffeurRef,
        passRef: activityRes.passRef,
      },
    });

    return BookingStateMachine.getContext(tripId);
  }
}
