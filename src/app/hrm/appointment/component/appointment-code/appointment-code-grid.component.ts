import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppointmentCode } from '../../model/appointment-code';
import { ResponseList } from 'src/app/core/model/response-list';

@Component({
  selector: 'app-appointment-code-grid',
  templateUrl: './appointment-code-grid.component.html',
  styleUrls: ['./appointment-code-grid.component.css']
})
export class AppointmentCodeGridComponent extends AggridFunction implements OnInit {

  gridList: AppointmentCode[] = [];

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
      { headerName: '코드',     field: 'code',        width: 150 },
      { headerName: '코드명',   field: 'codeName',    width: 200 },
      {
        headerName: '사용여부',
        field: 'useYn',
        width: 80,
        cellStyle: {'text-align': 'center', padding: '0px'},
        cellRenderer: 'checkboxRenderer',
        cellRendererParams: {
          label: '',
          disabled: true
        }
      },
      { headerName: '순번',     field: 'sequence',    width: 80 },
      { headerName: '설명',     field: 'comment',     width: 300 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.code;
    };
  }

  ngOnInit() {
    this.getGridList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(params?: any): void {
    this.appointmentCodeService
        .getAppointmentCodeList(params)
        .subscribe(
          (model: ResponseList<AppointmentCode>) => {
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

