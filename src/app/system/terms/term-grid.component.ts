import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ResponseList } from '../../core/model/response-list';
import { AggridFunction } from '../../core/grid/aggrid-function';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { TermService } from './term.service';
import { Term } from './term.model';


@Component({
  selector: 'app-term-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="termList"
      [columnDefs]="columnDefs"
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClickedEvent($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class TermGridComponent extends AggridFunction implements OnInit {

  termList: Term[] = [];

  @Output() rowClicked = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private termService: TermService,
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
      {headerName: '용어ID',      field: 'termId',            width: 100 },
      {headerName: '시스템',      field: 'system',            width: 100 },
      {headerName: '용어',        field: 'term',              width: 100 },
      {headerName: '용어(영문)',  field: 'termEng',           width: 100 },
      {headerName: '컬럼명',      field: 'columnName',        width: 100 },
      {headerName: '설명',        field: 'description',       width: 400 , tooltipField: 'description'},
      {headerName: '비고',        field: 'comment',           width: 400 }
    ];

    this.getRowId = function(args: any) {
        return args.data.pkTerm;
    };
  }

  ngOnInit() {
    this.getTermList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  getTermList(params?: any): void {
    this.termService
        .getTermList(params)
        .subscribe(
          (model: ResponseList<Term>) => {
              if (model.total > 0) {
                  this.termList = model.data;
              } else {
                  this.termList = [];
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
