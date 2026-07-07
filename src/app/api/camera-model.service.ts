import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthCookieService } from '../auth/auth-cookie.service';
import { CameraModelApiResponse } from '../models/camera-model.model';

@Injectable({
  providedIn: 'root',
})
export class CameraModelService {
  private readonly apiUrl = 'http://localhost:8080/api/camera-models';

  constructor(
    private readonly http: HttpClient,
    private readonly authCookieService: AuthCookieService,
  ) {}

  getAll(): Observable<CameraModelApiResponse[]> {
    const token = this.authCookieService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    return this.http.get<CameraModelApiResponse[]>(this.apiUrl, { headers, withCredentials: true });
  }
}
