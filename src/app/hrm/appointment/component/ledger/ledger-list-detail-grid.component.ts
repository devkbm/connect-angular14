import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';
import { LedgerService } from '../../service/ledger.service';
import { LedgerChangeInfo } from '../../model/ledger-change-info';

@Component({
  selector: 'app-ledger-list-detail-grid',
  templateUrl: './ledger-list-detail-grid.component.html',
  styleUrls: ['./ledger-list-detail-grid.component.css']
})
export class LedgerListDetailGridComponent extends AggridFunction implements OnInit {

  gridList: LedgerChangeInfo[] = [];

  @Input()
  appointmentCode: any;

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private ledgerService: LedgerService) {

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
      { headerName: '변경유형',     field: 'changeType',        width: 200 },
      { headerName: '변경유형상세', field: 'changeTypeDetail',  width: 200 },
      { headerName: '코드',         field: 'changeCode',        width: 150, editable: true},
      { headerName: '순번',         field: 'sequence',          width: 80 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.changeType + data.changeTypeDetail;
    };
  }

  ngOnInit() {

  }

  public click(params: any) {
    this.getGridList("A01");

    console.log(this.gridList);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(appointmentCode: string): void {
    /*
    this.ledgerService
        .getAppointmentCodeDetailList(appointmentCode)
        .subscribe(
          (model: ResponseList<LedgerChangeInfo>) => {
              if (model.total > 0) {
                  this.gridList = model.data;
              } else {
                  this.gridList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
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

}
