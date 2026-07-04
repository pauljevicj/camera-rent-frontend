import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthCookieService {
  private readonly cookieName = 'authToken';
  private readonly maxAgeSeconds = 60 * 60 * 24 * 7;

  setToken(token: string): void {
    if (!token) {
      return;
    }

    document.cookie = `${this.cookieName}=${encodeURIComponent(token)}; Path=/; Max-Age=${this.maxAgeSeconds}; SameSite=Lax;`;
  }

  getToken(): string | null {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());

    for (const cookie of cookies) {
      const [name, ...valueParts] = cookie.split('=');
      if (name === this.cookieName) {
        return decodeURIComponent(valueParts.join('='));
      }
    }

    return null;
  }

  clearToken(): void {
    document.cookie = `${this.cookieName}=; Path=/; Max-Age=0; SameSite=Lax;`;
  }

  extractToken(payload: unknown): string | null {
    if (!payload) {
      return null;
    }

    if (typeof payload === 'string') {
      return payload;
    }

    const record = payload as Record<string, unknown>;

    const candidateKeys = ['accessToken', 'token', 'access_token', 'jwt', 'jwtToken'];
    for (const key of candidateKeys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return value;
      }
    }

    return null;
  }
}
