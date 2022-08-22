import { ResponseList } from '../../../../core/model/response-list';
import { DutyCode } from './../../model/duty-code';
import { DutyApplication } from './../../model/duty-application';
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
import { DutyApplicationService } from '../../service/duty-application.service';
import { DutyCodeService } from '../../service/duty-code.service';
import { HrmCoreService } from 'src/app/hrm/hrm-core/service/hrm-core.service';

@Component({
  selector: 'app-duty-application-form',
  templateUrl: './duty-application-form.component.html',
  styleUrls: ['./duty-application-form.component.css']
})
export class DutyApplicationFormComponent extends FormBase  implements OnInit {

   ;
  dutyCodeList: any[] = [];
  employeeList: any[] = [];

  constructor(private fb: FormBuilder,
              private dutyApplicationService: DutyApplicationService,
              private dutyCodeService: DutyCodeService,
              private hrmCoreService: HrmCoreService,
              private appAlarmService: AppAlarmService) {  super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      dutyId      : [ null, [ Validators.required ] ],
      employeeId  : [ null, [ Validators.required ] ],
      dutyCode    : [ null],
      dutyReason        : [ null],
      dutyStartDateTime : [ null],
      dutyEndDateTime   : [ null]
    });
    this.getDutyCodeList();
    this.getEmployeeList();
    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('employeeId')?.enable();
    this.fg.get('dutyStartDateTime')?.setValue(new Date());
    this.fg.get('dutyEndDateTime')?.setValue(new Date());
  }

  public modifyForm(formData: DutyApplication) {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.get('employeeId')?.disable();
  }

  public getForm(id: string): void {
    this.dutyApplicationService
        .getDutyApplication(id)
        .subscribe(
          (model: ResponseObject<DutyApplication>) => {
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
    this.dutyApplicationService
        .saveDutyApplication(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<DutyApplication>) => {
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
    this.dutyApplicationService
        .deleteDutyApplication(id)
        .subscribe(
            (model: ResponseObject<DutyApplication>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
              console.log(err);
            },
            () => {}
        );
  }

  public getDutyCodeList(): void {
    this.dutyCodeService
        .getDutyCodeList(null)
        .subscribe(
          (model: ResponseList<DutyCode>) => {
            console.log(model.data);
            this.dutyCodeList = model.data;
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

  public getEmployeeList(): void {
    this.hrmCoreService
        .getEmployeeList()
        .subscribe(
          (model: ResponseList<any>) => {
            console.log(model.data);
            this.employeeList = model.data;
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

}
