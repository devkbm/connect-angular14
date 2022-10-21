import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { StaffService } from './staff.service';
import { Staff } from './staff.model';
import { GlobalProperty } from 'src/app/core/global-property';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { saveAs } from 'file-saver';
import { NewStaff } from './new-staff-form/new-staff.model';

@Component({
  selector: 'app-staff-regist-form',
  templateUrl: './staff-regist-form.component.html',
  styleUrls: ['./staff-regist-form.component.css']
})
export class StaffRegistFormComponent extends FormBase implements OnInit {
   
  @Input() staffId?: string;

  imageUrl: any;
  imageUploadParam: any;  

  newAppointment: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null    
  }

  staffAppointment?: {staffId: any, staffNo: any, staffName: any} ={
    staffId: null,
    staffNo: null,
    staffName: null
  }

  constructor(private fb: FormBuilder,
              private staffServie: StaffService,
              private appAlarmService: AppAlarmService) { 
    super(); 
  
    this.fg = this.fb.group({
      staffId                     : [ null, [ Validators.required ] ],
      staffNo                     : [ null, [ Validators.required ] ],
      name                        : [ null, [ Validators.required ] ],
      nameEng                     : [ null ],
      nameChi                     : [ null ],
      residentRegistrationNumber  : [ null ],
      gender                      : [ null ],
      birthday                    : [ null ],
      workCondition               : [ null ],      
      imagePath                   : [ null ]
    });

  }

  ngOnInit(): void {    
    this.newForm();
  }

  newForm(): void {    
    this.formType = FormType.NEW;    
  }

  modifyForm(formData: Staff): void {    
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

    this.imageUrl = GlobalProperty.serverUrl + '/static/' + this.fg.get('imagePath')?.value;
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string): void {        
    this.staffServie
        .get(staffId)
        .subscribe(
          (model: ResponseObject<Staff>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);

              this.imageUploadParam = {employeeId: model.data.staffId};

              this.staffAppointment = {
                staffId: model.data.staffId,
                staffNo: model.data.staffNo,
                staffName: model.data.name
              }
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  save(): void {
    this.staffServie
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Staff>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }  

  remove(id: any): void {
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

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        //this.loading = true;
        break;
      case 'done':
        console.log('image upload done');
        this.get(this.fg.get('id')?.value);
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

  downloadImage(params: any): void {

    this.staffServie
        .downloadEmployeeImage(this.fg.get('id')?.value)
        .subscribe(
          (model: Blob) => {
            //this.appAlarmService.changeMessage(model.message);
            const blob = new Blob([model], { type: 'application/octet-stream' });
            saveAs(blob, this.fg.get('id')?.value+".jpg");

          }
        );
  }

}
