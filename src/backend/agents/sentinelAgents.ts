import { MockWeatherProvider, MockSafetyProvider } from '../providers/mockProviders';

export class WeatherSentinelAgent {
  private static provider = new MockWeatherProvider();

  public static async scanDestination(destination: string, date: string) {
    const data = await this.provider.getForecast(destination, date);
    return {
      agent: 'Weather Sentinel Agent',
      status: 'OPTIMAL' as const,
      data,
      summary: `${destination}: ${data.temperatureC}°C, ${data.condition} (${data.rainProbability}% Rain)`,
    };
  }
}

export class SafetySentinelAgent {
  private static provider = new MockSafetyProvider();

  public static async evaluateCorridor(destination: string) {
    const data = await this.provider.getSafetyScore(destination);
    return {
      agent: 'Safety Sentinel Agent',
      status: 'VERIFIED' as const,
      score: data.safetyScore,
      roadClearance: data.roadClearance,
      verifiedChauffeurAvailable: data.verifiedChauffeurAvailable,
      summary: `Corridor Verified (Score ${data.safetyScore}/100) • Highway Clear`,
    };
  }
}
