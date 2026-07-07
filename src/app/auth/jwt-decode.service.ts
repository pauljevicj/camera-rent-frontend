import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthCookieService } from './auth-cookie.service';

export interface JwtPayload {
  roles: string[];
  sub: string;
  exp: number;
  iat: number;
}

@Injectable({ providedIn: 'root' })
export class JwtService {
  constructor(private readonly authCookieService: AuthCookieService) {}

  decode(token: string): JwtPayload {
    return jwtDecode<JwtPayload>(token);
  }

  getRoles(token: string): string[] {
    return this.decode(token).roles ?? [];
  }

  getUserId(): number {
    const token = this.authCookieService.getToken();

    if (!token) {
      return 0;
    }

    const payload: any = this.decode(token);

    return Number(payload.userId ?? payload.id ?? payload.sub);
  }
}
