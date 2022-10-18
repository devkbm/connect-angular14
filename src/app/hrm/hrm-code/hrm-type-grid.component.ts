import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { HrmCodeService } from './hrm-code.service';
import { HrmType } from './hrm-type.model';

@Component({
  selector: 'app-hrm-type-grid',
  template: `
    <ag-grid-angular
        [ngStyle]="style"
        class="ag-theme-balham-dark"
        [rowSelection]="'single'"
        [rowData]="gridList"
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
export class HrmTypeGridComponent extends AggridFunction implements OnInit {

  gridList: HrmType[] = [];
  
  @Output() rowSelected = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private hrmCodeService: HrmCodeService) {

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
      { headerName: '구분ID',       field: 'typeId',          width: 150 },
      { headerName: '구분명',       field: 'typeName',        width: 200 },
      { headerName: '설명',         field: 'comment',         width: 200 },
      { headerName: '사용여부',     field: 'useYn',           width: 80 },
      { headerName: '순번',         field: 'sequence',        width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.data.typeId;
    };
  }

  ngOnInit() {
    this.getGridList("");
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(hrmType: string): void {
    const params = {
      hrmType : hrmType
    };

    this.hrmCodeService
        .getHrmTypeList(params)
        .subscribe(
          (model: ResponseList<HrmType>) => {
            if (model.total > 0) {
              this.gridList = model.data;
            } else {
              this.gridList = [];
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
