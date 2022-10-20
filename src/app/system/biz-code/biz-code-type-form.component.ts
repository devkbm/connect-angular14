import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { FormBase, FormType } from '../../core/form/form-base';

import { ResponseObject } from '../../core/model/response-object';
import { ResponseList } from '../../core/model/response-list';

import { BizCodeType } from './biz-code-type.model';
import { BizCodeTypeService } from './biz-code-type.service';
import { SelectControlModel } from 'src/app/core/model/select-control.model.ts';

@Component({
  selector: 'app-biz-code-type-form',
  templateUrl: './biz-code-type-form.component.html',
  styleUrls: ['./biz-code-type-form.component.css']
})
export class BizCodeTypeFormComponent extends FormBase implements OnInit, AfterViewInit {

  bizTypeList: SelectControlModel[] = [];

  constructor(private fb: FormBuilder,
              private service: BizCodeTypeService,
              private appAlarmService: AppAlarmService) { 
    super();

    this.fg = this.fb.group({
      typeId    : new FormControl<string | null>(null, { validators: [Validators.required] }),
      typeName  : new FormControl<string | null>(null, { validators: [Validators.required] }),      
      sequence  : new FormControl<number | null>(null),
      bizType   : new FormControl<string | null>(null, { validators: [Validators.required] }),
      comment   : new FormControl<string | null>(null)
    });
  }
  
  ngOnInit(): void {
    this.getSystemList();
  }  

  ngAfterViewInit(): void {
    if (this.initLoadId) {
      this.loadForm(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  newForm(): void {
    this.formType = FormType.NEW;    
  }

  modifyForm(formData: BizCodeType): void {
    this.formType = FormType.MODIFY;
    this.fg.get('typeId')?.disable();
    
    this.fg.patchValue(formData);
  }

  loadForm(id: string): void {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<BizCodeType>) => {
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
    if (this.fg.invalid) {
      for (const i in this.fg.controls) {
        this.fg.controls[i].markAsDirty();
        this.fg.controls[i].updateValueAndValidity({onlySelf: true});
      }
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<BizCodeType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  deleteForm(id: string): void {
    this.service
        .delete(id)
        .subscribe(
          (model: ResponseObject<BizCodeType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  getSystemList(): void {
    this.service
        .getSystemList()
        .subscribe(
          (model: ResponseList<SelectControlModel>) => {
            if (model.total > 0) {
              this.bizTypeList = model.data;
            } else {
              this.bizTypeList = [];
            }            
          }
        );
  }
}
