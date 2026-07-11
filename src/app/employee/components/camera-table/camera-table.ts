import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CameraApiResponse } from '../../../models/camera.model';

@Component({
  selector: 'app-camera-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatSnackBarModule,
  ],
  templateUrl: './camera-table.html',
})
export class CameraTableComponent implements AfterViewInit, OnChanges {

  @Input() cameras: CameraApiResponse[] = [];

  @Output() editCamera = new EventEmitter<CameraApiResponse>();
  @Output() deleteCamera = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<CameraApiResponse>();

  displayedColumns = ['camera', 'condition', 'price', 'year', 'actions'];

  constructor(
    private readonly snackBar: MatSnackBar,
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort

    this.dataSource.sortingDataAccessor = (item, property) => {
    switch (property) {
      case 'camera':
        return item.cameraModel.brand + ' ' + item.cameraModel.model;

      case 'condition':
        return item.cameraCondition;

      case 'price':
        return item.pricePerDay;

      case 'year':
        return item.year;

      default:
        return '';
    }
  };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cameras']) {
      this.dataSource.data = this.cameras;
    }
  }
}