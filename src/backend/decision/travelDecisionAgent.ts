import { RequirementExtractor } from './requirementExtractor';
import { ClarificationEngine } from './clarificationEngine';
import { CandidateGenerator } from './candidateGenerator';
import { EvidenceScorer } from './evidenceScorer';
import { RecommendationExplainer } from './recommendationExplainer';
import { 
  ParsedTravelIntent, 
  CandidateEvaluationEvidence, 
  DecisionScoringWeights 
} from './decisionTypes';
import { EventBus } from '../events/eventBus';

export interface DecisionAgentExecutionReport {
  sessionId: string;
  status: 'READY' | 'NEEDS_CLARIFICATION' | 'NO_CANDIDATES_FOUND';
  clarificationQuestion?: string;
  parsedIntent: ParsedTravelIntent;
  hardFilteredOut: { destination: string; reason: string }[];
  rankedCandidates: CandidateEvaluationEvidence[];
  summaryExplanation: {
    headline: string;
    keyTradeoffs: string;
    whyTopChoice: string;
  };
  durationMs: number;
}

export class TravelDecisionAgent {
  // Session memory for contextual follow-ups ("make it cheaper", "prefer flights")
  private static sessionMemory = new Map<string, ParsedTravelIntent>();

  /**
   * Primary entrypoint: Translates natural language into a structured, constraint-aware decision.
   */
  public static async executeDecision(
    prompt: string,
    sessionId: string = `SESSION_${Date.now()}`,
    customWeights?: DecisionScoringWeights
  ): Promise<DecisionAgentExecutionReport> {
    const startTime = Date.now();

    // 1. Requirement Extraction (with session memory fallback)
    const priorContext = this.sessionMemory.get(sessionId);
    let parsedIntent = RequirementExtractor.extract(prompt, priorContext);

    // Contextual modifier handling: "make it cheaper"
    if (prompt.toLowerCase().includes('cheaper') && priorContext) {
      parsedIntent.hardConstraints.maxBudget = Math.round(priorContext.hardConstraints.maxBudget * 0.8);
    }

    this.sessionMemory.set(sessionId, parsedIntent);

    // 2. Clarification Engine Check
    const clarification = ClarificationEngine.generateClarification(parsedIntent);
    if (clarification.needsClarification) {
      return {
        sessionId,
        status: 'NEEDS_CLARIFICATION',
        clarificationQuestion: clarification.question,
        parsedIntent,
        hardFilteredOut: [],
        rankedCandidates: [],
        summaryExplanation: {
          headline: 'SafeBound requires a few more details to find optimal packages.',
          keyTradeoffs: '',
          whyTopChoice: '',
        },
        durationMs: Date.now() - startTime,
      };
    }

    // 3. Candidate Generation & Hard Constraint Filtering
    const { evaluatedCandidates, hardFilteredOut } = CandidateGenerator.generateCandidates(parsedIntent);

    if (evaluatedCandidates.length === 0) {
      return {
        sessionId,
        status: 'NO_CANDIDATES_FOUND',
        parsedIntent,
        hardFilteredOut,
        rankedCandidates: [],
        summaryExplanation: {
          headline: 'No destinations met your hard budget constraint.',
          keyTradeoffs: 'Try increasing budget or shortening duration.',
          whyTopChoice: '',
        },
        durationMs: Date.now() - startTime,
      };
    }

    // 4. Evidence-Based Scoring with Configurable Weights
    const rankedCandidates = EvidenceScorer.scoreCandidates(
      evaluatedCandidates,
      parsedIntent,
      customWeights
    );

    // 5. User-Facing Recommendation Explanation Synthesis
    const summaryExplanation = RecommendationExplainer.generateComparisonSummary(
      rankedCandidates,
      parsedIntent
    );

    const durationMs = Date.now() - startTime;

    EventBus.publish({
      id: `evt_dec_${Date.now()}`,
      type: 'DECISION_AGENT_EVALUATED',
      tripId: rankedCandidates[0]?.packageId || 'TRIP_DECISION',
      agent: 'AI Travel Decision Agent',
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      payload: {
        topChoice: rankedCandidates[0]?.destination,
        matchScore: rankedCandidates[0]?.totalScore,
        candidatesEvaluated: evaluatedCandidates.length,
        hardFilteredCount: hardFilteredOut.length,
        durationMs,
      },
    });

    return {
      sessionId,
      status: 'READY',
      parsedIntent,
      hardFilteredOut,
      rankedCandidates,
      summaryExplanation,
      durationMs,
    };
  }
}
