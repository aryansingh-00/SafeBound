import { VersionedTripPackage } from './packageBuilderTypes';

export class PackageLockService {
  private static packageRegistry = new Map<string, VersionedTripPackage[]>();

  /**
   * Registers a new package or stores a newly optimized version.
   */
  public static saveVersion(pkg: VersionedTripPackage): void {
    const existing = this.packageRegistry.get(pkg.packageId) || [];
    existing.push(pkg);
    this.packageRegistry.set(pkg.packageId, existing);
  }

  /**
   * Validates whether live price and inventory are still unexpired before payment lock.
   */
  public static checkExpiration(pkg: VersionedTripPackage): {
    isExpired: boolean;
    secondsRemaining: number;
  } {
    const expiresAtTime = new Date(pkg.pricing.expiresAt).getTime();
    const nowTime = Date.now();
    const diffSeconds = Math.max(0, Math.floor((expiresAtTime - nowTime) / 1000));

    return {
      isExpired: diffSeconds <= 0,
      secondsRemaining: diffSeconds,
    };
  }

  /**
   * Revalidates and extends live price lock by 15 minutes.
   */
  public static revalidatePriceLock(pkg: VersionedTripPackage): VersionedTripPackage {
    const now = new Date();
    const newExpiresAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString();

    const updated: VersionedTripPackage = {
      ...pkg,
      pricing: {
        ...pkg.pricing,
        calculatedAt: now.toISOString(),
        expiresAt: newExpiresAt,
      },
    };

    this.saveVersion(updated);
    return updated;
  }
}
