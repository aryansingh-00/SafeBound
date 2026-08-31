export type TestStatus = 'PENDING' | 'RUNNING' | 'PASS' | 'FAIL' | 'SKIPPED';
export type TestCategory =
  | 'HAPPY_PATH'
  | 'PAYMENT'
  | 'PROVIDER'
  | 'AGENT'
  | 'SECURITY'
  | 'RECOVERY'
  | 'IDEMPOTENCY';

export interface TestCase {
  id: string;
  name: string;
  description: string;
  category: TestCategory;
  input: Record<string, unknown>;
  expectedOutput: Record<string, unknown>;
}

export interface TestResult {
  testId: string;
  status: TestStatus;
  actualOutput: Record<string, unknown>;
  passed: boolean;
  failureReason?: string;
  durationMs: number;
  ranAt: string;
}

export interface AgentDimension {
  name: string;
  score: number; // 0-100
}

export interface AgentScore {
  agentName: string;
  overallScore: number;
  dimensions: AgentDimension[];
  passedCases: number;
  totalCases: number;
}

export type SimulationScenario =
  | 'TRAIN_DELAY'
  | 'TRAIN_CANCELLATION'
  | 'HOTEL_SOLD_OUT'
  | 'CAB_UNAVAILABLE'
  | 'ACTIVITY_CANCELLED'
  | 'WEATHER_ALERT'
  | 'PROVIDER_TIMEOUT'
  | 'PRICE_CHANGE'
  | 'PAYMENT_FAILURE';

export interface SimulationEvent {
  id: string;
  scenario: SimulationScenario;
  timestamp: string;
  description: string;
  impact: string;
  resolution: string;
  status: 'TRIGGERED' | 'DETECTED' | 'RESOLVED' | 'AWAITING_APPROVAL' | 'FAILED';
}

export interface ObservabilityTrace {
  tripId: string;
  steps: Array<{
    name: string;
    agent: string;
    durationMs: number;
    status: 'OK' | 'SLOW' | 'ERROR';
  }>;
  totalMs: number;
}

export interface QualityGate {
  id: string;
  label: string;
  description: string;
  passed: boolean;
}

export interface SystemMetrics {
  bookingSuccessRate: number;
  recoverySuccessRate: number;
  duplicateBookingRate: number;
  paymentVerificationRate: number;
  providerFailureRate: number;
  avgRecoveryTimeMs: number;
  priceChangeRate: number;
  agentToolErrorRate: number;
  unauthorizedActionRate: number;
}
