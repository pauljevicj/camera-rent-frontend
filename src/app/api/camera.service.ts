import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCookieService } from '../auth/auth-cookie.service';
import { CameraApiResponse, CameraRequest } from '../models/camera.model';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  private readonly apiUrl = 'http://localhost:8080/api/cameras';

  constructor(
    private readonly http: HttpClient,
    private readonly authCookieService: AuthCookieService,
  ) {}

  getAll(): Observable<CameraApiResponse[]> {
    const token = this.authCookieService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<CameraApiResponse[]>(this.apiUrl, { headers, withCredentials: true });
  }

  getAvailable(start: string, end: string): Observable<CameraApiResponse[]> {
    const token = this.authCookieService.getToken();

    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<CameraApiResponse[]>(`${this.apiUrl}/available`, {
      headers,
      withCredentials: true,
      params: {
        start,
        end,
      },
    });
  }

  create(payload: CameraRequest): Observable<CameraApiResponse> {
    const headers = this.getHeaders();

    return this.http.post<CameraApiResponse>(this.apiUrl, payload, {
      headers,
      withCredentials: true,
    });
  }

  update(id: number, payload: CameraRequest): Observable<CameraApiResponse> {
    const headers = this.getHeaders();

    return this.http.put<CameraApiResponse>(`${this.apiUrl}/${id}`, payload, {
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
