import { ProviderHealthMetric, ProviderErrorCode } from './providerAgentTypes';
import { EventBus } from '../events/eventBus';

export class ProviderAdapterRegistry {
  private static healthMetrics: ProviderHealthMetric[] = [
    {
      providerId: 'prv-irctc-direct',
      name: 'Indian Railways (IRCTC Direct GDS)',
      domain: 'TRANSPORT',
      status: 'OPERATIONAL',
      latencyMs: 310,
      errorRatePercent: 0.2,
      lastSuccessfulRequest: new Date().toLocaleTimeString('en-US', { hour12: false }),
    },
    {
      providerId: 'prv-amadeus-flight',
      name: 'Amadeus Airline GDS',
      domain: 'TRANSPORT',
      status: 'OPERATIONAL',
      latencyMs: 420,
      errorRatePercent: 0.5,
      lastSuccessfulRequest: new Date().toLocaleTimeString('en-US', { hour12: false }),
    },
    {
      providerId: 'prv-hotel-pms',
      name: 'Boutique Hill PMS Network',
      domain: 'HOTEL',
      status: 'OPERATIONAL',
      latencyMs: 280,
      errorRatePercent: 0.1,
      lastSuccessfulRequest: new Date().toLocaleTimeString('en-US', { hour12: false }),
    },
    {
      providerId: 'prv-safebound-fleet',
      name: 'SafeBound Hill Chauffeur Fleet API',
      domain: 'TRANSFER',
      status: 'OPERATIONAL',
      latencyMs: 190,
      errorRatePercent: 0.0,
      lastSuccessfulRequest: new Date().toLocaleTimeString('en-US', { hour12: false }),
    },
    {
      providerId: 'prv-imd-doppler',
      name: 'India Meteorological Dept (IMD Radar)',
      domain: 'WEATHER',
      status: 'OPERATIONAL',
      latencyMs: 150,
      errorRatePercent: 0.0,
      lastSuccessfulRequest: new Date().toLocaleTimeString('en-US', { hour12: false }),
    },
    {
      providerId: 'prv-corridor-safety',
      name: 'National Highway & Hill Road Security',
      domain: 'SAFETY',
      status: 'OPERATIONAL',
      latencyMs: 140,
      errorRatePercent: 0.0,
      lastSuccessfulRequest: new Date().toLocaleTimeString('en-US', { hour12: false }),
    },
  ];

  public static getHealthMetrics(): ProviderHealthMetric[] {
    return [...this.healthMetrics];
  }

  /**
   * Simulates provider failover (e.g. Primary Adapter Timeout -> Secondary Fallback Adapter).
   */
  public static async executeWithFailover<T>(
    primaryProviderName: string,
    fallbackProviderName: string,
    simulatePrimaryTimeout: boolean,
    executeOperation: () => Promise<T>
  ): Promise<{ result: T; usedProvider: string; didFailover: boolean }> {
    if (simulatePrimaryTimeout) {
      EventBus.publish({
        id: `evt_failover_${Date.now()}`,
        type: 'PROVIDER_FAILOVER_TRIGGERED',
        tripId: 'PROVIDER_REGISTRY',
        agent: 'Provider Adapter Registry',
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        payload: {
          primaryProvider: primaryProviderName,
          error: 'TIMEOUT (4000ms exceeded)',
          fallbackProvider: fallbackProviderName,
        },
      });

      // Execute on fallback provider
      const result = await executeOperation();
      return { result, usedProvider: fallbackProviderName, didFailover: true };
    }

    const result = await executeOperation();
    return { result, usedProvider: primaryProviderName, didFailover: false };
  }
}
