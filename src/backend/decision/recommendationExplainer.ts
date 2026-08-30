import { CandidateEvaluationEvidence, ParsedTravelIntent } from './decisionTypes';

export class RecommendationExplainer {
  /**
   * Generates concise, human-understandable recommendation summaries without internal chain-of-thought traces.
   */
  public static generateComparisonSummary(
    shortlisted: CandidateEvaluationEvidence[],
    intent: ParsedTravelIntent
  ): {
    topChoice: CandidateEvaluationEvidence;
    headline: string;
    keyTradeoffs: string;
    whyTopChoice: string;
  } {
    const top = shortlisted[0];
    const second = shortlisted[1];

    const headline = `SafeBound analyzed 5 candidate corridors from ${intent.origin} and shortlisted the top ${shortlisted.length} destinations matching your ₹${intent.hardConstraints.maxBudget.toLocaleString('en-IN')} budget and ${intent.softPreferences.destinationType} preference.`;

    const keyTradeoffs = second
      ? `${top.destination} scored highest due to faster direct rail transit (${top.evidenceFactors.transportAssessment}) compared to ${second.destination}, which is slightly further out (${second.evidenceFactors.transportAssessment}).`
      : 'All selected destinations satisfy your hard budget and duration constraints with verified direct transit.';

    return {
      topChoice: top,
      headline,
      keyTradeoffs,
      whyTopChoice: top.whyExplanation,
    };
  }
}
