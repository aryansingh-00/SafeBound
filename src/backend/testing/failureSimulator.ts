import { SimulationEvent, SimulationScenario } from './testingTypes';

const log: SimulationEvent[] = [];

const scenarios: Record<SimulationScenario, Omit<SimulationEvent, 'id' | 'timestamp' | 'status'>> = {
  TRAIN_DELAY: {
    scenario: 'TRAIN_DELAY',
    description: 'Vande Bharat Express running +80 minutes late. New arrival: 01:05 PM.',
    impact: 'Transfer pickup at 12:15 PM now conflicts with delayed arrival.',
    resolution: 'Chauffeur pickup rescheduled to 01:35 PM by SafeBound LiveMonitoringEngine.',
  },
  TRAIN_CANCELLATION: {
    scenario: 'TRAIN_CANCELLATION',
    description: 'Vande Bharat Express 12588 CANCELLED by IRCTC.',
    impact: 'All downstream bookings affected — hotel check-in, activities, transfers.',
    resolution: 'Recovery Agent sourcing alternative transport (next train / cab / flight).',
  },
  HOTEL_SOLD_OUT: {
    scenario: 'HOTEL_SOLD_OUT',
    description: 'Cedar View Resort reported room unavailability post-payment.',
    impact: 'Hotel booking in state FAILED. Trip partially unconfirmed.',
    resolution: 'Recovery Agent found 3 alternatives. User approval required for hotel change.',
  },
  CAB_UNAVAILABLE: {
    scenario: 'CAB_UNAVAILABLE',
    description: 'Original hill chauffeur reported vehicle breakdown.',
    impact: 'Station pickup at 01:35 PM has no confirmed vehicle.',
    resolution: 'Auto-selected Option A (₹0 extra): replacement sedan dispatched.',
  },
  ACTIVITY_CANCELLED: {
    scenario: 'ACTIVITY_CANCELLED',
    description: 'George Everest Trek cancelled by provider due to trail maintenance.',
    impact: 'Day 3 activity slot is empty.',
    resolution: 'User approval required to substitute with Camel\'s Back Nature Walk.',
  },
  WEATHER_ALERT: {
    scenario: 'WEATHER_ALERT',
    description: 'IMD issues heavy rain warning for Mussoorie on Sep 17.',
    impact: 'Outdoor activities on Day 3 may be affected.',
    resolution: 'System flagged — no automatic cancellation. User informed to confirm or reschedule.',
  },
  PROVIDER_TIMEOUT: {
    scenario: 'PROVIDER_TIMEOUT',
    description: 'Hotel booking API timed out after 3000ms on first attempt.',
    impact: 'Hotel confirmation pending.',
    resolution: 'Retry #1 successful (fallback endpoint). Booking confirmed with same rate.',
  },
  PRICE_CHANGE: {
    scenario: 'PRICE_CHANGE',
    description: 'Live price revalidation returned ₹32,100 vs. quoted ₹31,300.',
    impact: 'Price increased by ₹800. Checkout blocked.',
    resolution: 'User must review and confirm new price before payment can proceed.',
  },
  PAYMENT_FAILURE: {
    scenario: 'PAYMENT_FAILURE',
    description: 'Razorpay payment attempt failed (card declined).',
    impact: 'No payment captured.',
    resolution: 'Booking NOT started. User can retry with a different payment method.',
  },
};

let activeFullDemo = false;
let demoLog: SimulationEvent[] = [];

export class FailureSimulator {
  public static trigger(scenario: SimulationScenario): SimulationEvent {
    const s = scenarios[scenario];
    const evt: SimulationEvent = {
      id: `SIM_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      status: 'TRIGGERED',
      ...s,
    };
    log.unshift(evt);

    // Simulate async state progression
    setTimeout(() => {
      evt.status = 'DETECTED';
    }, 400);
    setTimeout(() => {
      evt.status = scenario === 'HOTEL_SOLD_OUT' || scenario === 'ACTIVITY_CANCELLED'
        ? 'AWAITING_APPROVAL'
        : 'RESOLVED';
    }, 900);

    return evt;
  }

  /** Runs a scripted full-demo sequence: delay → cab → recovery → approve → update */
  public static async runFullDemo(
    onStep: (step: SimulationEvent, index: number) => void
  ): Promise<void> {
    if (activeFullDemo) return;
    activeFullDemo = true;
    demoLog = [];

    const sequence: SimulationScenario[] = [
      'TRAIN_DELAY',
      'CAB_UNAVAILABLE',
      'HOTEL_SOLD_OUT',
    ];

    for (let i = 0; i < sequence.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      const evt = this.trigger(sequence[i]);
      demoLog.push(evt);
      onStep(evt, i);
    }

    activeFullDemo = false;
  }

  public static getLog(): SimulationEvent[] {
    return [...log];
  }

  public static getDemoLog(): SimulationEvent[] {
    return [...demoLog];
  }
}
