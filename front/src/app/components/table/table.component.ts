import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ColsModel } from '../../commons/models/base/table/cols-model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  standalone: true, // Indica que es un componente standalone
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatPaginatorModule],
})
export class TableComponent implements OnInit {

  @Input() cols: ColsModel[] = [];
  @Input() values: any = [];
  @Input() length: number = 0;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 10; //Cuantas filas quiero por vista
  @Output() pageItemEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.pageItemEvent.emit(e);
  }
}
