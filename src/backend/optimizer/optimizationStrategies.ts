import { OptimizationMode } from '../package-builder/packageBuilderTypes';

export interface StrategyDefinition {
  mode: OptimizationMode;
  title: string;
  description: string;
  priorityWeights: {
    priceWeight: number;
    speedWeight: number;
    comfortWeight: number;
    flexibilityWeight: number;
  };
}

export const OPTIMIZATION_STRATEGIES: Record<OptimizationMode, StrategyDefinition> = {
  BEST_VALUE: {
    mode: 'BEST_VALUE',
    title: '🌟 Best Overall Value (Recommended)',
    description: 'Balances savings, 4★ boutique comfort and fast direct rail transit without downgrading experience.',
    priorityWeights: { priceWeight: 0.35, speedWeight: 0.25, comfortWeight: 0.25, flexibilityWeight: 0.15 },
  },
  CHEAPEST: {
    mode: 'CHEAPEST',
    title: '💰 Maximum Budget Savings',
    description: 'Switches to early morning saver trains and comfortable 3★ mountain homestays to maximize cash savings.',
    priorityWeights: { priceWeight: 0.65, speedWeight: 0.10, comfortWeight: 0.15, flexibilityWeight: 0.10 },
  },
  FASTEST: {
    mode: 'FASTEST',
    title: '⚡ Fastest Travel Duration',
    description: 'Prioritizes non-stop high-speed transit and express hill chauffeurs to minimize travel fatigue.',
    priorityWeights: { priceWeight: 0.15, speedWeight: 0.60, comfortWeight: 0.20, flexibilityWeight: 0.05 },
  },
  COMFORT: {
    mode: 'COMFORT',
    title: '👑 Premium Luxury & Comfort',
    description: 'Upgrades to 5★ panoramic luxury suites, private SUV chauffeurs, and flexible dining packages.',
    priorityWeights: { priceWeight: 0.10, speedWeight: 0.20, comfortWeight: 0.60, flexibilityWeight: 0.10 },
  },
  FLEXIBLE: {
    mode: 'FLEXIBLE',
    title: '🛡️ Maximum Free Cancellation Flexibility',
    description: 'Strictly selects 100% refundable refundable tickets and zero-penalty hotel cancellation terms.',
    priorityWeights: { priceWeight: 0.20, speedWeight: 0.15, comfortWeight: 0.20, flexibilityWeight: 0.45 },
  },
  CUSTOM: {
    mode: 'CUSTOM',
    title: '✨ Natural Language Custom Request',
    description: 'Optimizes against specific user directives (e.g. "make it cheaper but keep valley view").',
    priorityWeights: { priceWeight: 0.40, speedWeight: 0.20, comfortWeight: 0.25, flexibilityWeight: 0.15 },
  },
};
