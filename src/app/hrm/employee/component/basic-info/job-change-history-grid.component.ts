import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';
import { JobChangeHistory } from '../../model/job-change-history';

@Component({
  selector: 'app-job-change-history-grid',
  templateUrl: './job-change-history-grid.component.html',
  styleUrls: ['./job-change-history-grid.component.css']
})
export class JobChangeHistoryGridComponent extends AggridFunction implements OnInit {

  @Input()
  gridList: JobChangeHistory[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService) {

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
      { headerName: '식별자',     field: 'id',            width: 150 },
      { headerName: '인사유형',   field: 'jobType',       width: 150 },
      { headerName: '인사코드',   field: 'jobCode',       width: 150 },
      { headerName: '시작일',     field: 'period.from',   width: 200 },
      { headerName: '종료일',     field: 'period.to',     width: 200 }
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
    this.setWidthAndHeight('100%','500px');
  }

  onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  selectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

}
