import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';

import { FirstDataRenderedEvent, GridSizeChangedEvent, RowClickedEvent, RowDoubleClickedEvent, SelectionChangedEvent } from 'ag-grid-community';

import { BoardService } from './board.service';
import { Article } from './article.model';


@Component({
  selector: 'app-article-grid',
  template: `
    <ag-grid-angular
      [ngStyle]="style"
      class="ag-theme-balham-dark"
      [rowSelection]="'single'"
      [rowData]="articleList"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [frameworkComponents]="frameworkComponents"
      (gridReady)="onGridReady($event)"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridSizeChanged)="onGridSizeChanged($event)"
      (rowClicked)="rowClickedEvent($event)"
      (rowDoubleClicked)="rowDbClicked($event)">
  </ag-grid-angular>
  `
})
export class ArticleGridComponent extends AggridFunction implements OnInit {

  articleList: Article[] = [];

  @Output()
  rowClicked = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private boardService: BoardService) {
    super();

    this.columnDefs = [
      {
          headerName: '번호',
          //valueGetter: 'node.rowIndex + 1',
          field: 'articleId',
          width: 70,
          cellStyle: {'text-align': 'center'},
          suppressSizeToFit: true
      },
      {
          headerName: '제목',
          field: 'title'
      },
      {
        headerName: '등록일자',
        cellRenderer: (data: any) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'createdDt',
        width: 210,
        cellStyle: {'text-align': 'center'},
        suppressSizeToFit: true
      },
      {
        headerName: '수정일자',
        cellRenderer: (data: any) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'modifiedDt',
        width: 210,
        cellStyle: {'text-align': 'center'},
        suppressSizeToFit: true
      }
    ];

    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };


    this.getRowId = function(params: any) {
      return params.data.articleId;
    };
  }

  ngOnInit() {
    //this.setWidthAndHeight('100%', '100%');
  }

  getArticleList(fkBoard: any): void {
    this.boardService
        .getArticleList(fkBoard)
        .subscribe(
          (model: ResponseList<Article>) => {
            if (model.total > 0) {
              this.articleList = model.data;
              // this.sizeToFit();
            } else {
              this.articleList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  rowClickedEvent(params: RowClickedEvent) {
    const selectedRows = params.api.getSelectedRows();
    this.rowClicked.emit(selectedRows[0]);
  }

  rowDbClicked(params: RowDoubleClickedEvent) {
    this.rowDoubleClicked.emit(params.data);
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    /*
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = this.gridColumnApi.getAllColumns();

    for (var i = 0; i < allColumns.length; i++) {
      let column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    */
        /*
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
    */

    //this.gridColumnApi.setColumnsVisible(columnsToShow, true);
    //this.gridColumnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

}
