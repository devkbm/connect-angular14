import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
export class HolidayFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb: FormBuilder,
              private holidayService: HolidayService,
              private appAlarmService: AppAlarmService,
              private datePipe: DatePipe) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      date          : [ null ],
      holidayName   : [ null ],
      comment       : [ null ]
    });

    this.newForm(new Date());

    this.defaultControlSize.xs = 23;
    this.defaultLabelSize.xs = 1;
  }

  newForm(date: Date): void {
    this.formType = FormType.NEW;
    this.fg.reset();
    this.fg.get('date')?.setValue(date);
  }

  modifyForm(formData: Holiday): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  getEntity(date: Date): void {
    const id = this.datePipe.transform(date, 'yyyyMMdd') as string;

    this.holidayService
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

  submitEntity(): void {
    if (this.validForm(this.fg) === false)
      return;

    this.holidayService
        .saveHoliday(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteEntity(date: Date): void {
    const id = this.datePipe.transform(date, 'yyyyMMdd') as string;
    if (id === null) return;

    this.holidayService
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
