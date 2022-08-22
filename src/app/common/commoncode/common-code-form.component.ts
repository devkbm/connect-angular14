import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { CommonCodeService } from './common-code.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { CommonCode } from './common-code.model';
import { CommonCodeHierarchy } from './common-code-hierarchy.model';
import { ResponseList } from '../../core/model/response-list';
import { FormBase, FormType } from '../../core/form/form-base';
import { SystemTypeEnum } from './system-type-enum.model';


@Component({
  selector: 'app-common-code-form',
  templateUrl: './common-code-form.component.html',
  styleUrls: ['./common-code-form.component.css']
})
export class CommonCodeFormComponent extends FormBase implements OnInit {

   ;
  nodeItems: CommonCodeHierarchy[] = [];
  systemTypeCodeList: SystemTypeEnum[] = [];

  constructor(private fb: FormBuilder,
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      id                      : [ null ],
      systemTypeCode          : [ null ],
      parentId                : [ null ],
      code                    : [ null, [ Validators.required ] ],
      codeName                : [ null, [ Validators.required ] ],
      codeNameAbbreviation    : [ null ],
      fromDate                : [ null, [ Validators.required ] ],
      toDate                  : [ null, [ Validators.required ] ],
      seq                     : [ null ],
      hierarchyLevel          : [ null ],
      fixedLengthYn           : [ null ],
      codeLength              : [ null ],
      cmt                     : [ null ]
    });

    this.newForm(null);

    this.getCommonCodeHierarchy('');
    this.getSystemTypeCode();
  }

  newForm(parentId: any): void {
    this.formType = FormType.NEW;
    this.fg.reset();

    this.fg.get('id')?.disable();
    this.fg.get('code')?.enable();
    this.fg.get('systemTypeCode')?.enable();
    this.fg.get('parentId')?.setValue(parentId);
    this.fg.get('seq')?.setValue(1);
    this.fg.get('fromDate')?.setValue(new Date());
    this.fg.get('toDate')?.setValue(new Date(9999, 11, 31));
  }

  modifyForm(formData: CommonCode): void {
    this.formType = FormType.MODIFY;

    this.fg.get('id')?.disable();
    this.fg.get('code')?.disable();
    this.fg.get('systemTypeCode')?.disable();

    this.fg.patchValue(formData);
  }

  getCommonCode(id: string): void {
    this.commonCodeService
        .getCommonCode(id)
        .subscribe(
            (model: ResponseObject<CommonCode>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm('');
              }
              this.appAlarmService.changeMessage(model.message);
            }
        );
  }

  getCommonCodeHierarchy(systemTypeCode: string): void {
    const params = {
      systemTypeCode: systemTypeCode
    };

    this.commonCodeService
        .getCommonCodeHierarchy(params)
        .subscribe(
          (model: ResponseList<CommonCodeHierarchy>) => {
            if ( model.total > 0 ) {
              this.nodeItems = model.data;
            } else {
              this.nodeItems = new Array<CommonCodeHierarchy>(0);
            }
          }
        );
  }

  submitCommonCode(): void {
    if (this.validForm(this.fg) === false)
      return;

    this.commonCodeService
        .registerCommonCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteCommonCode(): void {
    this.commonCodeService
        .deleteCommonCode(this.fg.get('id')?.value)
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
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
