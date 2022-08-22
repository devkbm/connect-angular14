import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { HrmCodeService } from '../../service/hrm-code.service';
import { HrmType } from '../../model/hrm-type';
import { AppointmentCodeService } from '../../service/appointment-code.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { existingHrmTypeValidator } from '../../validator/hrm-type-duplication-validator';


@Component({
  selector: 'app-hrm-type-form',
  templateUrl: './hrm-type-form.component.html',
  styleUrls: ['./hrm-type-form.component.css']
})
export class HrmTypeFormComponent extends FormBase implements OnInit {

  appointmentTypeList: any[] = [];
   ;

  constructor(private fb: FormBuilder,
              private hrmCodeService: HrmCodeService,
              private appointmentCodeService: AppointmentCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.getTypeList();

    this.fg = this.fb.group({
      code      : new FormControl(null, {
                    validators: Validators.required,
                    asyncValidators: [existingHrmTypeValidator(this.hrmCodeService)],
                    updateOn: 'blur'
                  }),
      codeName  : [ null, [ Validators.required ] ],
      useYn     : [ null ],
      sequence  : [ null ],
      appointmentType   : [ null ],
      comment   : [ null ]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('useYn')?.setValue(true);
    this.fg.get('code')?.enable();
  }

  public modifyForm(formData: HrmType): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.controls['code'].disable();
  }

  public select(param: any) {
    this.getHrmType(param.value['code']);
  }

  public getTypeList(): void {
    this.appointmentCodeService
        .getTypeList()
        .subscribe(
          (model: ResponseList<any>) => {
            if ( model.total > 0 ) {
              this.appointmentTypeList = model.data;
            }
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public getHrmType(code: string): void {
    this.hrmCodeService
        .getHrmType(code)
        .subscribe(
          (model: ResponseObject<HrmType>) => {
            if ( model.total > 0 ) {
              console.log(model.data);
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
    this.hrmCodeService
        .saveHrmType(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<HrmType>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteHrmType(): void {
    const id = this.fg.get('code')?.value;

    this.hrmCodeService
        .deleteHrmType(id)
        .subscribe(
            (model: ResponseObject<HrmType>) => {
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

