import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { DeptTreeComponent } from './dept-tree.component';
import { DeptFormComponent } from './dept-form.component';
import { AppBase } from '../../core/app/app-base';
import { MenuBreadCrumb, SessionManager } from 'src/app/core/session-manager';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent extends AppBase implements OnInit {

  @ViewChild('deptTree', {static: true})
  tree!: DeptTreeComponent;

  @ViewChild('deptForm', {static: true})
  form!: DeptFormComponent;

  queryKey = 'programCode';
  queryValue = '';  

  //menuBreadCrumb: MenuBreadCrumb[] = SessionManager.createBreadCrumb();

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
    this.getDeptTree();
  }

  getDeptTree(): void {
    this.tree.getDeptHierarchy();
  }

  initForm(): void {
    this.form.newForm();
  }

  saveDept(): void {  
    this.form.submitDept();
  }

  deleteDept(): void {
    this.form.deleteDept();
  }

  selectedItem(item: any): void {
    this.form.getDept(item.deptCode);
  }

}
