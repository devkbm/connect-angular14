import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';

import { AppBase } from '../../core/app/app-base';
import { ResponseList } from '../../core/model/response-list';

import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';
import { CommonCodeService } from './common-code.service';
import { SystemTypeEnum } from './system-type-enum.model';
import { MenuBreadCrumb, SessionManager } from 'src/app/core/session-manager';
import { ButtonTemplate } from 'src/app/shared/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-common-code',
  templateUrl: './common-code.component.html',
  styleUrls: ['./common-code.component.css']
})
export class CommonCodeComponent extends AppBase implements OnInit {

  menuBreadCrumb: MenuBreadCrumb[] = SessionManager.createBreadCrumb();

  @ViewChild(CommonCodeTreeComponent, {static: true})
  tree!: CommonCodeTreeComponent;

  @ViewChild(CommonCodeFormComponent, {static: true})
  form!: CommonCodeFormComponent;

  systemTypeCodeList: SystemTypeEnum[] = [];

  systeTypeCode = 'COM';
  queryValue = '';
  selectedCode = '';

  buttons: ButtonTemplate[] = [{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getCommonCodeTree();
    }
  },{
    text: '신규',
    nzType: 'form',
    click: (e: MouseEvent) => {
      this.newForm();
    }
  },{
    text: '저장',
    nzType: 'save',
    popConfirm: {
      title: '저장하시겠습니까?',
      confirmClick: () => {
        this.saveCommonCode();
      }
    }
  },{
    text: '삭제',
    nzType: 'delete',
    isDanger: true,
    popConfirm: {
      title: '삭제하시겠습니까?',
      confirmClick: () => {
        this.deleteCommonCode();
      }
    }
  }];

  constructor(location: Location,
              private commonCodeService: CommonCodeService) {
      super(location);
  }

  ngOnInit(): void {
    this.getSystemTypeCode();
  }

  getCommonCodeTree(): void {
    this.tree.getCommonCodeHierarchy(this.systeTypeCode);
    this.form.getCommonCodeHierarchy(this.systeTypeCode);
    this.selectedCode = '';
  }

  newForm(): void {
    this.form.newForm(this.selectedCode);
  }

  saveCommonCode(): void {
    this.form.submitCommonCode();
  }

  deleteCommonCode(): void {
    this.form.deleteCommonCode();
  }

  selectedItem(item: any): void {
    this.selectedCode = item.id;
    this.form.getCommonCode(item.id);
  }

  getSystemTypeCode(): void {
    this.commonCodeService
      .getSystemTypeList()
      .subscribe(
        (model: ResponseList<SystemTypeEnum>) => {
          this.systemTypeCodeList = model.data;
        }
      );
  }

}
