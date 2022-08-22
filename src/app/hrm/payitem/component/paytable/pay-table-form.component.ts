import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { PayTable } from '../../model/pay-table';
import { PayTableService } from '../../service/pay-table.service';

@Component({
  selector: 'app-pay-table-form',
  templateUrl: './pay-table-form.component.html',
  styleUrls: ['./pay-table-form.component.css']
})
export class PayTableFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb: FormBuilder,
              private appAlarmService: AppAlarmService,
              private payTableService: PayTableService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      id        : [ null, [ Validators.required ] ],
      name      : [ null, [ Validators.required ] ],
      enabled   : [ null],
      typeCode1 : [ null],
      typeCode2 : [ null],
      typeCode3 : [ null],
      comment   : [ null]
    });

    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('id')?.disable();
  }

  public modifyForm(formData: PayTable) {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.get('id')?.disable();
  }

  public getForm(id: string): void {
    this.payTableService
        .getPayTable(id)
        .subscribe(
          (model: ResponseObject<PayTable>) => {
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
    this.payTableService
        .savePayTable(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<PayTable>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteForm(id: string): void {
    this.payTableService
        .deletePayTable(id)
        .subscribe(
            (model: ResponseObject<PayTable>) => {
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
