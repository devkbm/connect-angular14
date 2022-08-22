import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';

import { DutyCode } from './../../model/duty-code';
import { DutyCodeService } from '../../service/duty-code.service';


@Component({
  selector: 'app-duty-code-grid',
  templateUrl: './duty-code-grid.component.html',
  styleUrls: ['./duty-code-grid.component.css']
})
export class DutyCodeGridComponent extends AggridFunction implements OnInit {

  gridList: DutyCode[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private dutyCodeService: DutyCodeService) {

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
      { headerName: '근무코드',     field: 'dutyCode',    width: 150 },
      { headerName: '근무명',       field: 'dutyName',    width: 80 },
      { headerName: '사용여부',     field: 'enabled',     width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.dutyCode;
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

    this.dutyCodeService
        .getDutyCodeList(params)
        .subscribe(
          (model: ResponseList<DutyCode>) => {
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

