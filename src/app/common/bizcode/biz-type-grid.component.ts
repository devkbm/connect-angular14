import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AggridFunction } from '../../core/grid/aggrid-function';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { ResponseList } from '../../core/model/response-list';

import { BizType } from './biz-type.model';
import { BizTypeService } from './biz-type.service';

@Component({
  selector: 'app-biz-type-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="commonCodeList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class BizTypeGridComponent extends AggridFunction implements OnInit {

  commonCodeList: BizType[] = [];

  @Output() rowSelected = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private commonCodeService: BizTypeService,
              private appAlarmService: AppAlarmService) {

    super();

    this.columnDefs = [
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
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
      { headerName: 'ID',            field: 'id',                    width: 150 },
      { headerName: '공통코드',      field: 'code',                  width: 200 },
      { headerName: '공통코드명',    field: 'codeName',              width: 200 },
      { headerName: '약어',          field: 'codeNameAbbreviation',  width: 200 },
      {
        headerName: '시작일',
        cellRenderer: (data: any) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'fromDate',
        width: 200
      },
      {
        headerName: '종료일',
        cellRenderer: (data: any) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'toDate',
        width: 200
      },
      { headerName: 'Url',           field: 'url',                   width: 200 },
      { headerName: '설명',          field: 'cmt',                   width: 300 }
    ];

    this.getRowId = (data: any) => {
        return data.id;
    };
  }

  ngOnInit(): void {
    this.getCommonCodeList();
  }

  getCommonCodeList(params?: any): void {
    /*
    this.commonCodeService
        .getCommonCodeList(params)
        .subscribe(
          (model: ResponseList<CommonCode>) => {
              if (model.total > 0) {
                  this.commonCodeList = model.data;
              } else {
                  this.commonCodeList = [];
              }
              this.appAlarmService.changeMessage(model.message);
          }
        );
        */
  }

  selectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }

  private onEditButtonClick(e: any): void {
    this.editButtonClicked.emit(e.rowData);
  }

}
