import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { PayItemService } from '../../service/pay-item.service';
import { PayItem } from '../../model/pay-item';

@Component({
  selector: 'app-pay-item-form',
  templateUrl: './pay-item-form.component.html',
  styleUrls: ['./pay-item-form.component.css']
})
export class PayItemFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb: FormBuilder,
              private appAlarmService: AppAlarmService,
              private payitemService: PayItemService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      code      : [ null, [ Validators.required ] ],
      codeName  : [ null, [ Validators.required ] ],
      type      : [ null],
      seq       : [ null],
      comment   : [ null],
      usePayTable   : [ null]
    });

    this.newForm();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('code')?.enable();

  }

  public modifyForm(formData: PayItem) {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.get('code')?.disable();
  }

  public getForm(id: string): void {
    this.payitemService
        .getPayItem(id)
        .subscribe(
          (model: ResponseObject<PayItem>) => {
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
    this.payitemService
        .savePayItem(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<PayItem>) => {
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
    this.payitemService
        .deletePayItem(id)
        .subscribe(
            (model: ResponseObject<PayItem>) => {
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
