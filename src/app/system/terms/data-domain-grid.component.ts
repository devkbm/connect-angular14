import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ResponseList } from '../../core/model/response-list';
import { AggridFunction } from '../../core/grid/aggrid-function';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { DataDomainService } from './data-domain.service';
import { DataDomain } from './data-domain.model';

@Component({
  selector: 'app-data-domain-grid',
  template: `
   <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="list"
      [columnDefs]="columnDefs"
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClickedEvent($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `,
  styles: []
})
export class DataDomainGridComponent extends AggridFunction implements OnInit {

  list: DataDomain[] = [];

  @Output() rowClicked = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private service: DataDomainService,
              private appAlarmService: AppAlarmService) {

    super();

    this.defaultColDef = { resizable: true, sortable: true };

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: '',
          iconType: 'form'
        }
      },
      {
        headerName: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 70,
        cellStyle: {'text-align': 'center'}
      },
      {headerName: '도메인ID',      field: 'domainId',      width: 100 },
      {headerName: '데이터베이스',  field: 'database',      width: 100 },
      {headerName: '도메인',        field: 'domainName',    width: 100 },
      {headerName: '용어(영문)',    field: 'termEng',       width: 100 },
      {headerName: '데이터타입',    field: 'dataType',      width: 100 },      
      {headerName: '비고',          field: 'comment',       width: 400 }
    ];

    this.getRowId = function(params: any) {
      return params.data.termId;
    };
  }

  ngOnInit() {
    this.getTermList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  getTermList(params?: any): void {
    this.service
        .getList()        
        .subscribe(
          (model: ResponseList<DataDomain>) => {
            if (model.total > 0) {
              this.list = model.data;
            } else {
              this.list = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedEvent(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowClicked.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

}
