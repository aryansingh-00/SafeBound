export type UserRole = 'USER' | 'SUPPORT' | 'ADMIN' | 'SYSTEM';
export type AuthDecision = 'ALLOW' | 'DENY';
export type AuditEventType =
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'TRAVELLER_UPDATED'
  | 'TRAVELLER_SNAPSHOT_CREATED'
  | 'PACKAGE_SELECTED'
  | 'PAYMENT_CREATED'
  | 'PAYMENT_VERIFIED'
  | 'BOOKING_STARTED'
  | 'BOOKING_CONFIRMED'
  | 'AI_TOOL_CALLED'
  | 'AI_TOOL_BLOCKED'
  | 'RECOVERY_STARTED'
  | 'USER_APPROVAL_REQUESTED'
  | 'USER_APPROVED'
  | 'USER_REJECTED'
  | 'REFUND_REQUESTED'
  | 'WEBHOOK_RECEIVED'
  | 'WEBHOOK_VERIFIED'
  | 'WEBHOOK_REJECTED'
  | 'SUSPICIOUS_ACTIVITY';

export interface SessionToken {
  sessionId: string;
  userId: string;
  role: UserRole;
  email: string;
  displayName: string;
  issuedAt: string;
  expiresAt: string;
  isValid: boolean;
}

export interface TravellerProfile {
  travellerId: string;
  userId: string;
  name: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  email: string;
  phone: string;
}

export interface TravellerSnapshot {
  snapshotId: string;
  tripId: string;
  travellerId: string;
  takenAt: string;
  confirmedByUser: boolean;
  // Snapshot fields — immutable once confirmed
  name: string;
  dateOfBirth: string;
  gender: string;
}

export interface ActionPolicy {
  action: string;
  label: string;
  automatic: boolean;
  maxAdditionalCostRupees: number;
  requiresUserApproval: boolean;
  description: string;
}

export interface PendingAIAction {
  actionId: string;
  tripId: string;
  agent: string;
  action: string;
  description: string;
  additionalCostRupees: number;
  requestedAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface AuditEvent {
  eventId: string;
  type: AuditEventType;
  actor: string;
  actorRole: UserRole;
  resource: string;
  action: string;
  result: 'SUCCESS' | 'DENIED' | 'FAILED';
  timestamp: string;
  transactionId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface SecurityMetrics {
  activeSessions: number;
  failedLogins: number;
  webhookErrors: number;
  apiErrors: number;
  suspiciousEvents: number;
  aiToolCalls: number;
  aiToolsBlocked: number;
  totalAuditEvents: number;
}
