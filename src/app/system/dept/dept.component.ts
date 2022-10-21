import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from 'src/app/core/app/app-base';

import { DeptTreeComponent } from './dept-tree.component';
import { DeptFormComponent } from './dept-form.component';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent extends AppBase implements OnInit {

  @ViewChild('deptTree') tree!: DeptTreeComponent;
  @ViewChild('deptForm') form!: DeptFormComponent;
  
  queryValue = '';  

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
    this.form.save();
  }

  deleteDept(): void {
    this.form.remove();
  }

  selectedItem(item: any): void {
    this.form.get(item.deptCode);
  }

}
