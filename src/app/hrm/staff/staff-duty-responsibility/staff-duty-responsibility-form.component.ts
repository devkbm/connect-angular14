import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { BizCode } from 'src/app/system/biz-code/biz-code.model';

import { DeptService } from 'src/app/system/dept/dept.service';
import { HrmTypeDetailCode } from '../../appointment/model/hrm-type-detail-code';
import { HrmCodeService } from '../../appointment/service/hrm-code.service';
import { StaffDutyResponsibility } from './staff-duty-responsibility.model';
import { StaffDutyResponsibilityService } from './staff-duty-responsibility.service';

@Component({
  selector: 'app-staff-duty-responsibility-form',
  templateUrl: './staff-duty-responsibility-form.component.html',
  styleUrls: ['./staff-duty-responsibility-form.component.css']
})
export class StaffDutyResponsibilityFormComponent extends FormBase implements OnInit, AfterViewInit {

  @Input() staff?: {staffId: string, staffNo: string, staffName: string};

  /**
   * 직책코드 - HR0007
   */
   dutyResponsibilityCodeList: HrmTypeDetailCode[] = [];

  constructor(private fb: FormBuilder,
              private service: StaffDutyResponsibilityService,
              private hrmCodeService: HrmCodeService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      staffId                 : new FormControl<string | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      staffNo                 : new FormControl<string | null>(null, { validators: Validators.required }),
      staffName               : new FormControl<string | null>(null),
      seq                     : new FormControl<string | null>({value: null, disabled: true}, { validators: [Validators.required] }),
      dutyResponsibilityCode  : new FormControl<string | null>(null),
      fromDate                : new FormControl<Date | null>(null),
      toDate                  : new FormControl<Date | null>(null),
      isPayApply              : new FormControl<boolean | null>(null)
    });
  }

  ngOnInit(): void {
    this.getHrmTypeDetailCodeList('HR0007', "dutyResponsibilityCodeList");
  }

  ngAfterViewInit(): void {

    if (this.initLoadId && this.initLoadId.staffId && this.initLoadId.seq) {
      this.get(this.initLoadId.staffId, this.initLoadId.seq);
    } else {
      this.newForm();
    }
  }


  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.get('staffId')?.disable();
    this.fg.get('staffNo')?.disable();
    this.fg.get('staffName')?.disable();

    if (this.staff) {
      this.fg.get('staffId')?.setValue(this.staff?.staffId);
      this.fg.get('staffNo')?.setValue(this.staff?.staffNo);
      this.fg.get('staffName')?.setValue(this.staff?.staffName);
    }
  }

  modifyForm(formData: StaffDutyResponsibility): void {
    this.formType = FormType.MODIFY;

    this.fg.get('staffId')?.disable();
    this.fg.get('staffNo')?.disable();
    this.fg.get('staffName')?.disable();
    this.fg.get('seq')?.disable();

    this.fg.patchValue(formData);
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string, seq: string): void {
    this.service
        .get(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffDutyResponsibility>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
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
          (model: ResponseObject<StaffDutyResponsibility>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  remove(typeCode: string, detailCode: string): void {
    /*
    this.service
        .delete(typeCode, detailCode)
        .subscribe(
          (model: ResponseObject<StaffDutyResponsibility>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
    */
  }


  getHrmTypeDetailCodeList(typeId: string, propertyName: string): void {
    const params = {
      typeId : typeId
    };

    this.hrmCodeService
        .getHrmTypeDetailCodeList(params)
        .subscribe(
          (model: ResponseList<HrmTypeDetailCode>) => {
            if ( model.total > 0 ) {
              this.dutyResponsibilityCodeList = model.data;
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );

  }
}