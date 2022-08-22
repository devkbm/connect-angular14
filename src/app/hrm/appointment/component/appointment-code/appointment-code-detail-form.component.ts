import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppointmentCodeDetail } from '../../model/appointment-code-detail';
import { ResponseList } from 'src/app/core/model/response-list';

@Component({
  selector: 'app-appointment-code-detail-form',
  templateUrl: './appointment-code-detail-form.component.html',
  styleUrls: ['./appointment-code-detail-form.component.css']
})
export class AppointmentCodeDetailFormComponent  extends FormBase implements OnInit {

   ;

  changeTypeList: any[] = [];

  changeCodeList: any[] = [];

  constructor(private fb:FormBuilder,
              private appointmentCodeService: AppointmentCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.getTypeList();

    this.fg = this.fb.group({
      detailId          : [ null],
      code              : [ null, [ Validators.required ] ],
      changeType        : [ null, [ Validators.required ] ],
      changeTypeDetail  : [ null],
      sequence          : [ null]
    });

    this.newForm('');
  }

  public newForm(appointmentCode: string): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('code')?.setValue(appointmentCode);
    this.fg.get('code')?.disable();
  }

  public modifyForm(formData: AppointmentCodeDetail): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  public getTypeList(): void {
    this.appointmentCodeService
        .getTypeList()
        .subscribe(
          (model: ResponseList<any>) => {
            if ( model.total > 0 ) {
              this.changeTypeList = model.data;
            }
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public getTypeCodeList(type: string): void {
    this.appointmentCodeService
        .getTypeCodeList(type)
        .subscribe(
          (model: ResponseList<any>) => {
            if ( model.total > 0 ) {
              this.changeCodeList = model.data;
            } else {
              this.changeCodeList = [];
            }
            //this.fg.get('changeTypeDetail').setValue(null);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public getForm(appointmentCode: string, changeType: string, changeTypeDetail: string): void {
    //const appointmentCode = this.fg.get('code').value;
    //const detailId = this.fg.get('code').value + this.fg.get('changeType').value + this.fg.get('changeTypeDetail').value;
    const detailId = appointmentCode + changeType + changeTypeDetail;

    this.appointmentCodeService
        .getAppointmentCodeDetail(appointmentCode, detailId)
        .subscribe(
          (model: ResponseObject<AppointmentCodeDetail>) => {
            if ( model.total > 0 ) {
              console.log(model.data);
              this.modifyForm(model.data);
            } else {
              this.newForm('');
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
        .saveAppointmentCodeDetail(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<AppointmentCodeDetail>) => {
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
        .deleteAppointmentCodeDetail(this.fg.get('code')?.value, this.fg.get('detailId')?.value)
        .subscribe(
            (model: ResponseObject<AppointmentCodeDetail>) => {
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

  public onSelectionChanged(p: any) {
    console.log(p);
    this.getTypeCodeList(p);
  }

}
