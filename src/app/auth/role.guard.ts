import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtService } from './jwt-decode.service';
import { AuthCookieService } from './auth-cookie.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authCookieService: AuthCookieService,
    private router: Router,
    private jwtService: JwtService,
  ) {}

  canActivate(route: any): boolean {
    const token = this.authCookieService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];

    const roles = this.jwtService.getRoles(token);

    if (!roles.includes(requiredRole)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
