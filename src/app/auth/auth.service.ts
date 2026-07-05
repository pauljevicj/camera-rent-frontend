import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private readonly http: HttpClient) {}

  register(payload: ClientRegisterPayload): Observable<AuthResponse | string> {
    return this.http.post<AuthResponse | string>(`${this.apiUrl}/client/register`, payload);
  }

  login(payload: LoginPayload): Observable<AuthResponse | unknown> {
    return this.http.post<AuthResponse | unknown>(`${this.apiUrl}/login`, payload, {
      withCredentials: true,
    });
  }
}
