import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { ClientApiResponse } from '../../../models/client.model';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatSortModule],
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

  @ViewChild(MatSort)
  sort!: MatSort;

  dataSource = new MatTableDataSource<ClientApiResponse>();

  displayedColumns = ['name', 'email', 'phone', 'city', 'status', 'actions'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
    switch (property) {
      case 'name':
        return item.name + ' ' + item.surname;

      case 'email':
        return item.email;

      case 'phone':
        return item.phoneNumber;

      case 'city':
        return item.city?.name;

      case 'status':
        return item.clientType;

      default:
        return '';
    }
    };
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
