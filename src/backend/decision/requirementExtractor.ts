import { ParsedTravelIntent } from './decisionTypes';

export class RequirementExtractor {
  /**
   * Transforms freeform natural language text into structured intent, separating hard constraints from soft preferences.
   */
  public static extract(prompt: string, userProfileDefaults?: any): ParsedTravelIntent {
    const text = prompt.toLowerCase();
    const missing: string[] = [];

    // 1. Origin Extraction
    let originCity = userProfileDefaults?.homeCity || 'Delhi';
    const originMatch = text.match(/(?:from|starting from|origin:?)\s+([a-zA-Z\s]+?)(?:\s+(?:to|for|under|in|with)|\.|\,|$)/i);
    if (originMatch) {
      originCity = originMatch[1].trim();
    }

    // 2. Duration Extraction
    let durationDays = 4;
    const durationMatch = text.match(/(\d+)\s*(?:day|days|d|nights|n)/i);
    if (durationMatch) {
      durationDays = parseInt(durationMatch[1], 10);
    } else if (text.includes('weekend')) {
      durationDays = 2;
    } else if (text.includes('week')) {
      durationDays = 7;
    } else {
      missing.push('duration');
    }

    // 3. Travellers Count
    let travellersCount = 2;
    const travellersMatch = text.match(/(\d+)\s*(?:people|person|persons|travellers|travelers|pax|adults|friends)/i);
    if (travellersMatch) {
      travellersCount = parseInt(travellersMatch[1], 10);
    } else if (text.includes('solo') || text.includes('for myself') || text.includes('for 1')) {
      travellersCount = 1;
    } else if (text.includes('couple') || text.includes('for two') || text.includes('for 2')) {
      travellersCount = 2;
    } else if (text.includes('family')) {
      travellersCount = 4;
    }

    // 4. Budget Boundaries (Hard Maximum vs Comfortable Target)
    let maxBudget = 40000;
    let comfortableBudgetTarget: number | undefined = undefined;

    const budgetKMatch = text.match(/(?:under|below|budget|within|up to|max)\s*₹?\s*(\d+)k/i);
    const fullNumberMatch = text.match(/(?:under|below|budget|within|up to|max)\s*₹?\s*(\d{4,6})/i);

    if (budgetKMatch) {
      maxBudget = parseInt(budgetKMatch[1], 10) * 1000;
    } else if (fullNumberMatch) {
      maxBudget = parseInt(fullNumberMatch[1], 10);
    } else {
      const standaloneNum = text.match(/₹?\s*(\d+)k/i);
      if (standaloneNum) {
        maxBudget = parseInt(standaloneNum[1], 10) * 1000;
      } else {
        missing.push('budget');
      }
    }

    // Check for target vs maximum (e.g. "prefer around 30k")
    const targetMatch = text.match(/(?:prefer|around|aiming for|target)\s*₹?\s*(\d+)(?:k|,\d+)?/i);
    if (targetMatch) {
      const raw = targetMatch[1];
      comfortableBudgetTarget = text.includes(`${raw}k`) ? parseInt(raw, 10) * 1000 : parseInt(raw.replace(',', ''), 10);
    }

    // 5. Month Extraction
    let month: string | undefined = undefined;
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    for (const m of months) {
      if (text.includes(m)) {
        month = m.charAt(0).toUpperCase() + m.slice(1);
        break;
      }
    }

    // 6. Destination Type & Vibe Preferences
    let destinationType = 'mountain';
    if (text.includes('beach') || text.includes('coastal') || text.includes('sea')) {
      destinationType = 'beach';
    } else if (text.includes('heritage') || text.includes('fort') || text.includes('palace') || text.includes('culture')) {
      destinationType = 'culture';
    } else if (text.includes('wildlife') || text.includes('safari') || text.includes('jungle')) {
      destinationType = 'wildlife';
    }

    let experienceVibe = 'peaceful';
    if (text.includes('adventure') || text.includes('trekking') || text.includes('rafting')) {
      experienceVibe = 'adventure';
    } else if (text.includes('romantic') || text.includes('honeymoon')) {
      experienceVibe = 'romantic';
    }

    // 7. Transport Preference
    let transportModePreferred = 'train';
    if (text.includes('flight') || text.includes('air') || text.includes('fly')) {
      transportModePreferred = 'flight';
    } else if (text.includes('drive') || text.includes('car') || text.includes('cab')) {
      transportModePreferred = 'car';
    } else if (text.includes('bus') || text.includes('volvo')) {
      transportModePreferred = 'bus';
    }

    // 8. Weather Avoidance
    const weatherAvoid: string[] = [];
    if (text.includes('rain') || text.includes('monsoon') || text.includes('wet') || text.includes("don't want rain")) {
      weatherAvoid.push('heavy_rain');
    }
    if (text.includes('heat') || text.includes('hot')) {
      weatherAvoid.push('excessive_heat');
    }

    // 9. Safety Priority
    let safetyPriority: 'normal' | 'high' | 'very_high' = 'high';
    if (text.includes('very safe') || text.includes('safety is very important') || text.includes('highest safety')) {
      safetyPriority = 'very_high';
    } else if (text.includes('budget priority') || text.includes('cheap')) {
      safetyPriority = 'normal';
    }

    return {
      origin: originCity,
      month,
      hardConstraints: {
        maxBudget,
        durationDays,
        travellersCount,
        originCity,
      },
      softPreferences: {
        destinationType,
        experienceVibe,
        transportModePreferred,
        comfortableBudgetTarget,
        hotelTier: text.includes('5 star') || text.includes('luxury') ? '5★ Luxury' : '4★ Upscale & Boutique',
        weatherAvoid,
        safetyPriority,
      },
      missingCriticalFields: missing,
    };
  }
}
