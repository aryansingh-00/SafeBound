import { 
  DisruptionImpactReport, 
  RecoveryOptionItem, 
  ActiveRecoveryState 
} from '../monitoring/monitoringTypes';
import { RecoveryPolicyManager } from './recoveryPolicyManager';
import { ItineraryUpdater } from '../monitoring/itineraryUpdater';
import { EventBus } from '../events/eventBus';

export class DisruptionRecoveryEngine {
  private static activeRecoveries = new Map<string, ActiveRecoveryState>();

  /**
   * Generates structured 3-tier recovery options for a detected disruption.
   */
  public static generateRecoveryPlan(
    tripId: string,
    impactReport: DisruptionImpactReport
  ): ActiveRecoveryState {
    const recoveryId = `REC_${Date.now()}_${Math.floor(100 + Math.random() * 900)}`;

    const options: RecoveryOptionItem[] = [
      {
        id: 'opt-shift-window',
        type: 'MODIFY_EXISTING_TRANSFER',
        title: 'Adjust Dedicated Chauffeur Window to 01:35 PM',
        description: 'SafeBound signals your assigned driver to adjust the Dehradun station standby window to match your 1:05 PM train arrival.',
        newPickupTime: '01:35 PM',
        priceDelta: 0,
        isAutoExecutable: RecoveryPolicyManager.canAutoExecute('MODIFY_EXISTING_TRANSFER', 0),
        isBestValue: true,
      },
      {
        id: 'opt-express-sedan',
        type: 'BOOK_EXPRESS_REPLACEMENT',
        title: 'Priority Express Hill Sedan',
        description: 'Dispatches dedicated standby vehicle with immediate platform luggage concierge.',
        newPickupTime: '01:25 PM',
        priceDelta: 300,
        isAutoExecutable: false,
        isBestValue: false,
      },
      {
        id: 'opt-innova-suv',
        type: 'UPGRADE_SUV_CHAUFFEUR',
        title: 'Upgrade to Luxury Toyota Innova Crysta SUV',
        description: 'Upgrades your hill transfer to a spacious luxury SUV for the uphill climb to Mussoorie.',
        newPickupTime: '01:35 PM',
        priceDelta: 900,
        isAutoExecutable: false,
        isBestValue: false,
      },
    ];

    const recoveryState: ActiveRecoveryState = {
      recoveryId,
      tripId,
      disruptionReport: impactReport,
      options,
      status: 'AWAITING_USER_APPROVAL',
    };

    this.activeRecoveries.set(tripId, recoveryState);

    EventBus.publish({
      id: `evt_rec_plan_${Date.now()}`,
      type: 'RECOVERY_OPTIONS_GENERATED',
      tripId,
      agent: 'Disruption Recovery Engine',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: {
        recoveryId,
        optionsCount: options.length,
        bestValueOption: options[0].title,
      },
    });

    return recoveryState;
  }

  /**
   * Executes the chosen recovery option, mutates the live journey timeline graph, and emits notifications.
   */
  public static executeRecoveryOption(
    tripId: string,
    optionId: string
  ): { resolved: boolean; summary: string } {
    const recoveryState = this.activeRecoveries.get(tripId);
    if (!recoveryState) {
      return { resolved: false, summary: 'No active recovery session found.' };
    }

    const selectedOption = recoveryState.options.find((o) => o.id === optionId) || recoveryState.options[0];

    // 1. Mutate confirmed itinerary graph
    ItineraryUpdater.updateTransferPickup(tripId, selectedOption.newPickupTime);

    // 2. Mark state resolved
    recoveryState.status = 'RESOLVED';
    recoveryState.resolvedActionSummary = `SafeBound moved your Dehradun station pickup to ${selectedOption.newPickupTime}. Your driver and itinerary have been updated.`;
    this.activeRecoveries.set(tripId, recoveryState);

    EventBus.publish({
      id: `evt_rec_resolved_${Date.now()}`,
      type: 'RECOVERY_RESOLVED_AND_ITINERARY_UPDATED',
      tripId,
      agent: 'Live Trip Monitoring Engine',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: {
        resolvedPickupTime: selectedOption.newPickupTime,
        priceDelta: selectedOption.priceDelta,
        summary: recoveryState.resolvedActionSummary,
      },
    });

    return { resolved: true, summary: recoveryState.resolvedActionSummary };
  }

  public static getActiveRecovery(tripId: string): ActiveRecoveryState | undefined {
    return this.activeRecoveries.get(tripId);
  }
}
