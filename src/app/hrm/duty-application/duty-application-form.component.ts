import { formatDate } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { HrmCoreService } from 'src/app/hrm/hrm-core/service/hrm-core.service';
import { HrmCode } from '../hrm-code/hrm-code.model';
import { HrmCodeService } from '../hrm-code/hrm-code.service';
import { DutyApplication } from './duty-application';
import { DutyDate } from './duty-application.model';
import { DutyApplicationService } from './duty-application.service';
import { DutyCodeService } from './duty-code.service';

@Component({
  selector: 'app-duty-application-form',
  templateUrl: './duty-application-form.component.html',
  styleUrls: ['./duty-application-form.component.css']
})
export class DutyApplicationFormComponent extends FormBase  implements OnInit {

  /**
   * 근태신청분류 - HR1001
   */
  dutyCodeList: HrmCode[] = [];

  constructor(private fb: FormBuilder,
              private service: DutyApplicationService,
              private hrmCodeService: HrmCodeService,
              private dutyCodeService: DutyCodeService,
              private hrmCoreService: HrmCoreService,
              private appAlarmService: AppAlarmService) {  super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      dutyId            : new FormControl<string | null>(null, { validators: Validators.required }),
      staffId           : new FormControl<string | null>(null, { validators: Validators.required }),
      dutyCode          : new FormControl<string | null>(null),
      dutyReason        : new FormControl<string | null>(null),
      fromDate          : new FormControl<Date | null>(null),
      toDate            : new FormControl<Date | null>(null),
      selectedDate      : new FormControl<DutyDate[] | null>(null),
      dutyTime          : new FormControl<number | null>(null)
    });

    this.fg.get('fromDate')?.valueChanges.subscribe(x => {
      if (x) {
        const toDate = this.fg.get('toDate')?.value;
        this.getDutyDateList(x, toDate);
      }
    });

    this.fg.get('toDate')?.valueChanges.subscribe(x => {
      if (x) {
        const fromDate = this.fg.get('fromDate')?.value;
        this.getDutyDateList(fromDate, x);
      }
    });

    this.getDutyCodeList();
    this.newForm();
  }

  newForm() {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('staffId')?.enable();
    this.fg.get('fromDate')?.setValue(formatDate(new Date(),'YYYY-MM-dd','ko-kr'));
    this.fg.get('toDate')?.setValue(formatDate(new Date(),'YYYY-MM-dd','ko-kr'));
    /*
      date: Date;
      isSelected: boolean;
      isHoliday: boolean;
      isSaturday: boolean;
      isSunday: boolean;
    */
    this.fg.get('selectedDate')?.setValue([{ date: new Date(), isSelected: false}]);
    this.fg.get('dutyTime')?.setValue(8);
  }

  modifyForm(formData: DutyApplication) {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.get('staffId')?.disable();
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string) {
    this.service
        .getDutyApplication(id)
        .subscribe(
          (model: ResponseObject<DutyApplication>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  save() {
    console.log('save');
    this.service
        .saveDutyApplication(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<DutyApplication>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(id: string) {
    this.service
        .deleteDutyApplication(id)
        .subscribe(
          (model: ResponseObject<DutyApplication>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getDutyCodeList() {
    const params = {
      typeId : 'HR1001'
    };

    this.hrmCodeService
        .getHrmTypeDetailCodeList(params)
        .subscribe(
          (model: ResponseList<HrmCode>) => {
            if ( model.total > 0 ) {
              this.dutyCodeList = model.data;
            } else {
              this.dutyCodeList = [];
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  getDutyDateList(fromDate: string, toDate: string) {
    this.service
        .getDutyDateList(fromDate, toDate)
        .subscribe(
          (model: ResponseList<DutyDate>) => {
            console.log(model.data);
            this.fg.get('selectedDate')?.setValue(model.data);
            //this.dutyCodeList = model.data;
          }
        )
  }

}
