import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { LedgerService } from '../../service/ledger.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';
import { Ledger } from '../../model/ledger';


@Component({
  selector: 'app-ledger-grid',
  templateUrl: './ledger-grid.component.html',
  styleUrls: ['./ledger-grid.component.css']
})
export class LedgerGridComponent extends AggridFunction implements OnInit {

  gridList: Ledger[] = [];

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
      { headerName: '발령번호',     field: 'ledgerId',          width: 150, cellStyle: {'text-align': 'center'} },
      { headerName: '발령유형',     field: 'appointmentType',   width: 100 },
      { headerName: '발령등록일',   field: 'registrationDate',  width: 100 },
      { headerName: '설명',         field: 'comment',           width: 300 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.ledgerId;
    };
  }

  ngOnInit() {
    this.getGridList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(params?: any): void {
    this.ledgerService
        .getLedgers(params)
        .subscribe(
          (model: ResponseList<Ledger>) => {
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


