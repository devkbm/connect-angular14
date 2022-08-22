import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { StaffAppointmentRecordService } from './staff-appointment-record.service';

import { StaffAppointmentRecord } from './staff-appointment-record.model';

@Component({
  selector: 'app-staff-appointment-record-grid',
  templateUrl: './staff-appointment-record-grid.component.html',
  styleUrls: ['./staff-appointment-record-grid.component.css']
})
export class StaffAppointmentRecordGridComponent extends AggridFunction implements OnInit {

  gridList: StaffAppointmentRecord[] = [];

  @Input()
  appointmentCode: any = '';

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private staffAppointmentRecordService: StaffAppointmentRecordService) {
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
      { headerName: '발령일',         field: 'appointmentDate',         width: 150 },
      { headerName: '발령종료일',     field: 'appointmentEndDate',      width: 200 },
      { headerName: '발령기록',       field: 'recordName',              width: 200 },
      { headerName: '비고',           field: 'comment',                 width: 80 },
      { headerName: '소속부서코드',   field: 'blngDeptCode',            width: 80 },
      { headerName: '근무부서코드',   field: 'workDeptCode',            width: 80 },
      { headerName: '직군코드',       field: 'jobGroupCode',            width: 80 },
      { headerName: '직위코드',       field: 'jobPositionCode',         width: 80 },
      { headerName: '직종코드',       field: 'occupationCode',          width: 80 },
      { headerName: '직급코드',       field: 'jobGradeCode',            width: 80 },
      { headerName: '호봉코드',       field: 'payStepCode',             width: 80 },
      { headerName: '직무코드',       field: 'jobCode',                 width: 80 },
      { headerName: '직책코드',       field: 'dutyResponsibilityCode',  width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.id;
    };

  }

  ngOnInit() {
  }

  getGridList(staffId: string): void {
    this.staffAppointmentRecordService
        .getStaffAppointmentRecordList(staffId)
        .subscribe(
          (model: ResponseList<StaffAppointmentRecord>) => {
              if (model.total > 0) {
                  this.gridList = model.data;
              } else {
                  this.gridList = [];
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  selectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }
}
