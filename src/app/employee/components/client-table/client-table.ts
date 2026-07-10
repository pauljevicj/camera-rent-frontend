import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { ClientApiResponse } from '../../../models/client.model';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './client-table.html',
})
export class ClientTableComponent {
  @Input()
  clients: ClientApiResponse[] = [];

  @Output()
  editClient = new EventEmitter<ClientApiResponse>();

  @Output()
  deleteClient = new EventEmitter<number>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<ClientApiResponse>();

  displayedColumns = ['name', 'email', 'phone', 'city', 'status', 'actions'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clients']) {
      this.dataSource.data = this.clients;
    }
  }

  edit(client: ClientApiResponse) {
    this.editClient.emit(client);
  }

  delete(id: number) {
    this.deleteClient.emit(id);
  }
}
