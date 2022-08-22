import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { EmployeeGridComponent } from './employee-grid.component';
import { EmployeeFormComponent } from './employee-form.component';
import { SearchEmployee } from '../../model/search-employee';
import { EmployeeModel } from '../../model/employee-model';

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})
export class EmployeeMasterComponent extends AppBase implements OnInit {

  @ViewChild('gridEmployee', {static: true}) gridEmployee!: EmployeeGridComponent;
  @ViewChild('formEmployee', {static: true}) formEmployee!: EmployeeFormComponent;

  employee?: EmployeeModel;
  searchValue: string = '';

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  public getEmployeeForm(emp: any): void {
    this.employee = emp;
    this.formEmployee.getForm(emp.id);
  }

  public getEmployeeGrid(ee: any): void {
    console.log(this.searchValue);
    this.gridEmployee.getGridList(new SearchEmployee(this.searchValue,'', 'BLNG_DEPT', '', []));
  }
}
