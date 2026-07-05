import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { CameraSearchEvent } from '../../../models/camera.model';

@Component({
  selector: 'app-camera-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './camera-filters.component.html',
})
export class CameraFiltersComponent {
  @Output() valueSearch = new EventEmitter<CameraSearchEvent>();

  form = new FormGroup({
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });

  onSearch(): void {
    const start = this.form.value.startDate;
    const end = this.form.value.endDate;

    if (!start || !end) return;

    this.valueSearch.emit({
      start,
      end,
    });
  }
}
