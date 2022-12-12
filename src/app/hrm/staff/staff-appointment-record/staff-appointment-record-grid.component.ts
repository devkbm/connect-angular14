import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { StaffAppointmentRecordService } from './staff-appointment-record.service';

import { StaffAppointmentRecord } from './staff-appointment-record.model';

@Component({
  selector: 'app-staff-appointment-record-grid',
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
      (selectionChanged)="selectionChanged($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
    </ag-grid-angular>
  `
})
export class StaffAppointmentRecordGridComponent extends AggridFunction implements OnInit, OnChanges {

  protected _list: StaffAppointmentRecord[] = [];

  @Input() staffId?: string;

  @Output() rowSelected = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private service: StaffAppointmentRecordService) {
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
      { headerName: '발령분류',       field: 'appointmentTypeName',     width: 90 },
      { headerName: '발령일',         field: 'appointmentDate',         width: 90 },
      { headerName: '발령종료일',     field: 'appointmentEndDate',      width: 90 },
      { headerName: '발령기록',       field: 'recordName',              width: 200 },
      { headerName: '소속부서코드',   field: 'blngDeptCode',            width: 100 },
      { headerName: '소속부서명',     field: 'blngDeptName',            width: 100 },
      { headerName: '근무부서코드',   field: 'workDeptCode',            width: 100 },
      { headerName: '근무부서명',     field: 'workDeptName',            width: 100 },
      { headerName: '직군코드',       field: 'jobGroupCode',            width: 80 },
      { headerName: '직군명',         field: 'jobGroupName',            width: 80 },
      { headerName: '직위코드',       field: 'jobPositionCode',         width: 80 },
      { headerName: '직위명',         field: 'jobPositionName',         width: 80 },
      { headerName: '직종코드',       field: 'occupationCode',          width: 80 },
      { headerName: '직종명',         field: 'occupationName',          width: 80 },
      { headerName: '직급코드',       field: 'jobGradeCode',            width: 80 },
      { headerName: '직급명',         field: 'jobGradeName',            width: 80 },
      { headerName: '호봉코드',       field: 'payStepCode',             width: 80 },
      { headerName: '호봉명',         field: 'payStepName',             width: 80 },
      { headerName: '직무코드',       field: 'jobCode',                 width: 80 },
      { headerName: '직무명',         field: 'jobName',                 width: 80 },
      { headerName: '직책코드',       field: 'dutyResponsibilityCode',  width: 80 },
      { headerName: '직책명',         field: 'dutyResponsibilityName',  width: 80 },
      { headerName: '비고',           field: 'comment',                 width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(params: any) {
      return params.data.seq;
    };

  }

  ngOnInit() {
    console.log('StaffAppointmentRecordGridComponent init');
    //this.setWidthAndHeight('100%', '600px');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['staffId']) {
      this.getList(changes['staffId'].currentValue);
    }
  }

  getList(staffId: string): void {
    this.service
        .getList(staffId)
        .subscribe(
          (model: ResponseList<StaffAppointmentRecord>) => {
              if (model.total > 0) {
                this._list = model.data;
              } else {
                this._list = [];
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

  onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }
}
