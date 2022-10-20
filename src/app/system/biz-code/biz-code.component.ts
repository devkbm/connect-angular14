import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from '../../core/app/app-base';
import { ResponseObject } from '../../core/model/response-object';

import { BizCodeTypeFormComponent } from './biz-code-type-form.component';
import { BizCodeTypeGridComponent } from './biz-code-type-grid.component';
import { BizCodeGridComponent } from './biz-code-grid.component';

@Component({
  selector: 'app-biz-code',
  templateUrl: './biz-code.component.html',
  styleUrls: ['./biz-code.component.css']
})
export class BizCodeComponent extends AppBase implements OnInit {
  
  @ViewChild(BizCodeTypeGridComponent) gridCodeType!: BizCodeTypeGridComponent;
  @ViewChild(BizCodeGridComponent) gridCode!: BizCodeGridComponent;  

  codeType: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  code: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  constructor(location: Location) {
    super(location);
    this.appId = "COM013";
  }

  ngOnInit(): void {
  }
  
  selectBizCodeTypeList() {
    this.codeType.drawerVisible = false;

    this.gridCodeType.getList();
  }

  newCodeType() {
    this.codeType.selectedRowId = null;
    this.codeType.drawerVisible = true;
  }

  editCodeType(params: any) {
    this.codeType.selectedRowId = params.typeId;
    this.codeType.drawerVisible = true;
  }

  codeTypeGridRowClicked(params: any) {
    this.codeType.selectedRowId = params.typeId;   
    this.code.selectedRowId = {typeId: params.typeId};

    this.gridCode.getList(this.code.selectedRowId.typeId);
  }

  selectBizCodeList() {
    this.code.drawerVisible = false;
    this.gridCode.getList(this.code.selectedRowId.typeId);
  }

  newCode() {    
    this.code.drawerVisible = true;
  }

  editCode(params: any) {
    this.code.selectedRowId = {typeId: params.typeId, code: params.code};
    this.code.drawerVisible = true;
  }

  codeGridRowClicked(params: any) {    
    this.code.selectedRowId = {typeId: params.typeId, code: params.code};
  }

}
