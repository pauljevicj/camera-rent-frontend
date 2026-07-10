import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CameraApiResponse } from '../../../models/camera.model';

@Component({
  selector: 'app-camera-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './camera-table.html',
})
export class CameraTableComponent implements AfterViewInit, OnChanges {

  @Input() cameras: CameraApiResponse[] = [];

  @Output() editCamera = new EventEmitter<CameraApiResponse>();
  @Output() deleteCamera = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<CameraApiResponse>();

  displayedColumns = ['camera', 'condition', 'price', 'year', 'actions'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cameras']) {
      this.dataSource.data = this.cameras;
    }
  }
}