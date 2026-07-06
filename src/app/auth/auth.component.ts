import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Router } from '@angular/router';
import { AuthService } from '../api/auth.service';
import { AuthCookieService } from './auth-cookie.service';
import { JwtService } from './jwt-decode.service';
import { MatSelectModule } from '@angular/material/select';
import { City } from '../models/city.model';
import { CityService } from '../api/city.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSelectModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  public readonly selectedTab = signal<'login' | 'register'>('login');
  public readonly selectedRole = signal<'client' | 'employee'>('client');
  public readonly isSubmitting = signal(false);

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly authCookieService: AuthCookieService,
    private readonly jwtService: JwtService,
    private readonly cityService: CityService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],

      account: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),

      phoneNumber: ['', Validators.required],
      cityId: [1, [Validators.required, Validators.min(1)]],
    });
  }

  cities: City[] = [];

  ngOnInit(): void {
    this.cityService.getAll().subscribe({
      next: (cities) => (this.cities = cities),
    });
  }

  switchTab(tab: 'login' | 'register'): void {
    this.selectedTab.set(tab);
  }

  selectRole(role: 'client' | 'employee'): void {
    this.selectedRole.set(role);
  }

  submitLogin(): void {
    const payload = this.loginForm.getRawValue();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.authService.login(payload).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);

        const token = this.authCookieService.extractToken(response);

        if (token) {
          this.authCookieService.setToken(token);

          const roles = this.jwtService.getRoles(token);

          const isEmployee = roles.includes('EMPLOYEE');
          const isClient = roles.includes('CLIENT');

          this.snackBar.open('Welcome back!', 'Close', { duration: 2500 });

          if (isEmployee) {
            this.router.navigate(['/employee-main']);
          } else if (isClient) {
            this.router.navigate(['/client-main']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: () => {
        this.isSubmitting.set(false);
        this.snackBar.open('Login failed. Please verify your credentials.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  submitRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    this.authService.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.snackBar.open('Account created successfully!', 'Close', {
          duration: 2500,
        });
      },
      error: () => {
        this.isSubmitting.set(false);
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
