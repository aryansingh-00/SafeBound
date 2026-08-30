export interface ExecutionPhase {
  phaseNumber: number;
  name: string;
  services: ('TRANSPORT' | 'HOTEL' | 'TRANSFER' | 'ACTIVITY' | 'VERIFICATION')[];
  isParallel: boolean;
  dependencyRationale: string;
}

export class ServiceDependencyGraph {
  /**
   * Returns deterministic execution phases satisfying service dependencies.
   */
  public static getExecutionPhases(): ExecutionPhase[] {
    return [
      {
        phaseNumber: 1,
        name: 'Primary In-Transit & Stay Concurrency',
        services: ['TRANSPORT', 'HOTEL'],
        isParallel: true,
        dependencyRationale: 'Transport PNR locking and Hotel suite reservation can execute concurrently with zero race conditions.',
      },
      {
        phaseNumber: 2,
        name: 'Arrival-Synchronized Ground Transfer',
        services: ['TRANSFER'],
        isParallel: false,
        dependencyRationale: 'Station-to-hotel chauffeur window depends on verified Transport arrival time (11:45 AM).',
      },
      {
        phaseNumber: 3,
        name: 'Curated Activities & Passes',
        services: ['ACTIVITY'],
        isParallel: false,
        dependencyRationale: 'VIP cable car passes & heritage trails depend on hotel check-in and local destination presence.',
      },
      {
        phaseNumber: 4,
        name: 'Cryptographic Cross-Verification',
        services: ['VERIFICATION'],
        isParallel: false,
        dependencyRationale: 'Cross-validates all 4 supplier tokens before releasing itinerary and locking Escrow release milestones.',
      },
    ];
  }
}
