import { Component } from '@angular/core';
import { RentalTableComponent } from '../../components/rental-table/rental-table';

@Component({
  selector: 'app-rental',
  imports: [RentalTableComponent],
  templateUrl: './rental.html',
  styleUrl: './rental.css',
})
export class RentalPageComponent {}
