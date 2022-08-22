import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CheckableDeptTreeComponent } from 'src/app/common/dept/checkable-dept-tree.component';
import { EmployeeGridComponent } from '../basic-info/employee-grid.component';
import { SearchEmployee } from '../../model/search-employee';


@Component({
  selector: 'app-dept-employee-list',
  templateUrl: './dept-employee-list.component.html',
  styleUrls: ['./dept-employee-list.component.css']
})
export class DeptEmployeeListComponent implements OnInit {

  treeSearchText: any;

  @ViewChild('deptTree', {static: true})
  tree!: CheckableDeptTreeComponent;

  @ViewChild('employeeGrid', {static: true})
  grid!: EmployeeGridComponent;

  constructor() { }

  ngOnInit() {
    this.tree.getDeptHierarchy();
    this.grid.setWidthAndHeight('100%','calc(100% - 60px');
  }

  deptTreeSelected(item: any) {
    this.tree.defaultCheckedKeys = [item.deptCode];
    this.grid.getGridList(new SearchEmployee('','','BLNG_DEPT','',this.tree.defaultCheckedKeys));
  }

  deptTreeChecked(item: any) {
    console.log(item);

    this.grid.getGridList(new SearchEmployee('','','BLNG_DEPT','',item));
  }

}
