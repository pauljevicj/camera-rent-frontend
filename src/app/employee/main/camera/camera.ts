import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraService } from '../../../api/camera.service';
import { CameraApiResponse } from '../../../models/camera.model';
import { CameraDialogComponent } from '../../components/camera-dialog/camera-dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CameraTableComponent } from '../../components/camera-table/camera-table';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, CameraTableComponent],
  templateUrl: './camera.html',
})
export class CameraComponent implements OnInit {
  cameras: CameraApiResponse[] = [];

  constructor(
    private cameraService: CameraService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.cameraService.getAll().subscribe((data) => {
      console.log('PARENT:', data);

      this.cameras = data;
    });
  }
  openCreate() {
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cameraService.create(result).subscribe(() => {
          this.load();
        });
      }
    });
  }
}
