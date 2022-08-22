import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';
import { AppointmentCodeDetail } from '../../model/appointment-code-detail';

@Component({
  selector: 'app-appointment-code-detail-grid',
  templateUrl: './appointment-code-detail-grid.component.html',
  styleUrls: ['./appointment-code-detail-grid.component.css']
})
export class AppointmentCodeDetailGridComponent extends AggridFunction implements OnInit {

  gridList: AppointmentCodeDetail[] = [];

  @Input()
  appointmentCode: any;

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private appointmentCodeService: AppointmentCodeService) {

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
      { headerName: '인사유형',     field: 'changeType',    width: 200 },
      { headerName: '인사유형코드', field: 'changeTypeDetail',    width: 200 },
      { headerName: '순번',         field: 'sequence',    width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.code + data.changeType + data.changeTypeDetail;
    };
  }

  ngOnInit() {

  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(appointmentCode: string, filter: object): void {
    const params = {
      appointmentCode : appointmentCode
    };

    this.appointmentCodeService
        .getAppointmentCodeDetailList(params)
        .subscribe(
          (model: ResponseList<AppointmentCodeDetail>) => {
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

}
