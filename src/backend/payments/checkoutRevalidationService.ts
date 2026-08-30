export interface RevalidationResult {
  isValid: boolean;
  hasPriceChanged: boolean;
  previousPrice: number;
  updatedPrice: number;
  priceDelta: number;
  lockExpiresAt: string;
  secondsRemaining: number;
  revalidationToken: string;
}

export class CheckoutRevalidationService {
  private static packageLocks = new Map<string, { price: number; expiresAt: number; token: string }>();

  /**
   * Revalidates package price & availability and issues/refreshes a 10-minute lock.
   */
  public static revalidateAndLock(
    packageId: string,
    currentPrice: number = 31300,
    simulatePriceHike: boolean = false
  ): RevalidationResult {
    const lockDurationMs = 10 * 60 * 1000; // 10 minutes
    const now = Date.now();
    const expiresAt = now + lockDurationMs;
    const token = `LOCK_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    if (simulatePriceHike) {
      const updatedPrice = currentPrice + 800; // ₹32,100
      this.packageLocks.set(packageId, { price: updatedPrice, expiresAt, token });

      return {
        isValid: false,
        hasPriceChanged: true,
        previousPrice: currentPrice,
        updatedPrice,
        priceDelta: 800,
        lockExpiresAt: new Date(expiresAt).toISOString(),
        secondsRemaining: Math.floor(lockDurationMs / 1000),
        revalidationToken: token,
      };
    }

    this.packageLocks.set(packageId, { price: currentPrice, expiresAt, token });

    return {
      isValid: true,
      hasPriceChanged: false,
      previousPrice: currentPrice,
      updatedPrice: currentPrice,
      priceDelta: 0,
      lockExpiresAt: new Date(expiresAt).toISOString(),
      secondsRemaining: Math.floor(lockDurationMs / 1000),
      revalidationToken: token,
    };
  }

  /**
   * Checks if an existing package lock is still unexpired.
   */
  public static checkLock(packageId: string): { isLocked: boolean; secondsRemaining: number } {
    const lock = this.packageLocks.get(packageId);
    if (!lock) return { isLocked: false, secondsRemaining: 0 };

    const remaining = Math.max(0, Math.floor((lock.expiresAt - Date.now()) / 1000));
    return {
      isLocked: remaining > 0,
      secondsRemaining: remaining,
    };
  }
}
