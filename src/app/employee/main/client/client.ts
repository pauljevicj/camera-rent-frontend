import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from '../../../api/client.service';
import { ClientApiResponse } from '../../../models/client.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClientTableComponent } from '../../components/client-table/client-table';
import { ClientDialogComponent } from '../../components/client-dialog/client-dialog';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ClientTableComponent],
  templateUrl: './client.html',
})
export class ClientComponent implements OnInit {
  clients: ClientApiResponse[] = [];

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.clientService.getAll().subscribe((data) => {
      this.clients = data;

      this.cd.detectChanges();
    });
  }

  openEdit(client: ClientApiResponse): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '500px',
      data: client,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.clientService.update(client.id, result).subscribe(() => {
        this.load();
      });
    });
  }

  delete(id: number): void {
    if (!confirm(`Are you sure you want to delete this client?`)) {
      return;
    }

    this.clientService.delete(id).subscribe(() => {
      this.load();
    });
  }
}
