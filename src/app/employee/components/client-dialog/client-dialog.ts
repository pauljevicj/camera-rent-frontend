import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { ClientApiResponse } from '../../../models/client.model';
import { City } from '../../../models/city.model';
import { CityService } from '../../../api/city.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './client-dialog.html',
})
export class ClientDialogComponent implements OnInit {
  form: FormGroup;

  cities: City[] = [];

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<ClientDialogComponent>,
    private cityService: CityService,
    @Inject(MAT_DIALOG_DATA) public data: ClientApiResponse,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      cityId: [null, Validators.required],
      clientType: ['', Validators.required],
    });

    if (data) {
      this.form.patchValue({
        name: data.name,
        surname: data.surname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        cityId: data.city.id,
        clientType: data.clientType,
      });
    }
  }

  ngOnInit(): void {
    this.cityService.getAll().subscribe({
      next: (cities) => (this.cities = cities),
    });
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.ref.close(this.form.value);
  }

  close(): void {
    this.ref.close();
  }
}
