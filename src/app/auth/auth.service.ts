import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthCookieService } from './auth-cookie.service';
import { JwtService } from './jwt-decode.service';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ClientRegisterPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  cityId: number;
  clientTypeId: number;
}

export interface AuthResponse {
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly authCookieService: AuthCookieService,
    private readonly jwtService: JwtService,
  ) {}

  register(payload: ClientRegisterPayload): Observable<AuthResponse | string> {
    return this.http.post<AuthResponse | string>(`${this.apiUrl}/client/register`, payload);
  }

  login(payload: LoginPayload): Observable<void> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((res: any) => {
        const token = this.authCookieService.extractToken(res);

        if (!token) return;

        this.authCookieService.setToken(token);

        const roles = this.jwtService.getRoles(token);

        if (roles.includes('EMPLOYEE')) {
          this.router.navigate(['/employee-main']);
        } else {
          this.router.navigate(['/client-main']);
        }
      }),
    );
  }
}
