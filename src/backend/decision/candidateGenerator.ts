import { ParsedTravelIntent } from './decisionTypes';

export interface RawCandidateOption {
  destination: string;
  state: string;
  type: string;
  packagePrice: number;
  hotelRating: number;
  hotelStars: number;
  hotelPrice: number;
  transportMode: 'TRAIN' | 'FLIGHT' | 'CAR';
  transportDurationHours: number;
  transportDirect: boolean;
  weatherRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  weatherTemp: number;
  safetyScore: number;
  curatedActivitiesCount: number;
}

export class CandidateGenerator {
  /**
   * Generates destination candidates from knowledge base and applies hard constraint filtering.
   */
  public static generateCandidates(intent: ParsedTravelIntent): {
    evaluatedCandidates: RawCandidateOption[];
    hardFilteredOut: { destination: string; reason: string }[];
  } {
    const rawDataset: RawCandidateOption[] = [
      {
        destination: 'Mussoorie',
        state: 'Uttarakhand',
        type: 'mountain',
        packagePrice: 31300,
        hotelRating: 4.8,
        hotelStars: 4,
        hotelPrice: 19200,
        transportMode: 'TRAIN',
        transportDurationHours: 5.5,
        transportDirect: true,
        weatherRisk: 'LOW',
        weatherTemp: 22,
        safetyScore: 94,
        curatedActivitiesCount: 3,
      },
      {
        destination: 'Dharamshala',
        state: 'Himachal Pradesh',
        type: 'mountain',
        packagePrice: 34200,
        hotelRating: 4.7,
        hotelStars: 4,
        hotelPrice: 18800,
        transportMode: 'TRAIN',
        transportDurationHours: 8.5,
        transportDirect: false,
        weatherRisk: 'LOW',
        weatherTemp: 20,
        safetyScore: 92,
        curatedActivitiesCount: 4,
      },
      {
        destination: 'Nainital',
        state: 'Uttarakhand',
        type: 'mountain',
        packagePrice: 32800,
        hotelRating: 4.6,
        hotelStars: 4,
        hotelPrice: 18000,
        transportMode: 'TRAIN',
        transportDurationHours: 6.0,
        transportDirect: true,
        weatherRisk: 'LOW',
        weatherTemp: 21,
        safetyScore: 91,
        curatedActivitiesCount: 3,
      },
      {
        destination: 'Manali',
        state: 'Himachal Pradesh',
        type: 'mountain',
        packagePrice: 46800,
        hotelRating: 4.7,
        hotelStars: 4,
        hotelPrice: 24000,
        transportMode: 'CAR',
        transportDurationHours: 12.0,
        transportDirect: true,
        weatherRisk: 'MEDIUM',
        weatherTemp: 18,
        safetyScore: 89,
        curatedActivitiesCount: 5,
      },
      {
        destination: 'Rishikesh',
        state: 'Uttarakhand',
        type: 'mountain',
        packagePrice: 24500,
        hotelRating: 4.6,
        hotelStars: 4,
        hotelPrice: 14000,
        transportMode: 'TRAIN',
        transportDurationHours: 4.5,
        transportDirect: true,
        weatherRisk: 'LOW',
        weatherTemp: 27,
        safetyScore: 93,
        curatedActivitiesCount: 4,
      },
    ];

    const hardFilteredOut: { destination: string; reason: string }[] = [];
    const evaluatedCandidates: RawCandidateOption[] = [];

    rawDataset.forEach((c) => {
      // 1. Check Hard Budget Constraint
      if (c.packagePrice > intent.hardConstraints.maxBudget) {
        hardFilteredOut.push({
          destination: c.destination,
          reason: `Total package price (₹${c.packagePrice.toLocaleString('en-IN')}) exceeds hard budget limit of ₹${intent.hardConstraints.maxBudget.toLocaleString('en-IN')}.`,
        });
        return;
      }

      // 2. Check Weather Avoidance Constraint
      if (intent.softPreferences.weatherAvoid.includes('heavy_rain') && c.weatherRisk === 'HIGH') {
        hardFilteredOut.push({
          destination: c.destination,
          reason: `High monsoon cloudburst risk detected during selected period.`,
        });
        return;
      }

      evaluatedCandidates.push(c);
    });

    return { evaluatedCandidates, hardFilteredOut };
  }
}
