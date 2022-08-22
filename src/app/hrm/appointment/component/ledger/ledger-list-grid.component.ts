import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { LedgerService } from '../../service/ledger.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';
import { LedgerList } from '../../model/ledger-list';

@Component({
  selector: 'app-ledger-list-grid',
  templateUrl: './ledger-list-grid.component.html',
  styleUrls: ['./ledger-list-grid.component.css']
})
export class LedgerListGridComponent extends AggridFunction implements OnInit {

  gridList: LedgerList[] = [];

  @Input() ledgerId: any;

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
      { headerName: '식별자',       field: 'listId',              width: 100 },
      { headerName: '순번',         field: 'sequence',            width: 50 },
      { headerName: '직원번호',     field: 'empId',               width: 100 },
      { headerName: '직원명',       field: 'empName',             width: 100 },
      { headerName: '발령코드',     field: 'appointmentCode',     width: 100 },
      { headerName: '발령코드명',   field: 'appointmentCodeName', width: 100 },
      { headerName: '발령일',       field: 'appointmentFromDate', width: 100 },
      { headerName: '발령종료일',   field: 'appointmentToDate',   width: 100 },
      { headerName: '처리여부',     field: 'finishYn',            width: 50 },
      {
        headerName: '',
        width: 34,
        cellStyle: {'text-align': 'center', 'padding': '0px'},
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onProcessButtonClick.bind(this),
          label: '발령처리',
          iconType: 'form'
        }
      },
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(data: any) {
        return data.listId;
    };
  }

  ngOnInit() {
    this.getGridList();
  }

  onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  onProcessButtonClick(e: any): void {
    console.log(this.ledgerId);
    console.log(e.rowData);
    this.ledgerService
        .apponitProcess(e.rowData.listId)
        .subscribe(
          (model: string) => {
            console.log(model);
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public getGridList(params?: any): void {
    this.ledgerService
        .getLedgerLists(params)
        .subscribe(
          (model: ResponseList<LedgerList>) => {
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


