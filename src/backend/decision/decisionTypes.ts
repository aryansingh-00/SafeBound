export interface ParsedTravelIntent {
  origin: string;
  month?: string;
  hardConstraints: {
    maxBudget: number;
    durationDays: number;
    travellersCount: number;
    originCity: string;
  };
  softPreferences: {
    destinationType: string;
    experienceVibe: string;
    transportModePreferred: string;
    comfortableBudgetTarget?: number;
    hotelTier: string;
    weatherAvoid: string[];
    safetyPriority: 'normal' | 'high' | 'very_high';
  };
  missingCriticalFields: string[];
}

export interface CandidateEvaluationEvidence {
  destination: string;
  state: string;
  totalScore: number;
  hardConstraintPassed: boolean;
  packageEstimatedPrice: number;
  scores: {
    budgetFit: number;
    weatherFit: number;
    preferenceMatch: number;
    travelConvenience: number;
    safetySignals: number;
    experienceVibe: number;
  };
  evidenceFactors: {
    budgetAssessment: string;
    weatherAssessment: string;
    transportAssessment: string;
    hotelAssessment: string;
    safetyAssessment: string;
  };
  whyExplanation: string;
  packageId?: string;
}

export interface DecisionScoringWeights {
  budget: number;
  weather: number;
  preference: number;
  convenience: number;
  safety: number;
  experience: number;
}

export const DEFAULT_SCORING_WEIGHTS: DecisionScoringWeights = {
  budget: 0.25,
  weather: 0.20,
  preference: 0.20,
  convenience: 0.15,
  safety: 0.10,
  experience: 0.10,
};

export const HIGH_SAFETY_SCORING_WEIGHTS: DecisionScoringWeights = {
  budget: 0.25,
  safety: 0.25,
  weather: 0.15,
  convenience: 0.15,
  preference: 0.15,
  experience: 0.05,
};
