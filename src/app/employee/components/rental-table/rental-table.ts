import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';

import { RentalService } from '../../../api/rental.service';
import { RentalApiResponse } from '../../../models/rental.model';
import { RentalDialogComponent } from '../rental-dialog/rental-dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rental-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './rental-table.html',
  styleUrl: './rental-table.css',
})
export class RentalTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['client', 'camera', 'employee', 'period', 'status', 'actions'];

  dataSource = new MatTableDataSource<RentalApiResponse>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 
  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
  }
  
  selectedTab: 'PROCESSED' | 'PENDING' = 'PROCESSED';

  constructor(
    private rentalService: RentalService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    if (this.selectedTab === 'PENDING') {
      this.rentalService.getByStatus(this.selectedTab).subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => console.error(err),
      });
    } else {
      this.rentalService.getProcessed().subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: (err) => console.error(err),
      });
    }
  }

  onTabChange(index: number): void {
    this.selectedTab = index === 0 ? 'PROCESSED' : 'PENDING';
    this.loadRentals();
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
