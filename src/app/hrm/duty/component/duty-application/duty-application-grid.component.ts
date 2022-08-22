
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { DutyApplicationService } from '../../service/duty-application.service';
import { DutyApplication } from './../../model/duty-application';

@Component({
  selector: 'app-duty-application-grid',
  templateUrl: './duty-application-grid.component.html',
  styleUrls: ['./duty-application-grid.component.css']
})
export class DutyApplicationGridComponent extends AggridFunction implements OnInit {

  gridList: DutyApplication[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private dutyApplicationService: DutyApplicationService) {

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
      { headerName: '근태신청ID',         field: 'dutyId',              width: 150 },
      { headerName: '사원번호',           field: 'employeeId',          width: 80 },
      { headerName: '근태코드',           field: 'dutyCode',            width: 80 },
      { headerName: '근태사유',           field: 'dutyReason',          width: 80 },
      { headerName: '근태시작일시',       field: 'dutyStartDateTime',   width: 80 },
      { headerName: '근태근태종료일시',   field: 'dutyEndDateTime',     width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.dutyId;
    };
  }

  ngOnInit() {
    this.getGridList('');
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(typeId: string): void {
    const params = {
      dutyCode : typeId
    };

    this.dutyApplicationService
        .getDutyApplicationList(params)
        .subscribe(
          (model: ResponseList<DutyApplication>) => {
            if (model?.total > 0) {
                this.gridList = model.data;
            } else {
                this.gridList = [];
            }
            this.appAlarmService.changeMessage(model?.message);
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

