import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthorityService } from './authority.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseList } from '../../core/model/response-list';
import { AggridFunction } from '../../core/grid/aggrid-function';
import { Authority } from './authority.model';

@Component({
  selector: 'app-authority-grid',
  template: `
    <nz-spin nzTip="Loading..." [nzSpinning]="isLoading">
      <ag-grid-angular
        [ngStyle]="style"
        class="ag-theme-balham-dark"
        rowSelection="single"
        [rowData]="authorityList"
        [columnDefs]="columnDefs"
        [getRowId]="getRowId"
        [frameworkComponents]="frameworkComponents"
        (gridSize)="test($event)"
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

    ::ng-deep .header-center .ag-cell-label-container { flex-direction: row; justify-content: center; }
    ::ng-deep .header-center .ag-header-cell-label { flex-direction: row; justify-content: center; }

    ::ng-deep .header-right .ag-cell-label-container { flex-direction: row; }
    ::ng-deep .header-right .ag-header-cell-label { flex-direction: row-reverse; }
    /*
    ::ng-deep .ag-theme-balham-dark .ag-header {
      font-family: cursive;
    }
    ::ng-deep .ag-theme-balham-dark .ag-header-cell {
      font-size: 18px;
    }
    */
  `]
})
export class AuthorityGridComponent extends AggridFunction implements OnInit {

  isLoading: boolean = false;
  authorityList: Authority[] = [];

  @Output() rowClicked = new EventEmitter();
  @Output() rowDoubleClicked = new EventEmitter();
  @Output() editButtonClicked = new EventEmitter();

  constructor(private service: AuthorityService,
              private appAlarmService: AppAlarmService) {
    super();

    this.columnDefs = [
        {
            headerName: '',
            sortable: true,
            resizable: true,
            width: 34,
            suppressSizeToFit: true,
            cellStyle: {'text-align': 'center', padding: '0px'},
            cellRenderer: 'buttonRenderer',
            cellRendererParams: {
              onClick: this.onEditButtonClick.bind(this),
              label: '',
              iconType: 'form'
            }
        },
        {
            headerName: 'No',
            headerClass: 'header-center',
            valueGetter: 'node.rowIndex + 1',
            sortable: true,
            resizable: true,
            suppressSizeToFit: true,
            width: 70,
            cellStyle: {'text-align': 'center'}
        },
        {
            headerName: '권한ID',
            headerClass: 'header-center',
            field: 'id',
            sortable: true,
            resizable: true,
            suppressSizeToFit: true,
            width: 150

        },
        {
          headerName: '권한코드',
          field: 'authorityCode',
          sortable: true,
          resizable: true,
          suppressSizeToFit: true,
          width: 100
      },
        {
            headerName: '설명',
            field: 'description',
            sortable: true,
            resizable: true
        }
    ];

    this.getRowId = function(args: any) {
//      console.log(args);
      return args.data.authority;
    };
  }

  ngOnInit() {
    this.getList();
  }

  getList(params?: any): void {
    this.isLoading = true;
    this.service
        .getAuthorityList(params)
        .subscribe(
          (model: ResponseList<Authority>) => {
            if (model.total > 0) {
              this.authorityList = model.data;
              this.sizeToFit();
            } else {
              this.authorityList = [];
            }
            this.isLoading = false;
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedEvent(args: any): void {
    this.rowClicked.emit(args.data);
  }

  rowDbClicked(args: any): void {
    this.rowDoubleClicked.emit(args.data);
  }

  public test(event: any): void {
    console.log(event);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

}