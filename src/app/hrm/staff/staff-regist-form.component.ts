import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { StaffService } from './staff.service';
import { Staff } from './staff.model';
import { GlobalProperty } from 'src/app/global-property';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { saveAs } from 'file-saver';
import { NewStaff } from './new-staff.request';

@Component({
  selector: 'app-staff-regist-form',
  templateUrl: './staff-regist-form.component.html',
  styleUrls: ['./staff-regist-form.component.css']
})
export class StaffRegistFormComponent extends FormBase implements OnInit {

   ;
  formModel?: Staff;
  imageUrl: any;
  imageUploadParam: any;

  constructor(private fb: FormBuilder,
              private staffServie: StaffService,
              private appAlarmService: AppAlarmService) { super(); }


  ngOnInit(): void {
    this.fg = this.fb.group({
      staffId                     : [ null, [ Validators.required ] ],
      name                        : [ null, [ Validators.required ] ],
      nameEng                     : [ null ],
      nameChi                     : [ null ],
      residentRegistrationNumber  : [ null ],
      gender                      : [ null ],
      birthday                    : [ null ],
      workCondition               : [ null ],
      imagePath                   : [ null ]
    });

    this.newForm();
  }

  newForm(): void {
    this.formModel;
    this.formType = FormType.NEW;
  }

  public modifyForm(formData: Staff): void {
    this.formModel = formData;
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

    this.imageUrl = GlobalProperty.serverUrl + '/static/' + this.fg.get('imagePath')?.value;
  }

  public getForm(staffId: string): void {
    //const empId = this.fg.get('id').value;

    this.staffServie
        .getEmployee(staffId)
        .subscribe(
          (model: ResponseObject<Staff>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);

              this.imageUploadParam = {employeeId: model.data.staffId};
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
    this.staffServie
        .saveEmployee(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<NewStaff>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public newEmployee(): void {
    const staffId =this.fg.get('staffId')?.value;
    const name =this.fg.get('name')?.value;
    const residentRegistrationNumber = this.fg.get('residentRegistrationNumber')?.value;
    const obj = new NewStaff(staffId, name, '', '', residentRegistrationNumber);

    this.staffServie
        .createEmployee(obj)
        .subscribe(
          (model: ResponseObject<NewStaff>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteForm(id: any): void {
    /*this.appointmentCodeService
        .deleteAppointmentCodeDetail(this.fg.get('code').value)
        .subscribe(
            (model: ResponseObject<AppointmentCodeDetail>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );*/
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        //this.loading = true;
        break;
      case 'done':
        console.log('image upload done');
        this.getForm(this.fg.get('id')?.value);
        // Get this url from response in real world.
        /*
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });*/

        break;
      case 'error':
        //this.msg.error('Network error');
        //this.loading = false;
        break;
    }
  }

  public downloadImage(params: any): void {

    this.staffServie
        .downloadEmployeeImage(this.fg.get('id')?.value)
        .subscribe(
          (model: Blob) => {
            //this.appAlarmService.changeMessage(model.message);
            const blob = new Blob([model], { type: 'application/octet-stream' });
            saveAs(blob, this.fg.get('id')?.value+".jpg");

          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

}
