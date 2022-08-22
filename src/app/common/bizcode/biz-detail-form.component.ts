import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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

   ;

  constructor(private fb: FormBuilder,
              private formService: BizDetailService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.setupFormGroup();
  }

  setupFormGroup(): void {
    this.fg = this.fb.group({
      typeCode    : [ null, [ Validators.required ] ],
      detailCode  : [ null, [ Validators.required ] ],
      codeName    : [ null ],
      useYn       : [ null ],
      sequence    : [ null ],
      comment     : [ null ]
    });
  }

  newForm(): void {
    this.formType = FormType.NEW;
    const typeCode = this.fg.get('typeCode') as AbstractControl;
    const detailCode = this.fg.get('detailCode') as AbstractControl;
    const useYn = this.fg.get('useYn') as AbstractControl;

    typeCode.enable();
    detailCode.enable();
    useYn.setValue(true);
  }

  modifyForm(formData: BizDetail): void {
    this.formType = FormType.MODIFY;
    const typeCode = this.fg.get('typeCode') as AbstractControl;
    const detailCode = this.fg.get('detailCode') as AbstractControl;

    typeCode.disable();
    detailCode.disable();
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
