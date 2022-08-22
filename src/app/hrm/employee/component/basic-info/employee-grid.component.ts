import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AggridFunction } from 'src/app/core/grid/aggrid-function';
import { ResponseList } from 'src/app/core/model/response-list';
import { EmployeeModel } from '../../model/employee-model';
import { EmployeeService } from '../../service/employee.service';
import { SearchEmployee } from '../../model/search-employee';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent extends AggridFunction implements OnInit {

  @Input()
  gridList: EmployeeModel[] = [];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private employeeService: EmployeeService,
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
      { headerName: '사번',     field: 'id',      width: 150 },
      { headerName: '이름',     field: 'name',    width: 150 },
      { headerName: '주민번호', field: 'residentRegistrationNumber',    width: 150 },
      { headerName: '생일',     field: 'birthday',    width: 150 },
      { headerName: '소속부서',        width: 150,
        valueGetter: function(params: any) {
          let blng_dept = params.data.deptChangeHistory.filter((it: { deptType: string; }) => it.deptType === 'BLNG_DEPT');
          console.log(blng_dept);
          return blng_dept[0].deptName
          //return params.data.deptChangeHistory[0].deptName;
        }
      },
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
    //this.setWidthAndHeight('100%','500px');

    const param = new SearchEmployee('','','','',[]);
    this.getGridList(param);
  }

  private onEditButtonClick(e: any) {
    this.editButtonClicked.emit(e.rowData);
  }

  selectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event: any) {
    this.rowDoubleClicked.emit(event.data);
  }

  public getGridList(params: SearchEmployee): void {

    this.employeeService
        .getEmployeeList(params)
        .subscribe(
          (model: ResponseList<EmployeeModel>) => {
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

}
