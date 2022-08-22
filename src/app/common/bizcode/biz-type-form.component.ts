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

import { BizType } from './biz-type.model';
import { BizTypeService } from './biz-type.service';

@Component({
  selector: 'app-biz-type-form',
  templateUrl: './biz-type-form.component.html',
  styleUrls: ['./biz-type-form.component.css']
})
export class BizTypeFormComponent extends FormBase implements OnInit {

  bizTypeList = [{code: 'HRM', name: 'HRM'}, {code: 'HRM2', name: 'HRM2'}]

  constructor(private fb: FormBuilder,
    private formService: BizTypeService,
    private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.setupFormGroup();
  }

  setupFormGroup(): void {
    this.fg = this.fb.group({
      id        : [ null, [ Validators.required ] ],
      name      : [ null, [ Validators.required ] ],
      useYn     : [ null ],
      sequence  : [ null ],
      bizType   : [ null, [ Validators.required ] ],
      comment   : [ null ]
    });
  }

  newForm(): void {
    this.formType = FormType.NEW;
    const useYn = this.fg.get('useYn') as AbstractControl;

    useYn.setValue(true);
  }

  modifyForm(formData: BizType): void {
    this.formType = FormType.MODIFY;
    const id = this.fg.get('id') as AbstractControl;

    id.disable();
    this.fg.patchValue(formData);
  }

  loadForm(id: string): void {
    this.formService
        .getBizType(id)
        .subscribe(
          (model: ResponseObject<BizType>) => {
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
        .saveBizType(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<BizType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  deleteForm(id: string): void {
    this.formService
        .deleteBizType(id)
        .subscribe(
          (model: ResponseObject<BizType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }
}
