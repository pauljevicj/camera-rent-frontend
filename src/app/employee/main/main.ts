import { Component } from '@angular/core';
import { EmployeeNavbarComponent } from '../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [EmployeeNavbarComponent, RouterOutlet, NavbarComponent],
  templateUrl: './main.html',
})
export class EmployeeMain {}
