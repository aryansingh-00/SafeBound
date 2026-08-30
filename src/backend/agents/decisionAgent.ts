import { StructuredTripRequirements } from '../types/backendTypes';

export interface DestinationScoreResult {
  destination: string;
  state: string;
  totalScore: number;
  breakdown: {
    budgetFit: number;
    weatherFit: number;
    travelConvenience: number;
    preferenceMatch: number;
    safetySignals: number;
    experienceVibe: number;
  };
  rationale: string;
}

export class DecisionAgent {
  // Configurable weights (not hardcoded in prompts)
  private static WEIGHTS = {
    budget: 0.25,
    weather: 0.20,
    convenience: 0.15,
    preference: 0.20,
    safety: 0.10,
    experience: 0.10,
  };

  /**
   * Evaluates destination candidates against hard constraints and weighted preferences.
   */
  public static evaluateCandidates(
    requirements: StructuredTripRequirements
  ): DestinationScoreResult[] {
    const candidates = [
      { name: 'Mussoorie', state: 'Uttarakhand', estCost: 31300, baseSafety: 94, weatherRating: 95, convenience: 92, type: 'mountain' },
      { name: 'Dharamshala', state: 'Himachal Pradesh', estCost: 34200, baseSafety: 92, weatherRating: 90, convenience: 88, type: 'mountain' },
      { name: 'Nainital', state: 'Uttarakhand', estCost: 32800, baseSafety: 91, weatherRating: 88, convenience: 90, type: 'mountain' },
      { name: 'Manali', state: 'Himachal Pradesh', estCost: 35400, baseSafety: 89, weatherRating: 86, convenience: 84, type: 'mountain' },
    ];

    return candidates
      // 1. Hard constraint filtering
      .filter((c) => c.estCost <= requirements.hardConstraints.maxBudget)
      // 2. Weighted scoring
      .map((c) => {
        const budgetFit = Math.min(100, Math.round((1 - (c.estCost - 25000) / 25000) * 100));
        const weatherFit = c.weatherRating;
        const travelConvenience = c.convenience;
        const preferenceMatch = requirements.preferences.destinationTypes.some((t) => t.toLowerCase().includes(c.type)) ? 96 : 70;
        const safetySignals = c.baseSafety;
        const experienceVibe = 94;

        const totalScore = Math.round(
          budgetFit * this.WEIGHTS.budget +
          weatherFit * this.WEIGHTS.weather +
          travelConvenience * this.WEIGHTS.convenience +
          preferenceMatch * this.WEIGHTS.preference +
          safetySignals * this.WEIGHTS.safety +
          experienceVibe * this.WEIGHTS.experience
        );

        return {
          destination: c.name,
          state: c.state,
          totalScore,
          breakdown: {
            budgetFit,
            weatherFit,
            travelConvenience,
            preferenceMatch,
            safetySignals,
            experienceVibe,
          },
          rationale: `Optimal 4-day match under ₹${requirements.hardConstraints.maxBudget.toLocaleString('en-IN')}: 06:20 AM Vande Bharat direct to Dehradun, 4.8★ valley resort, and pleasant 22°C IMD radar.`,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);
  }
}
