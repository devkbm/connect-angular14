import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { TermService } from './term.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseList } from '../../core/model/response-list';
import { Term } from './term';
import { AggridFunction } from '../../core/grid/aggrid-function';

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
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class TermGridComponent extends AggridFunction implements OnInit {

  termList: Term[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

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
      {headerName: '업무영역',    field: 'domain',            width: 100 },
      {headerName: '용어',        field: 'term',              width: 100 },
      {headerName: '한글명',      field: 'nameKor',           width: 100 },
      {headerName: '약어',        field: 'abbreviationKor',   width: 100 },
      {headerName: '영어명',      field: 'nameEng',           width: 150 },
      {headerName: '약어',        field: 'abbreviationEng',   width: 150 },
      {headerName: '설명',        field: 'description',       width: 400 , tooltipField: 'description'},
      {headerName: '비고',        field: 'comment',           width: 400 }
    ];

    this.getRowId = function(data: any) {
        return data.pkTerm;
    };
  }

  ngOnInit() {
    this.getTermList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getTermList(params?: any): void {
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

  selectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

}
