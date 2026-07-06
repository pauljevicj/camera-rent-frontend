import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { AuthCookieService } from '../../auth/auth-cookie.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  constructor(
    private authCookieService: AuthCookieService,
    private router: Router,
  ) {}

  logout(): void {
    this.authCookieService.clearToken();
    this.router.navigate(['/auth']);
  }
}
