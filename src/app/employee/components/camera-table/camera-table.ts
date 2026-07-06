import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CameraApiResponse } from '../../../models/camera.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-camera-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './camera-table.html',
})
export class CameraTableComponent {
  private _cameras: CameraApiResponse[] = [];

  @Input()
  set cameras(value: CameraApiResponse[]) {
    this._cameras = value;
    this.camerasForTable = [...value];
    this.cd.detectChanges();
  }

  get cameras() {
    return this._cameras;
  }

  camerasForTable: CameraApiResponse[] = [];

  displayedColumns = ['camera', 'condition', 'price', 'year', 'status', 'actions'];

  constructor(private cd: ChangeDetectorRef) {}
}
