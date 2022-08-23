import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { FormBase, FormType } from '../../core/form/form-base';

import { ResponseObject } from '../../core/model/response-object';
import { ResponseList } from '../../core/model/response-list';

import { BizDetailService } from './biz-detail.service';
import { BizDetail } from './biz-detail.model';

@Component({
  selector: 'app-biz-detail-form',
  templateUrl: './biz-detail-form.component.html',
  styleUrls: ['./biz-detail-form.component.css']
})
export class BizDetailFormComponent extends FormBase implements OnInit {

  constructor(private fb: FormBuilder,
              private formService: BizDetailService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.setupFormGroup();
  }

  setupFormGroup(): void {
    this.fg = this.fb.group({
      typeCode    : new FormControl<string | null>('', {
        validators: [Validators.required]
      }),
      detailCode  : new FormControl<string | null>('', {
        validators: [Validators.required]
      }),
      codeName    : new FormControl<string | null>(null),
      useYn       : new FormControl<boolean | null>(null),
      sequence    : new FormControl<number | null>(null),
      comment     : new FormControl<string | null>(null)
    });
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.get('typeCode')?.enable();
    this.fg.get('detailCode')?.enable();
    this.fg.get('useYn')?.setValue(true);
  }

  modifyForm(formData: BizDetail): void {
    this.formType = FormType.MODIFY;

    this.fg.get('typeCode')?.disable();
    this.fg.get('detailCode')?.disable();
    this.fg.patchValue(formData);
  }

  loadForm(typeCode: string, detailCode: string): void {
    this.formService
        .getBizDetail(typeCode, detailCode)
        .subscribe(
          (model: ResponseObject<BizDetail>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  saveForm(): void {
    this.formService
        .saveBizDetail(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<BizDetail>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  deleteForm(typeCode: string, detailCode: string): void {
    this.formService
        .deleteBizDetail(typeCode, detailCode)
        .subscribe(
          (model: ResponseObject<BizDetail>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
