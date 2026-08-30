import { ParsedTravelIntent } from './decisionTypes';

export class ClarificationEngine {
  /**
   * Generates a single, progressive, targeted clarification question if critical inputs are missing.
   * Principle: Ask only the single most critical missing field, rather than dumping a 10-field form.
   */
  public static generateClarification(intent: ParsedTravelIntent): {
    needsClarification: boolean;
    question?: string;
    field?: string;
    quickOptions?: string[];
  } {
    if (intent.missingCriticalFields.includes('budget')) {
      return {
        needsClarification: true,
        field: 'budget',
        question: `What is your approximate budget for this ${intent.hardConstraints.durationDays}-day trip?`,
        quickOptions: ['Under ₹20,000', '₹20,000 – ₹40,000', '₹40,000 – ₹75,000', 'Flexible'],
      };
    }

    if (intent.missingCriticalFields.includes('duration')) {
      return {
        needsClarification: true,
        field: 'duration',
        question: 'How many days are you planning to travel?',
        quickOptions: ['Weekend (2 Days)', '3–4 Days', '5–7 Days'],
      };
    }

    return { needsClarification: false };
  }
}
