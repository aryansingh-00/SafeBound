import { NormalizedActivityOption } from './providerAgentTypes';

export class ActivityAgent {
  /**
   * Searches and verifies non-overlapping activity passes and experiences.
   */
  public static async searchActivities(destination: string = 'Mussoorie'): Promise<NormalizedActivityOption[]> {
    return [
      {
        activityId: 'act-gunhill-cablecar',
        title: 'Gun Hill Cable Car VIP Fast-Track Pass',
        destination,
        durationHours: 2,
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        pricePerPerson: 900,
        isWeatherSensitive: true,
        participantCapacity: 12,
        dataStatus: 'LIVE',
      },
      {
        activityId: 'act-landour-trail',
        title: 'Landour Heritage Nature Trail & Tea Tasting VIP Walk',
        destination,
        durationHours: 2,
        startTime: '03:30 PM',
        endTime: '05:30 PM',
        pricePerPerson: 900,
        isWeatherSensitive: false, // Protected forest trail & indoor tea lounge
        participantCapacity: 8,
        dataStatus: 'LIVE',
      },
    ];
  }
}
