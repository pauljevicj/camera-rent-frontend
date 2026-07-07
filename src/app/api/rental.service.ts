import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCookieService } from '../auth/auth-cookie.service';
import { RentalApiResponse, RentalRequest } from '../models/rental.model';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private readonly apiUrl = 'http://localhost:8080/api/rentals';

  constructor(
    private readonly http: HttpClient,
    private readonly authCookieService: AuthCookieService,
  ) {}

  getAll(): Observable<RentalApiResponse[]> {
    const token = this.authCookieService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<RentalApiResponse[]>(this.apiUrl, {
      headers,
      withCredentials: true,
    });
  }

  createRental(payload: any): Observable<RentalApiResponse> {
    const token = this.authCookieService.getToken();

    const headers = token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      : undefined;

    return this.http.post<RentalApiResponse>(this.apiUrl, payload, {
      headers,
      withCredentials: true,
    });
  }

  update(id: number, rental: any) {
    const token = this.authCookieService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.put(`${this.apiUrl}/${id}`, rental, {
      headers,
      withCredentials: true,
    });
  }
  delete(id: number) {
    const token = this.authCookieService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers,
      withCredentials: true,
    });
  }

  approve(id: number) {
    const token = this.authCookieService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.put(
      `${this.apiUrl}/${id}/approve`,
      {},
      {
        headers,
        withCredentials: true,
      },
    );
  }

  getByStatus(status: string): Observable<RentalApiResponse[]> {
    const token = this.authCookieService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<RentalApiResponse[]>(`${this.apiUrl}?status=${status}`, {
      headers,
      withCredentials: true,
    });
  }

  getProcessed(): Observable<RentalApiResponse[]> {
    const token = this.authCookieService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<RentalApiResponse[]>(`${this.apiUrl}/processed`, {
      headers,
      withCredentials: true,
    });
  }
}
