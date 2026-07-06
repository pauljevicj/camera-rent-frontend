import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { EmployeeMain } from './employee/main/main';
import { ClientMain } from './client/main/main';
import { RentalPageComponent } from './employee/main/rental/rental';
import { CameraComponent } from './employee/main/camera/camera';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  {
    path: 'employee-main',
    component: EmployeeMain,
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
  { path: 'client-main', component: ClientMain },
  { path: '**', redirectTo: '' },
];
