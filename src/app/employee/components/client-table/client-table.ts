import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { ClientApiResponse } from '../../../models/client.model';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './client-table.html',
})
export class ClientTableComponent {
  @Input()
  clients: ClientApiResponse[] = [];

  @Output()
  editClient = new EventEmitter<ClientApiResponse>();

  @Output()
  deleteClient = new EventEmitter<ClientApiResponse>();

  displayedColumns = ['name', 'email', 'phone', 'city', 'status', 'actions'];

  edit(client: ClientApiResponse) {
    this.editClient.emit(client);
  }

  delete(client: ClientApiResponse) {
    this.deleteClient.emit(client);
  }
}
