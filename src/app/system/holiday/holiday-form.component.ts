import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormBase, FormType } from '../../core/form/form-base';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { HolidayService } from './holiday.service';
import { ResponseObject } from '../../core/model/response-object';
import { Holiday } from './holiday.model';


@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.css']
})
export class HolidayFormComponent extends FormBase implements OnInit, AfterViewInit {   

  constructor(private fb: FormBuilder,
              private service: HolidayService,
              private appAlarmService: AppAlarmService,
              private datePipe: DatePipe) { 
    super(); 
    
    this.fg = this.fb.group({
      date          : new FormControl<Date | null>(null, { validators: Validators.required }),
      holidayName   : new FormControl<string | null>(null, { validators: Validators.required }),
      comment       : new FormControl<string | null>(null)
    });
  }
  
  ngOnInit(): void {    
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm(new Date());
    }    
  }

  ngAfterViewInit(): void {    
  }

  newForm(date: Date): void {
    this.formType = FormType.NEW;
    this.fg.reset();

    const id = this.datePipe.transform(date, 'yyyy-MM-dd') as string;

    this.fg.get('date')?.setValue(id);
  }

  modifyForm(formData: Holiday): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  get(date: Date): void {
    const id = this.datePipe.transform(date, 'yyyyMMdd') as string;

    this.service
        .getHoliday(id)
        .subscribe(
            (model: ResponseObject<Holiday>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm(date);
              }
              this.appAlarmService.changeMessage(model.message);
            }
        );
  }

  submit(): void {
    if (this.fg.valid === false) return;

    this.service
        .saveHoliday(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  delete(date: Date): void {
    const id = this.datePipe.transform(date, 'yyyyMMdd') as string;
    if (id === null) return;

    this.service
        .deleteHoliday(id)
        .subscribe(
          (model: ResponseObject<Holiday>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
