import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CameraService } from '../../api/camera.service';
import { CameraTableComponent } from '../components/camera-table/camera-table.component';
import { CameraApiResponse, CameraModel } from '../../models/camera.model';
import { CameraFiltersComponent } from '../components/camera-filters/camera-filters.component';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CameraTableComponent,
    CameraFiltersComponent,
  ],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class ClientMain {
  cameras: CameraModel[] = [];
  isLoading = false;

  startDate?: Date;
  endDate?: Date;

  constructor(
    private cameraService: CameraService,
    private cdr: ChangeDetectorRef,
  ) {}

  onSearch(event: { start: Date; end: Date }): void {
    // this.isLoading = true;

    this.cameraService.getAvailable(this.format(event.start), this.format(event.end)).subscribe({
      next: (res) => {
        this.cameras = this.mapCameras(res ?? []);
        this.cdr.detectChanges();
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  private format(d: Date): string {
    return d.toISOString().split('T')[0];
  }

  private mapCameras(response: CameraApiResponse[]): CameraModel[] {
    return response.map((camera) => ({
      id: camera.id ?? 0,
      name: camera.cameraModel?.model ?? 'Unnamed camera',
      brand: camera.cameraModel?.brand ?? 'Unknown brand',
      model: camera.cameraModel?.model ?? 'Unknown model',
      pricePerDay: camera.pricePerDay ?? 0,
      status: camera.status === 'TAKEN' ? 'TAKEN' : 'AVAILABLE',
      condition: camera.cameraCondition ?? 'Unknown',
      year: camera.year ?? null,
    }));
  }
}
