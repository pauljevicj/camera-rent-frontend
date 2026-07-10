import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.cameraService.getAll().subscribe((data) => {
      this.cameras = data;

      this.cd.detectChanges();
    });
  }
  openCreate() {
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      width: '450px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cameraService.create(result).subscribe(() => {
          this.load();
        });
      }
    });
  }

  edit(camera: CameraApiResponse) {
    const dialogRef = this.dialog.open(CameraDialogComponent, {
      width: '450px',
      data: camera,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cameraService.update(camera.id!, result).subscribe(() => {
          this.load();
        });
      }
    });
  }

  remove(id: number) {
    if (confirm('Delete camera?')) {
      this.cameraService.delete(id).subscribe({
        next: () => {
          this.load();
        },
        error: (err) => {
          if (err.error.code === 'REFERENCED_ENTITY') {
            alert('This camera cannot be deleted because it is currently used in rentals.');
          } else {
            alert('Something went wrong while deleting the camera.');
          }
        },
      });
    }
  }
}
