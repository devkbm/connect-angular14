import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { StaffService } from '../staff.service';
import { NewStaff } from './new-staff.model';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-new-staff-form',
  templateUrl: './new-staff-form.component.html',
  styleUrls: ['./new-staff-form.component.css']
})
export class NewStaffFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {
  
  //@ViewChild('domainName') domainName?: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private service: StaffService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      staffNo                     : new FormControl<string | null>(null, { validators: Validators.required }),
      name                        : new FormControl<string | null>(null, { validators: Validators.required }),
      residentRegistrationNumber  : new FormControl<string | null>(null, { validators: Validators.required }),
      nameEng                     : new FormControl<string | null>(null),
      nameChi                     : new FormControl<string | null>(null)
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {    

    /*
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
    */
  }

  ngAfterViewInit(): void {    
    this.focus();
  }  

  focus() {
    //this.domainName?.focus();
  }

  newForm(id: String) {
    this.formType = FormType.NEW;
    
    this.fg.get('staffId')?.setValue(id);  
  }

  /*
  modifyForm(formData: DataDomain) {
    this.formType = FormType.MODIFY;
    
    this.fg.get('database')?.disable();
    this.fg.get('domainName')?.disable();
    
    this.fg.patchValue(formData);
  }
  */  

  submit() {
    this.service
        .newStaff(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<NewStaff>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }
  
  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}