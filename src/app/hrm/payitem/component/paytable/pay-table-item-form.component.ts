import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { PayTableItem } from '../../model/pay-table-item';
import { PayTableService } from '../../service/pay-table.service';

@Component({
  selector: 'app-pay-table-item-form',
  templateUrl: './pay-table-item-form.component.html',
  styleUrls: ['./pay-table-item-form.component.css']
})
export class PayTableItemFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb: FormBuilder,
              private appAlarmService: AppAlarmService,
              private payTableService: PayTableService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      payTableId: [ null, [ Validators.required ] ],
      id        : [ null, [ Validators.required ] ],
      code1     : [ null],
      code2     : [ null],
      code3     : [ null],
      ammount   : [ null],
      comment   : [ null]
    });

    this.newForm('');
  }

  newForm(payTableId: string): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('payTableId')?.setValue(payTableId);
    this.fg.get('payTableId')?.disable();
    this.fg.get('id')?.disable();
  }

  public modifyForm(formData: PayTableItem) {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.get('payTableId')?.disable();
    this.fg.get('id')?.disable();
  }

  public getForm(payTableId: string, id: string): void {
    this.payTableService
        .getPayTableItem(payTableId, id)
        .subscribe(
          (model: ResponseObject<PayTableItem>) => {
            if ( model.total > 0 ) {
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
    this.payTableService
        .savePayTableItem(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<PayTableItem>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteForm(payTableId: string, id: string): void {
    this.payTableService
        .deletePayTableItem(payTableId, id)
        .subscribe(
            (model: ResponseObject<PayTableItem>) => {
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
