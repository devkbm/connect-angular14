import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';

import { HrmTypeDetailCode } from '../../model/hrm-type-detail-code';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { HrmCodeService } from '../../service/hrm-code.service';
import { ResponseList } from 'src/app/core/model/response-list';

@Component({
  selector: 'app-hrm-type-code-grid',
  templateUrl: './hrm-type-code-grid.component.html',
  styleUrls: ['./hrm-type-code-grid.component.css']
})
export class HrmTypeCodeGridComponent extends AggridFunction implements OnInit {

  gridList: HrmTypeDetailCode[] = [];

  @Input()
  appointmentCode: any = '';

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private hrmCodeService: HrmCodeService) {

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
      { headerName: '코드명',       field: 'codeName',    width: 200 },
      { headerName: '설명',         field: 'comment',     width: 200 },
      { headerName: '순번',         field: 'sequence',    width: 80 }
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

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getGridList(typeId: string): void {
    const params = {
      typeId : typeId
    };

    this.hrmCodeService
        .getHrmTypeDetailCodeList(params)
        .subscribe(
          (model: ResponseList<HrmTypeDetailCode>) => {
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
