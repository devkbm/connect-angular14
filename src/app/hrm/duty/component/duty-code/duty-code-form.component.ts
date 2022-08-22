import { DutyCode } from './../../model/duty-code';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { DutyCodeService } from '../../service/duty-code.service';
import { existingDutyCodeValidator } from '../../validator/duty-code-duplication-validator';

@Component({
  selector: 'app-duty-code-form',
  templateUrl: './duty-code-form.component.html',
  styleUrls: ['./duty-code-form.component.css']
})
export class DutyCodeFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb: FormBuilder,
              private dutyCodeService: DutyCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      dutyCode  : new FormControl(null, {
                    validators: Validators.required,
                    asyncValidators: [existingDutyCodeValidator(this.dutyCodeService)],
                    updateOn: 'blur'
                  }),
      dutyName  : [ null, [ Validators.required ] ],
      enabled   : [ null],
      dutyGroup : [ null],
      comment   : [ null]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('dutyCode')?.enable();
    this.fg.get('enabled')?.setValue(true);
  }

  public modifyForm(formData: DutyCode) {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.get('dutyCode')?.disable();
  }

  public getForm(id: string): void {
    this.dutyCodeService
        .getDutyCode(id)
        .subscribe(
          (model: ResponseObject<DutyCode>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public submitForm(): void {
    this.dutyCodeService
        .saveDutyCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<DutyCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteForm(id: string): void {
    this.dutyCodeService
        .deleteDutyCode(id)
        .subscribe(
            (model: ResponseObject<DutyCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
              console.log(err);
            },
            () => {}
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
