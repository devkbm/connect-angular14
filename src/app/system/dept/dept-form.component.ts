import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { DeptService } from './dept.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { existingDeptValidator } from './dept-duplication-validator.directive';


import { ResponseObject } from '../../core/model/response-object';
import { FormBase, FormType } from '../../core/form/form-base';
import { Dept } from './dept.model';
import { DeptHierarchy } from './dept-hierarchy.model';
import { ResponseList } from '../../core/model/response-list';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

import * as dateFns from "date-fns";

@Component({
  selector: 'app-dept-form',
  templateUrl: './dept-form.component.html',
  styleUrls: ['./dept-form.component.css']
})
export class DeptFormComponent extends FormBase implements OnInit, AfterViewInit {

  @ViewChild('deptCode', {static: true}) deptCode!: NzInputTextComponent;

  deptHierarchy: DeptHierarchy[] = [];

  constructor(private fb: FormBuilder,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      parentDeptId            : new FormControl<string | null>(null),
      deptId                  : new FormControl<string | null>(null, {
                                  validators: Validators.required,
                                  asyncValidators: [existingDeptValidator(this.deptService)],
                                  updateOn: 'blur'
                                }),
      deptCode                : new FormControl<string | null>(null),
      deptNameKorean          : new FormControl<string | null>(null, { validators: [Validators.required] }),
      deptAbbreviationKorean  : new FormControl<string | null>(null),
      deptNameEnglish         : new FormControl<string | null>(null, { validators: [Validators.required] }),
      deptAbbreviationEnglish : new FormControl<string | null>(null),
      fromDate                : new FormControl<Date | null>(null, { validators: [Validators.required] }),
      toDate                  : new FormControl<Date | null>(null, { validators: [Validators.required] }),
      seq                     : new FormControl<number | null>(1, { validators: [Validators.required] }),
      comment                 : new FormControl<string | null>(null)
    });

  }

  ngOnInit(): void {
    this.getDeptHierarchy();
    this.newForm();
  }

  ngAfterViewInit(): void {
    this.deptCode.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('deptId')?.setAsyncValidators(existingDeptValidator(this.deptService));
    this.fg.get('deptCode')?.enable();
    this.fg.get('deptCode')?.valueChanges.subscribe(value => {
      if (value === null) return;
      const organizationCode = sessionStorage.getItem('organizationCode');
      this.fg.get('deptId')?.setValue(organizationCode + value);
      //this.fg.get('deptId')?.markAsTouched();
    });

    //dateFns.formatISO9075(new Date()),
    //new Intl.DateTimeFormat('ko-KR', ).format(new Date())
    this.fg.patchValue({
      fromDate: new Date(),
      toDate: new Date(9999,11,31,0,0,0,0),
      seq: 1
    });

    this.deptCode.focus();

  }

  modifyForm(formData: Dept): void {
    this.formType = FormType.MODIFY;

    this.fg.get('deptId')?.setAsyncValidators(null);
    this.fg.get('deptCode')?.disable();

    this.fg.patchValue(formData);
  }

  getDept(id: string): void {
    this.deptService
        .getDept(id)
        .subscribe(
            (model: ResponseObject<Dept>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm();
              }
              this.appAlarmService.changeMessage(model.message);
            }
        );
  }

  getDeptHierarchy(): void {
    this.deptService
        .getDeptHierarchyList()
        .subscribe(
          (model: ResponseList<DeptHierarchy>) => {
            if ( model.total > 0 ) {
              this.deptHierarchy = model.data;
            } else {
              this.deptHierarchy = [];
            }
          }
        );
  }

  submitDept(): void {

    this.deptService
        .saveDept(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Dept>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteDept(): void {
    this.deptService
        .deleteDept(this.fg.get('deptId')?.value)
        .subscribe(
            (model: ResponseObject<Dept>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
