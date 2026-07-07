import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  roles: string[];
  sub: string;
  exp: number;
  iat: number;
}

@Injectable({ providedIn: 'root' })
export class JwtService {
  decode(token: string): JwtPayload {
    return jwtDecode<JwtPayload>(token);
  }

  getRoles(token: string): string[] {
    return this.decode(token).roles ?? [];
  }
}
