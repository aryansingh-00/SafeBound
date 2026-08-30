/**
 * SafeBound Deterministic Authoritative Pricing Engine
 * 
 * Principle: The LLM/AI layer is responsible for proposing components, but the 
 * deterministic backend engine calculates and enforces the final payable amount.
 */

export interface PricingInput {
  transportCost: number;
  hotelCost: number;
  transferCost: number;
  activitiesCost: number;
  taxRatePercent?: number;
  discountAmount?: number;
}

export interface CalculatedPriceBreakdown {
  transport: number;
  hotel: number;
  transfer: number;
  activities: number;
  subtotal: number;
  taxesAndInsurance: number;
  discounts: number;
  finalTotal: number;
  calculatedAt: string;
  deterministicSignature: string;
}

export class PricingEngine {
  private static DEFAULT_TAX_RATE = 0.05; // 5% GST & SafeBound Escrow Protection

  /**
   * Deterministically calculates itemized components into an authoritative total.
   */
  public static calculate(input: PricingInput): CalculatedPriceBreakdown {
    const transport = Math.max(0, Math.round(input.transportCost));
    const hotel = Math.max(0, Math.round(input.hotelCost));
    const transfer = Math.max(0, Math.round(input.transferCost));
    const activities = Math.max(0, Math.round(input.activitiesCost));
    const discounts = Math.max(0, Math.round(input.discountAmount || 0));

    const subtotal = transport + hotel + transfer + activities;
    const taxRate = input.taxRatePercent !== undefined ? input.taxRatePercent / 100 : this.DEFAULT_TAX_RATE;
    const taxesAndInsurance = Math.round(subtotal * taxRate);

    const finalTotal = Math.max(0, subtotal + taxesAndInsurance - discounts);

    // Cryptographic-style signature verification token
    const deterministicSignature = `SB_CALC_${btoa(
      `${transport}:${hotel}:${transfer}:${activities}:${finalTotal}`
    ).substring(0, 16)}`;

    return {
      transport,
      hotel,
      transfer,
      activities,
      subtotal,
      taxesAndInsurance,
      discounts,
      finalTotal,
      calculatedAt: new Date().toISOString(),
      deterministicSignature,
    };
  }

  /**
   * Validates whether a proposed price matches the backend calculation.
   */
  public static verifyPrice(input: PricingInput, proposedTotal: number): boolean {
    const calculated = this.calculate(input);
    return calculated.finalTotal === proposedTotal;
  }
}
