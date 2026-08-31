import { AuditEvent, AuditEventType, SecurityMetrics, UserRole } from './securityTypes';

let auditLog: AuditEvent[] = [];
let metrics: SecurityMetrics = {
  activeSessions: 1,
  failedLogins: 3,
  webhookErrors: 2,
  apiErrors: 7,
  suspiciousEvents: 1,
  aiToolCalls: 0,
  aiToolsBlocked: 0,
  totalAuditEvents: 0,
};

export class AuditLogger {
  public static record(params: {
    type: AuditEventType;
    actor: string;
    actorRole: UserRole;
    resource: string;
    action: string;
    result: 'SUCCESS' | 'DENIED' | 'FAILED';
    transactionId?: string;
    metadata?: Record<string, string | number | boolean>;
  }): AuditEvent {
    const event: AuditEvent = {
      eventId: `AUD_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      ...params,
    };

    auditLog = [event, ...auditLog];
    metrics.totalAuditEvents += 1;

    if (params.type === 'AI_TOOL_CALLED') metrics.aiToolCalls += 1;
    if (params.type === 'AI_TOOL_BLOCKED') {
      metrics.aiToolCalls += 1;
      metrics.aiToolsBlocked += 1;
    }
    if (params.type === 'SUSPICIOUS_ACTIVITY') metrics.suspiciousEvents += 1;
    if (params.type === 'WEBHOOK_REJECTED') metrics.webhookErrors += 1;

    return event;
  }

  public static getLog(limit = 50): AuditEvent[] {
    return auditLog.slice(0, limit);
  }

  public static getMetrics(): SecurityMetrics {
    return { ...metrics };
  }

  public static incrementFailedLogin(): void {
    metrics.failedLogins += 1;
    this.record({
      type: 'SUSPICIOUS_ACTIVITY',
      actor: 'unknown',
      actorRole: 'USER',
      resource: 'auth:login',
      action: 'FAILED_LOGIN',
      result: 'DENIED',
    });
  }

  public static seedDemoEvents(): void {
    if (auditLog.length > 0) return;

    const seedEvents: Array<{
      type: AuditEventType;
      actor: string;
      actorRole: UserRole;
      resource: string;
      action: string;
      result: 'SUCCESS' | 'DENIED' | 'FAILED';
    }> = [
      { type: 'USER_LOGIN', actor: 'aryansingh@example.com', actorRole: 'USER', resource: 'session:SES_INIT', action: 'LOGIN', result: 'SUCCESS' },
      { type: 'PACKAGE_SELECTED', actor: 'aryansingh@example.com', actorRole: 'USER', resource: 'trip:SB-TRIP-MUSSOORIE-4D', action: 'SELECT_PACKAGE', result: 'SUCCESS' },
      { type: 'TRAVELLER_SNAPSHOT_CREATED', actor: 'aryansingh@example.com', actorRole: 'USER', resource: 'traveller:TRV_ARYAN_01', action: 'SNAPSHOT', result: 'SUCCESS' },
      { type: 'PAYMENT_CREATED', actor: 'aryansingh@example.com', actorRole: 'USER', resource: 'payment:PAY-31300', action: 'CREATE_ORDER', result: 'SUCCESS' },
      { type: 'PAYMENT_VERIFIED', actor: 'SYSTEM', actorRole: 'SYSTEM', resource: 'payment:PAY-31300', action: 'VERIFY_RAZORPAY', result: 'SUCCESS' },
      { type: 'BOOKING_STARTED', actor: 'SYSTEM', actorRole: 'SYSTEM', resource: 'trip:SB-TRIP-MUSSOORIE-4D', action: 'START_ORCHESTRATION', result: 'SUCCESS' },
      { type: 'BOOKING_CONFIRMED', actor: 'SYSTEM', actorRole: 'SYSTEM', resource: 'trip:SB-TRIP-MUSSOORIE-4D', action: 'ALL_CONFIRMED', result: 'SUCCESS' },
      { type: 'WEBHOOK_RECEIVED', actor: 'razorpay', actorRole: 'SYSTEM', resource: 'webhook:rzp_evt', action: 'PAYMENT_CAPTURED', result: 'SUCCESS' },
      { type: 'WEBHOOK_VERIFIED', actor: 'SYSTEM', actorRole: 'SYSTEM', resource: 'webhook:rzp_evt', action: 'SIGNATURE_CHECK', result: 'SUCCESS' },
    ];

    seedEvents.reverse().forEach((e) => this.record(e));
  }
}
