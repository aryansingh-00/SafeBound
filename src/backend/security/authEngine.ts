import { SessionToken, TravellerProfile, UserRole } from './securityTypes';
import { AuditLogger } from './auditLogger';

const DEMO_USER: TravellerProfile = {
  travellerId: 'TRV_ARYAN_01',
  userId: 'USR_ARYAN_01',
  name: 'Aryan Singh',
  dateOfBirth: '2003-04-15',
  gender: 'MALE',
  email: 'aryansingh@example.com',
  phone: '+91 98765 43210',
};

export class AuthEngine {
  private static sessions = new Map<string, SessionToken>();
  private static currentSession: SessionToken | null = null;
  private static travellerProfiles = new Map<string, TravellerProfile>([
    [DEMO_USER.travellerId, DEMO_USER],
  ]);

  public static login(email: string, _password: string): SessionToken {
    const sessionId = `SES_${Date.now()}`;
    const now = new Date();
    const expires = new Date(now.getTime() + 8 * 60 * 60 * 1000); // 8h

    const role: UserRole = email.includes('admin') ? 'ADMIN' : 'USER';

    const token: SessionToken = {
      sessionId,
      userId: 'USR_ARYAN_01',
      role,
      email,
      displayName: 'Aryan Singh',
      issuedAt: now.toLocaleTimeString('en-US', { hour12: false }),
      expiresAt: expires.toLocaleTimeString('en-US', { hour12: false }),
      isValid: true,
    };

    this.sessions.set(sessionId, token);
    this.currentSession = token;

    AuditLogger.record({
      type: 'USER_LOGIN',
      actor: email,
      actorRole: role,
      resource: `session:${sessionId}`,
      action: 'LOGIN',
      result: 'SUCCESS',
    });

    return token;
  }

  public static logout(): void {
    if (this.currentSession) {
      this.currentSession.isValid = false;
      AuditLogger.record({
        type: 'USER_LOGOUT',
        actor: this.currentSession.email,
        actorRole: this.currentSession.role,
        resource: `session:${this.currentSession.sessionId}`,
        action: 'LOGOUT',
        result: 'SUCCESS',
      });
      this.currentSession = null;
    }
  }

  /** Simulate an active session without login form for demo. */
  public static ensureDemoSession(): SessionToken {
    if (!this.currentSession || !this.currentSession.isValid) {
      return this.login('aryansingh@example.com', 'demo');
    }
    return this.currentSession;
  }

  public static getCurrentSession(): SessionToken | null {
    return this.currentSession;
  }

  public static isAuthenticated(): boolean {
    return !!this.currentSession?.isValid;
  }

  public static getActiveSessions(): number {
    return Array.from(this.sessions.values()).filter((s) => s.isValid).length;
  }

  public static getTravellerProfile(travellerId: string): TravellerProfile | undefined {
    return this.travellerProfiles.get(travellerId);
  }

  public static getDemoTraveller(): TravellerProfile {
    return DEMO_USER;
  }

  public static updateTravellerProfile(updates: Partial<TravellerProfile>): TravellerProfile {
    const existing = this.travellerProfiles.get(DEMO_USER.travellerId)!;
    const updated = { ...existing, ...updates };
    this.travellerProfiles.set(DEMO_USER.travellerId, updated);

    AuditLogger.record({
      type: 'TRAVELLER_UPDATED',
      actor: this.currentSession?.email ?? 'unknown',
      actorRole: this.currentSession?.role ?? 'USER',
      resource: `traveller:${DEMO_USER.travellerId}`,
      action: 'UPDATE_PROFILE',
      result: 'SUCCESS',
    });

    return updated;
  }
}
