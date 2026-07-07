import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthCookieService } from './auth-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authCookieService: AuthCookieService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    const token = this.authCookieService.getToken();

    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
