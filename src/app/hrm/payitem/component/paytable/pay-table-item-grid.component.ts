import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';
import { PayTableService } from './../../service/pay-table.service';
import { PayTable } from '../../model/pay-table';

@Component({
  selector: 'app-pay-table-item-grid',
  templateUrl: './pay-table-item-grid.component.html',
  styleUrls: ['./pay-table-item-grid.component.scss']
})
export class PayTableItemGridComponent extends AggridFunction implements OnInit {

  gridList: PayTable[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private payTableService: PayTableService) {
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
      { headerName: '식별자',       field: 'id',        width: 60 },
      { headerName: '구분코드1',    field: 'code1',     width: 80},
      { headerName: '구분코드2',    field: 'code2',     width: 80 },
      { headerName: '구분코드3',    field: 'code3',     width: 80 },
      { headerName: '금액',         field: 'ammount',     width: 80 },
      { headerName: '비고',         field: 'comment',   width: 200 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = (data: any) => {
        return data.id;
    };
  }

  ngOnInit() {
  }

  click(params: any) {
    //this.getGridList("A01");

    console.log(this.gridList);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  getGridList(payTableId: string): void {

    this.payTableService
        .getPayTableItemList(payTableId)
        .subscribe(
          (model: ResponseList<PayTable>) => {
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

  selectionChanged(event: any): void {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any): void {
    this.rowDoubleClicked.emit(event.data);
  }
}
