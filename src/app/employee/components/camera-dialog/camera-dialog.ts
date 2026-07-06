import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-camera-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './camera-dialog.html',
})
export class CameraDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<CameraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
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
    this.ref.close(this.form.value);
  }
}
