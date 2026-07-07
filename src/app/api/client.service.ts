import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCookieService } from '../auth/auth-cookie.service';
import { ClientApiResponse } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly apiUrl = 'http://localhost:8080/api/clients';

  constructor(
    private readonly http: HttpClient,
    private readonly authCookieService: AuthCookieService,
  ) {}

  getAll(): Observable<ClientApiResponse[]> {
    const token = this.authCookieService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<ClientApiResponse[]>(this.apiUrl, { headers, withCredentials: true });
  }

  update(id: number, payload: ClientApiResponse): Observable<ClientApiResponse> {
    const headers = this.getHeaders();

    return this.http.put<ClientApiResponse>(`${this.apiUrl}/${id}`, payload, {
      headers,
      withCredentials: true,
    });
  }

  delete(id: number): Observable<void> {
    const headers = this.getHeaders();

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers,
      withCredentials: true,
    });
  }

  private getHeaders() {
    const token = this.authCookieService.getToken();

    return token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      : undefined;
  }
}
