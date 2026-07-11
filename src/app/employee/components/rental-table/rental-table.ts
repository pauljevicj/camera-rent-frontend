import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { RentalService } from '../../../api/rental.service';
import { RentalApiResponse } from '../../../models/rental.model';
import { RentalDialogComponent } from '../rental-dialog/rental-dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rental-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  templateUrl: './rental-table.html',
  styleUrl: './rental-table.css',
})
export class RentalTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['client', 'camera', 'employee', 'period', 'status', 'actions'];

  dataSource = new MatTableDataSource<RentalApiResponse>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (
      item: RentalApiResponse,
      property: string,
    ): string | number => {
      switch (property) {
        case 'client':
          return `${item.client?.name ?? ''} ${item.client?.surname ?? ''}`;

        case 'camera':
          return `${item.camera?.cameraModel?.brand ?? ''} ${item.camera?.cameraModel?.model ?? ''}`;

        case 'employee':
          return `${item.employee?.name ?? ''} ${item.employee?.surname ?? ''}`;

        case 'period':
          return item.startDate ?? '';

        case 'status':
          return item.status ?? '';

        default:
          return '';
      }
    };
  }

  selectedTab: 'PROCESSED' | 'PENDING' = 'PROCESSED';

  constructor(
    private rentalService: RentalService,
    private dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
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
    this.snackBar.open('Rental is successfully deleted', 'OK', {
      duration: 3000
    });
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
      this.snackBar.open('Rental is successfully updated', 'OK', {
        duration: 3000
      });

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

  exportToExcel(): void {
    const exportData = this.dataSource.data.map((rental) => ({
      Client: `${rental.client?.name} ${rental.client?.surname}`,
      Camera: `${rental.camera?.cameraModel?.brand} ${rental.camera?.cameraModel?.model}`,
      Employee: `${rental.employee?.name} ${rental.employee?.surname}`,
      'Start Date': rental.startDate,
      'End Date': rental.endDate,
      Status: rental.status,
    }));

    const sheetName = this.selectedTab === 'PENDING' ? 'Open Approvals' : 'Processed Rentals';

    const fileName = this.selectedTab === 'PENDING' ? 'Open_Approvals' : 'Processed_Rentals';

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    const workbook: XLSX.WorkBook = {
      Sheets: {
        [sheetName]: worksheet,
      },
      SheetNames: [sheetName],
    };

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, `${fileName}.xlsx`);
  }
}
