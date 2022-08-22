import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from '../../core/app/app-base';
import { ResponseObject } from '../../core/model/response-object';

import { BizTypeFormComponent } from './biz-type-form.component';

@Component({
  selector: 'app-biz-code',
  templateUrl: './biz-code.component.html',
  styleUrls: ['./biz-code.component.css']
})
export class BizCodeComponent extends AppBase implements OnInit {

  formDrawerVisible = false;

  queryKey = 'authority';
  queryValue = '';

  @ViewChild('bizForm', {static: false})
  form!: BizTypeFormComponent;

  constructor(location: Location) {
    super(location);
    this.appId = "COM013";
  }

  ngOnInit(): void {
  }

  closeDrawer(): void {
    this.formDrawerVisible = false;
  }

  openDrawer(): void {
    this.formDrawerVisible = true;
  }

  editOpenDrawer(id: string): void {
    this.form.loadForm(id);

    this.openDrawer();
  }
}
