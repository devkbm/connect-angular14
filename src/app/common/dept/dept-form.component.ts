import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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



@Component({
  selector: 'app-dept-form',
  templateUrl: './dept-form.component.html',
  styleUrls: ['./dept-form.component.css']
})
export class DeptFormComponent extends FormBase implements OnInit {

   ;
  deptHierarchy: DeptHierarchy[] = [];

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formLabelSm = 4;

  formControlXs = 24;
  formControlSm = 20;

  constructor(private fb: FormBuilder,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      parentDeptId            : [ null ],
      deptCode                : new FormControl(null, {
                                  validators: Validators.required,
                                  asyncValidators: [existingDeptValidator(this.deptService)],
                                  updateOn: 'blur'
                                }),
      deptNameKorean          : [ null, [ Validators.required ] ],
      deptAbbreviationKorean  : [ null ],
      deptNameEnglish         : [ null, [ Validators.required ] ],
      deptAbbreviationEnglish : [ null ],
      fromDate                : [ null, [ Validators.required ] ],
      toDate                  : [ null, [ Validators.required ] ],
      seq                     : [ 1,    [ Validators.required ] ],
      comment                 : [ null ]
    });

    this.getDeptHierarchy();
    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('deptCode')?.enable();
  }

  modifyForm(formData: Dept): void {
    this.formType = FormType.MODIFY;

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
    if (this.validForm(this.fg) === false)
      return;

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
        .deleteDept(this.fg.get('deptCode')?.value)
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
