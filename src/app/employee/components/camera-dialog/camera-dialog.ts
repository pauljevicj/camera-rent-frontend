import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CameraApiResponse } from '../../../models/camera.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CameraModelService } from '../../../api/camera-model.service';
import { CameraModelApiResponse } from '../../../models/camera-model.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camera-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './camera-dialog.html',
})
export class CameraDialogComponent implements OnInit {
  form: FormGroup;

  cameraModels: CameraModelApiResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<CameraDialogComponent>,
    private cameraModelService: CameraModelService,
    @Inject(MAT_DIALOG_DATA) public data: CameraApiResponse,
  ) {
    this.form = this.fb.group({
      pricePerDay: [0, Validators.required],
      cameraCondition: ['GOOD', Validators.required],
      year: [2026, Validators.required],
      cameraModelId: [null, Validators.required],
    });

    if (data) {
      this.form.patchValue({
        pricePerDay: data.pricePerDay,
        cameraCondition: data.cameraCondition,
        year: data.year,
        cameraModelId: data.cameraModel.id,
      });
    }
  }

  ngOnInit(): void {
    this.cameraModelService.getAll().subscribe({
      next: (models) => {
        this.cameraModels = models;
      },
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.ref.close(this.form.value);
  }

  close() {
    this.ref.close();
  }
}
