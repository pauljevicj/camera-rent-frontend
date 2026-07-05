import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './main.html',
})
export class EmployeeMain {}
