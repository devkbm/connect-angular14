import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { CommonCodeFormComponent } from './common-code-form.component';
import { CommonCodeTreeComponent } from './common-code-tree.component';
import { AppBase } from '../../core/app/app-base';
import { CommonCodeService } from './common-code.service';
import { ResponseList } from '../../core/model/response-list';
import { SystemTypeEnum } from './system-type-enum.model';

@Component({
  selector: 'app-common-code',
  templateUrl: './common-code.component.html',
  styleUrls: ['./common-code.component.css']
})
export class CommonCodeComponent extends AppBase implements OnInit {

  systemTypeCodeList: SystemTypeEnum[] = [];

  systeTypeCode = 'COM';
  queryValue = '';
  selectedCode = '';

  @ViewChild('commonCodeTree', {static: true})
  tree!: CommonCodeTreeComponent;

  @ViewChild('commonCodeForm', {static: false})
  form!: CommonCodeFormComponent;

  constructor(location: Location,
              private commonCodeService: CommonCodeService) {
      super(location);
  }

  ngOnInit(): void {
    this.getSystemTypeCode();
  }

  public getCommonCodeTree(): void {
    this.tree.getCommonCodeHierarchy(this.systeTypeCode);
    this.form.getCommonCodeHierarchy(this.systeTypeCode);
    this.selectedCode = '';
  }

  public newForm(): void {
      this.form.newForm(this.selectedCode);
  }

  public saveCommonCode(): void {
      this.form.submitCommonCode();
  }

  public deleteCommonCode(): void {
      this.form.deleteCommonCode();
  }

  public selectedItem(item: any): void {
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
