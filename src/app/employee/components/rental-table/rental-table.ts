import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';

import { RentalService } from '../../../api/rental.service';
import { RentalApiResponse } from '../../../models/rental.model';
import { RentalDialogComponent } from '../rental-dialog/rental-dialog';

@Component({
  selector: 'app-rental-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule],
  templateUrl: './rental-table.html',
  styleUrl: './rental-table.css',
})
export class RentalTableComponent implements OnInit {
  displayedColumns: string[] = ['client', 'camera', 'employee', 'period', 'status', 'actions'];

  dataSource = new MatTableDataSource<RentalApiResponse>([]);

  selectedTab: 'APPROVED' | 'PENDING' = 'APPROVED';

  constructor(
    private rentalService: RentalService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getByStatus(this.selectedTab).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err),
    });
  }

  onTabChange(index: number): void {
    this.selectedTab = index === 0 ? 'APPROVED' : 'PENDING';
    this.loadRentals(); // IMPORTANT
  }

  deleteRental(id: number): void {
    this.rentalService.delete(id).subscribe(() => {
      this.loadRentals();
    });
  }

  editRental(rental: any): void {
    const dialogRef = this.dialog.open(RentalDialogComponent, {
      width: '400px',
      data: rental,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.rentalService.update(rental.id, result).subscribe(() => {
        this.loadRentals();
      });
    });
  }

  approveRental(id: number): void {
    this.rentalService.approve(id).subscribe({
      next: () => {
        this.loadRentals();
      },
      error: (err) => console.error(err),
    });
  }
}
