import { Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { CameraModel } from '../../../models/camera.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RentalService } from '../../../api/rental.service';
import { JwtService } from '../../../auth/jwt-decode.service';

@Component({
  selector: 'app-camera-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  templateUrl: './camera-table.component.html',
})
export class CameraTableComponent implements OnChanges {
  @Input() cameras: CameraModel[] = [];
  @Input() isLoading = false;
  @Input() startDate!: string;
  @Input() endDate!: string;

  constructor(
  private readonly rentalService: RentalService,
  private readonly jwtService: JwtService,
) {
  this.dataSource.sortingDataAccessor = (
    item: CameraModel,
    property: string
  ): string | number => {
    switch (property) {
      case 'name':
        return item.name ?? '';

      case 'brand':
        return item.model ?? '';

      case 'condition':
        return item.condition ?? '';

      case 'price':
        return item.pricePerDay ?? 0;

      default:
        return '';
    }
  };
}

  @ViewChild(MatPaginator)
  set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
  }
  }

  @ViewChild(MatSort)
  set matSort(sort: MatSort) {
  if (sort) {
    this.dataSource.sort = sort;
  }
  }

  dataSource = new MatTableDataSource<CameraModel>([]);

  displayedColumns: string[] = ['name', 'brand', 'condition', 'price', 'actions'];

  ngOnChanges(): void {
  this.dataSource.data = this.cameras ?? [];
  }

  reserve(camera: CameraModel) {
    const payload = {
      startDate: this.startDate,
      endDate: this.endDate,
      cameraId: camera.id,
    };

    this.rentalService.createRental(payload).subscribe({
      next: () => alert('Reserved!'),
      error: (err) => console.log(err),
    });
  }
}
