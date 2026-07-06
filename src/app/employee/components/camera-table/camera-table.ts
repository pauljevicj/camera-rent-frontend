import { Component, Input } from '@angular/core';
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
  @Input() cameras: CameraApiResponse[] = [];

  displayedColumns = ['camera', 'condition', 'price', 'year', 'status', 'actions'];
}
