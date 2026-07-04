import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EmployeeMain } from './employee/main/main';
import { ClientMain } from './client/main/main';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'employee-main', component: EmployeeMain },
  { path: 'client-main', component: ClientMain },
  { path: '**', redirectTo: '' },
];
