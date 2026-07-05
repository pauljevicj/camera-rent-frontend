import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatTabsModule, RouterModule],
  templateUrl: './navbar.html',
})
export class NavbarComponent {}
