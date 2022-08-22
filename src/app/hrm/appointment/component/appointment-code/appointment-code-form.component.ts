import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppointmentCode } from '../../model/appointment-code';

@Component({
  selector: 'app-appointment-code-form',
  templateUrl: './appointment-code-form.component.html',
  styleUrls: ['./appointment-code-form.component.css']
})
export class AppointmentCodeFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb: FormBuilder,
              private appointmentCodeService: AppointmentCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      code      : [ null, [ Validators.required ] ],
      codeName  : [ null, [ Validators.required ] ],
      sequence  : [ null],
      useYn     : [ null],
      endDateYn : [ null],
      comment   : [ null]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('code')?.enable();
    this.fg.get('useYn')?.setValue(true);
  }

  public modifyForm(formData: AppointmentCode): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

    this.fg.get('code')?.disable();
  }

  public getForm(id: string): void {
    this.appointmentCodeService
        .getAppointmentCode(id)
        .subscribe(
          (model: ResponseObject<AppointmentCode>) => {
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
    this.appointmentCodeService
        .saveAppointmentCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<AppointmentCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteForm(): void {
    this.appointmentCodeService
        .deleteAppointmentCode(this.fg.get('code')?.value)
        .subscribe(
            (model: ResponseObject<AppointmentCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
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

}
