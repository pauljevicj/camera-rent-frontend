import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CameraApiResponse } from '../../../models/camera.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-camera-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './camera-dialog.html',
})
export class CameraDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<CameraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CameraApiResponse,
  ) {
    this.form = this.fb.group({
      status: ['AVAILABLE', Validators.required],
      pricePerDay: [0, Validators.required],
      cameraCondition: ['GOOD', Validators.required],
      year: [2026, Validators.required],
      cameraModelId: [1, Validators.required],
    });

    if (data) {
      this.form.patchValue({
        status: data.status,
        pricePerDay: data.pricePerDay,
        cameraCondition: data.cameraCondition,
        year: data.year,
        cameraModelId: data.cameraModel.id,
      });
    }
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
