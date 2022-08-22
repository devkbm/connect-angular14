import { Component, Input, OnInit } from '@angular/core';
import { GlobalProperty } from 'src/app/global-property';
import { EmployeeModel } from '../../model/employee-model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee?: EmployeeModel;

  constructor() {}

  ngOnInit(): void {
  }

  getTitle(): string {
    return this.employee ? this.employee.name : '';
  }

  getDescription(): string {
    return this.employee ? this.employee.id : '';
  }

  getImangePath(): string {
    return GlobalProperty.serverUrl + '/static/' + this.employee?.imagePath;
  }
}
