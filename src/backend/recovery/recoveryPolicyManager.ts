export class RecoveryPolicyManager {
  /**
   * Evaluates whether a recovery option can be auto-executed or requires explicit 1-click user approval.
   */
  public static canAutoExecute(actionType: string, priceDelta: number): boolean {
    if (priceDelta > 0) {
      // Any additional cost strictly requires user approval
      return false;
    }

    if (actionType === 'MODIFY_EXISTING_TRANSFER') {
      // No-cost flexible transfer window shift is permitted for auto-action
      return true;
    }

    return false;
  }
}
