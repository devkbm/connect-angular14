import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { FormBase, FormType } from '../../core/form/form-base';

import { ResponseObject } from '../../core/model/response-object';
import { ResponseList } from '../../core/model/response-list';

import { BizCodeService } from './biz-code.service';
import { BizCode } from './biz-code.model';

@Component({
  selector: 'app-biz-code-form',
  templateUrl: './biz-code-form.component.html',
  styleUrls: ['./biz-code-form.component.css']
})
export class BizCodeFormComponent extends FormBase implements OnInit, AfterViewInit {

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
    if (this.initLoadId.typeId && this.initLoadId.code) {
      this.loadForm(this.initLoadId.typeId, this.initLoadId.code);
    } else {
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

  loadForm(typeId: string, code: string): void {
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

  saveForm(): void {
    if (this.fg.invalid) return;

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<BizCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        )
  }

  deleteForm(typeCode: string, detailCode: string): void {
    this.service
        .delete(typeCode, detailCode)
        .subscribe(
          (model: ResponseObject<BizCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
