import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EmployeeMain } from './employee/main/main';
import { ClientMain } from './client/main/main';
import { RentalPageComponent } from './employee/main/rental/rental';
import { CameraComponent } from './employee/main/camera/camera';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },

  {
    path: 'employee-main',
    component: EmployeeMain,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: 'EMPLOYEE',
    },
    children: [
      {
        path: '',
        redirectTo: 'rental',
        pathMatch: 'full',
      },
      {
        path: 'rental',
        component: RentalPageComponent,
      },
      {
        path: 'camera',
        component: CameraComponent,
      },
    ],
  },
  {
    path: 'client-main',
    component: ClientMain,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: 'CLIENT',
    },
  },

  {
    path: '**',
    redirectTo: '',
  },
];
