import { Component } from '@angular/core';
import { RentalTable } from '../components/rental-table/rental-table';

@Component({
  selector: 'app-main',
  imports: [RentalTable],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class EmployeeMain {}
