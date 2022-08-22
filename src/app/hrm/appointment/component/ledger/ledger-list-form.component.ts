import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { LedgerService } from '../../service/ledger.service';
import { LedgerChangeInfo } from '../../model/ledger-change-info';
import { LedgerList } from '../../model/ledger-list';
import { AppointmentCodeService } from '../../service/appointment-code.service';
import { AppointmentCode } from '../../model/appointment-code';
import { LedgerEmployee } from '../../model/ledger-employee';
import { HrmCodeService } from '../../service/hrm-code.service';
import { HrmTypeDetailCode } from '../../model/hrm-type-detail-code';
import { DeptService } from 'src/app/common/dept/dept.service';
import { Dept } from 'src/app/common/dept/dept.model';

@Component({
  selector: 'app-ledger-list-form',
  templateUrl: './ledger-list-form.component.html',
  styleUrls: ['./ledger-list-form.component.css']
})
export class LedgerListFormComponent extends FormBase implements OnInit {

   ;

  appointmentCodeList: any;
  employeeList: LedgerEmployee[] = [];
  comboList: any[] = new Array();
  isOpened: boolean = false;

  constructor(private fb: FormBuilder,
              private ledgerService: LedgerService,
              private appointmentCodeService: AppointmentCodeService,
              private hrmCodeService: HrmCodeService,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.getAppointmentCodeList();
    this.getEmployeeList();

    this.fg = this.fb.group({
      listId              : [ null, [ Validators.required ] ],
      sequence            : [ null, [ Validators.required ] ],
      empId               : [ null ],
      appointmentCode     : [ null ],
      appointmentFromDate : [ null ],
      appointmentToDate   : [ null ],
      ledgerId            : [ null, [ Validators.required ] ],
      changeInfoList      :  this.fb.array([])
   });

  }

  get changeInfoList() {
    return this.fg.get('changeInfoList') as FormArray
  }

  public newForm(ledgerId: string): void {
    this.formType = FormType.NEW;
    this.isOpened = false;

    this.clearChangeInfo();
    this.fg.reset();
    this.fg.get('ledgerId')?.setValue(ledgerId);
    this.fg.get('listId')?.disable();

    this.isOpened = true;
  }

  public modifyForm(formData: LedgerList): void {
    this.formType = FormType.MODIFY;

    this.fg.get('ledgerId')?.disable();
    this.fg.get('listId')?.disable();
    this.fg.patchValue(formData);

    for (const details of formData.changeInfoList) {
      this.addChangeInfo(details);
    }
  }

  public addChangeInfo(changeInfo: LedgerChangeInfo): void {
    if (changeInfo.changeType == 'JOB') {
      this.getHrmTypeDetail(changeInfo.changeType+changeInfo.changeTypeDetail);
    } else if (changeInfo.changeType == 'DEPT') {
      this.getDeptList();
    }

    this.changeInfoList.push(this.fb.group({
      id: new FormControl({value: changeInfo.id, disabled: false}),
      changeType: new FormControl({value: changeInfo.changeType, disabled: true}),
      changeTypeDetail: new FormControl({value: changeInfo.changeTypeDetail, disabled: true}),
      changeCode: new FormControl({value: changeInfo.changeCode, disabled: false}),
      sequence: new FormControl({value: changeInfo.sequence, disabled: false})
    }));
  }

  public getHrmTypeDetail(typeId: string): void {
    this.hrmCodeService
        .getHrmTypeDetailCodeList({typeId: typeId})
        .subscribe(
          (model: ResponseList<HrmTypeDetailCode>) => {
            this.comboList.push(model.data);

          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public getDeptList(): void {
    this.deptService
        .getDeptList()
        .subscribe(
          (model: ResponseList<Dept>) => {
            this.comboList.push(model.data);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public clearChangeInfo(): void {
    const arr = <FormArray>this.fg.controls['changeInfoList'];
    arr.controls = [];
  }

  public getForm(listId: string): void {
    this.isOpened = false;
    this.clearChangeInfo();

    this.ledgerService
        .getLedgerList(listId)
        .subscribe(
          (model: ResponseObject<LedgerList>) => {

            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm('');
            }
            this.appAlarmService.changeMessage(model.message);
            this.isOpened = true;
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public submitForm(): void {
    this.ledgerService
        .saveLedgerList(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<LedgerList>) => {
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
    this.ledgerService
        .deleteLedgerList(this.fg.get('listId')?.value)
        .subscribe(
            (model: ResponseObject<LedgerList>) => {
              this.appAlarmService.changeMessage(model.message);
              this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public getChangeInfo(appointmentCode: string): void {

    this.ledgerService
        .getChangeInfo(appointmentCode)
        .subscribe(
          (model: ResponseList<LedgerChangeInfo>) => {
              if (model.total > 0) {
                this.clearChangeInfo();
                for (const details of model.data) {
                  this.addChangeInfo(details);
                }
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  public getAppointmentCodeList(): void {
    this.appointmentCodeService
        .getAppointmentCodeList()
        .subscribe(
          (model: ResponseList<AppointmentCode>) => {
              if (model.total > 0) {
                console.log(model.data);
                this.appointmentCodeList = model.data;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  public getEmployeeList(): void {
    this.ledgerService
        .getEmployeeList()
        .subscribe(
          (model: ResponseList<LedgerEmployee>) => {
              if (model.total > 0) {
                console.log(model.data);
                this.employeeList = model.data;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );
  }

  public appointmentCodeChanged(appointmentCode: any): void {
    if (this.isOpened) {
      this.getChangeInfo(appointmentCode);
    }
  }

  public closeForm() {
    this.isOpened = false;
    this.formClosed.emit(this.fg.getRawValue());
  }

}
