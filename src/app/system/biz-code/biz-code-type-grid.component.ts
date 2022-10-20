import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';

import { BizCodeType } from './biz-code-type.model';
import { BizCodeTypeService } from './biz-code-type.service';

@Component({
  selector: 'app-biz-type-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="_list"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClickedFunc($event)"
      (rowDoubleClicked)="rowDoubleClickedFunc($event)">
    </ag-grid-angular>
  `
})
export class BizCodeTypeGridComponent extends AggridFunction implements OnInit {

  _list: BizCodeType[] = [];

  @Output() rowClickedEvent = new EventEmitter();
  @Output() rowDoubleClickedEvent = new EventEmitter();
  @Output() editButtonClickedEvent = new EventEmitter();

  constructor(private service: BizCodeTypeService,
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
        width: 65,
        cellStyle: {'text-align': 'center'}
      },
      { headerName: '분류ID',       field: 'typeId',        width: 100 },
      { headerName: '분류명',       field: 'typeName',      width: 200 },
      { headerName: '시스템',       field: 'bizType',       width: 200 },
      { headerName: '순번',         field: 'sequence',      width: 50 },
      { headerName: '비고',         field: 'comment',       width: 400 }
    ];

    this.getRowId = (params: any) => {
        return params.data.typeId;
    };
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {    
    this.service        
        .getList()
        .subscribe(
          (model: ResponseList<BizCodeType>) => {
            if (model.total > 0) {
              this._list = model.data;
            } else {
              this._list = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
    
  }

  rowClickedFunc(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();
    this.rowClickedEvent.emit(selectedRows[0]);
  }

  rowDoubleClickedFunc(event: any): void {
    this.rowDoubleClickedEvent.emit(event.data);
  }

  onEditButtonClick(e: any): void {
    this.editButtonClickedEvent.emit(e.rowData);
  }

}
