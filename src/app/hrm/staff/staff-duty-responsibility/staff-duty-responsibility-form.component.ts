import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { BizCode } from 'src/app/system/biz-code/biz-code.model';
import { BizCodeService } from 'src/app/system/biz-code/biz-code.service';
import { DeptService } from 'src/app/system/dept/dept.service';

@Component({
  selector: 'app-staff-duty-responsibility-form',
  templateUrl: './staff-duty-responsibility-form.component.html',
  styleUrls: ['./staff-duty-responsibility-form.component.css']
})
export class StaffDutyResponsibilityFormComponent extends FormBase implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder,
              private service: BizCodeService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      typeId      : new FormControl<string | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      code        : new FormControl<string | null>('', { validators: [Validators.required] }),
      codeName    : new FormControl<string | null>(null),
      useYn       : new FormControl<boolean | null>(null),
      sequence    : new FormControl<number | null>(null),
      comment     : new FormControl<string | null>(null)
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.initLoadId && this.initLoadId.typeId && this.initLoadId.code) {
      this.get(this.initLoadId.typeId, this.initLoadId.code);
    } else if (this.initLoadId && this.initLoadId.typeId) {
      console.log(this.initLoadId);
      this.newForm(this.initLoadId.typeId);
    }
  }


  newForm(typeId: string): void {
    this.formType = FormType.NEW;

    this.fg.get('typeId')?.setValue(typeId);
    this.fg.get('code')?.enable();
    this.fg.get('useYn')?.setValue(true);
  }

  modifyForm(formData: BizCode): void {
    this.formType = FormType.MODIFY;

    this.fg.get('code')?.disable();
    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(typeId: string, code: string): void {
    this.service
        .get(typeId, code)
        .subscribe(
          (model: ResponseObject<BizCode>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm('');
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<BizCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  remove(typeCode: string, detailCode: string): void {
    this.service
        .delete(typeCode, detailCode)
        .subscribe(
          (model: ResponseObject<BizCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

}
