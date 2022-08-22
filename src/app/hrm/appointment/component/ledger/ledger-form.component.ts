import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { LedgerService } from '../../service/ledger.service';
import { Ledger } from '../../model/ledger';

@Component({
  selector: 'app-ledger-form',
  templateUrl: './ledger-form.component.html',
  styleUrls: ['./ledger-form.component.css']
})
export class LedgerFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb:FormBuilder,
              private legderService: LedgerService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      ledgerId          : [ null, [ Validators.required ] ],
      appointmentType   : [ null, [ Validators.required ] ],
      registrationDate  : [ null ],
      comment           : [ null ]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('ledgerId')?.enable();
    this.fg.get('registrationDate')?.setValue(new Date());
    this.fg.get('registrationDate')?.disable();
  }

  public modifyForm(formData: Ledger): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
    this.fg.get('ledgerId')?.disable();
    this.fg.get('registrationDate')?.disable();
  }

  public getForm(ledgerId: string): void {
    this.legderService
        .getLedger(ledgerId)
        .subscribe(
          (model: ResponseObject<Ledger>) => {
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
    this.legderService
        .saveLedger(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Ledger>) => {
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
    this.legderService
        .deleteLedger(this.fg.get('ledgerId')?.value)
        .subscribe(
            (model: ResponseObject<Ledger>) => {
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
