import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';

import { WebResourceService } from './web-resource.service';
import { WebResource } from './web-resource.model';

@Component({
  selector: 'app-web-resource-grid',
  template: `
    <nz-spin nzTip="Loading..." [nzSpinning]="isLoading">
      <ag-grid-angular
        [ngStyle]="style"
        class="ag-theme-balham-dark"
        [rowSelection]="'single'"
        [rowData]="_list"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [getRowId]="getRowId"
        [frameworkComponents]="frameworkComponents"
        (gridReady)="onGridReady($event)"
        (rowClicked)="rowClickedEvent($event)"
        (rowDoubleClicked)="rowDbClicked($event)">
      </ag-grid-angular>
    </nz-spin>
  `,
  styles: [`
    nz-spin {
      height:100%
    }
    /** nz-spin component 하위 엘리먼트 크기 조정 */
    ::ng-deep .ant-spin-container.ng-star-inserted {
      height: 100%;
    }

    ag-grid-angular {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  `]
})
export class WebResourceGridComponent extends AggridFunction implements OnInit {

  isLoading: boolean = false;
  _list: WebResource[] = [];

  @Output() rowClicked = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private programService: WebResourceService,
              private appAlarmService: AppAlarmService) {

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
      { headerName: '리소스ID',     field: 'resourceId',      width: 150 },
      { headerName: '리소스명',     field: 'resourceName',    width: 200 },
      { headerName: '리소스타입',   field: 'resourceType',    width: 200 },
      { headerName: 'Url',          field: 'url',             width: 200 },
      { headerName: '설명',         field: 'description',     width: 300 }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.getRowId = function(params: any) {
        return params.data.resourceId;
    };
  }

  ngOnInit() {
    this.getList();
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  public getList(params?: any): void {
    this.isLoading = true;
    this.programService
        .getList(params)
        .subscribe(
          (model: ResponseList<WebResource>) => {
            if (model.total > 0) {
              this._list = model.data;
            } else {
              this._list = [];
            }
            this.isLoading = false;
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedEvent(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowClicked.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

}
