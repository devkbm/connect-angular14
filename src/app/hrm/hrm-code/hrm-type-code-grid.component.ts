import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { HrmCodeService } from './hrm-code.service';
import { HrmTypeDetailCode } from './hrm-type-detail-code';

@Component({
  selector: 'app-hrm-type-code-grid',
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
export class HrmTypeCodeGridComponent extends AggridFunction implements OnInit {

  gridList: HrmTypeDetailCode[] = [];

  @Input()
  appointmentCode: any = '';

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

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
      { headerName: '코드',         field: 'code',        width: 150 },
      { headerName: '코드명',       field: 'codeName',    width: 200 },
      { headerName: '설명',         field: 'comment',     width: 200 },
      { headerName: '사용여부',     field: 'useYn',       width: 80 },
      { headerName: '순번',         field: 'sequence',    width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(params: any) {
        return params.data.typeId + params.data.code;
    };
  }

  ngOnInit() {
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(typeId: string): void {
    const params = {
      typeId : typeId
    };

    this.hrmCodeService
        .getHrmTypeDetailCodeList(params)
        .subscribe(
          (model: ResponseList<HrmTypeDetailCode>) => {
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
