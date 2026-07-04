import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
import { CameraModel } from '../../models/camera.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

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
  styleUrl: './camera-table.component.css',
})
export class CameraTableComponent implements OnChanges, AfterViewInit {
  @Input() cameras: CameraModel[] = [];
  @Input() isLoading = false;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  dataSource = new MatTableDataSource<CameraModel>([]);

  displayedColumns: string[] = ['name', 'brand', 'condition', 'price', 'status', 'actions'];

  readonly statusConfig = {
    AVAILABLE: { label: 'Available', class: '!bg-emerald-100 !text-emerald-700' },
    TAKEN: { label: 'Taken', class: '!bg-amber-100 !text-amber-700' },
    UNKNOWN: { label: 'Unknown', class: '!bg-slate-100 !text-slate-700' },
  } as const;

  ngOnChanges(): void {
    this.dataSource.data = this.cameras ?? [];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
  }

  getStatusLabel(status: CameraModel['status']) {
    return this.statusConfig[status]?.label ?? 'Unknown';
  }

  getStatusClass(status: CameraModel['status']) {
    return this.statusConfig[status]?.class ?? '!bg-slate-100';
  }
}
