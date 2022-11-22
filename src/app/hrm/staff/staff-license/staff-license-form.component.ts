import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { ResponseObject } from 'src/app/core/model/response-object';

import { StaffLicenseService } from './staff-license.service';
import { StaffLicense } from './staff-license.model';

@Component({
  selector: 'app-staff-license-form',
  templateUrl: './staff-license-form.component.html',
  styleUrls: ['./staff-license-form.component.css']
})
export class StaffLicenseFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @Input() staff?: {staffId: string, staffNo: string, staffName: string};

  constructor(private fb: FormBuilder,
              private service: StaffLicenseService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      staffId                 : new FormControl<string | null>(null, { validators: Validators.required }),
      staffNo                 : new FormControl<string | null>(null, { validators: Validators.required }),
      staffName               : new FormControl<string | null>(null, { validators: Validators.required }),
      seq                     : new FormControl<string | null>(null),
      licenseType             : new FormControl<string | null>(null, { validators: Validators.required }),
      licenseNumber           : new FormControl<string | null>(null, { validators: Validators.required }),
      dateOfAcquisition       : new FormControl<Date | null>(null),
      certificationAuthority  : new FormControl<string | null>(null),
      comment                 : new FormControl<string | null>(null)
    });
  }

  ngOnInit() {
    if (this.initLoadId) {
      this.get(this.initLoadId.staffId, this.initLoadId.seq);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  newForm() {
    this.formType = FormType.NEW;

    if (this.staff) {
      this.fg.get('staffId')?.setValue(this.staff?.staffId);
      this.fg.get('staffNo')?.setValue(this.staff?.staffNo);
      this.fg.get('staffName')?.setValue(this.staff?.staffName);
    }
  }


  modifyForm(formData: StaffLicense) {
    this.formType = FormType.MODIFY;

    if (this.staff) {
      this.fg.get('staffId')?.setValue(this.staff?.staffId);
      this.fg.get('staffNo')?.setValue(this.staff?.staffNo);
      this.fg.get('staffName')?.setValue(this.staff?.staffName);
    }

    //this.fg.get('database')?.disable();
    //this.fg.get('domainName')?.disable();

    this.fg.patchValue(formData);
  }


  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(staffId: string, seq: string): void {
    this.service
        .get(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffLicense>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save() {
    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<StaffLicense>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  remove(staffId: string, seq: string): void {
    this.service
        .delete(staffId, seq)
        .subscribe(
          (model: ResponseObject<StaffLicense>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

}
