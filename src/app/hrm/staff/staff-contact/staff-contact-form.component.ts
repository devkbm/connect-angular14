import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseObject } from 'src/app/core/model/response-object';
import { StaffContactService } from './staff-contact.service';
import { StaffContact } from './staff-contact.model';

@Component({
  selector: 'app-staff-contact-form',
  template: `
    {{fg.getRawValue() | json}}
    {{fg.valid}}
    <form nz-form [formGroup]="fg" nzLayout="vertical">
      <!-- 폼 오류 메시지 템플릿 -->
      <ng-template #errorTpl let-control>
        <ng-container *ngIf="control.hasError('required')">
          필수 입력 값입니다.
        </ng-container>
        <ng-container *ngIf="control.hasError('exists')">
          기존 코드가 존재합니다.
        </ng-container>
      </ng-template>

      <!-- 1 Row -->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="8">
          <app-nz-input-text #staffId
            [parentFormGroup]="fg" formControlName="staffId" itemId="duty_staffId"
            placeholder="직원ID를 입력해주세요."
            [required]="true" [nzErrorTip]="errorTpl">직원ID
          </app-nz-input-text>
        </div>

        <div nz-col nzSpan="8">
          <app-nz-input-text
            [parentFormGroup]="fg" formControlName="name" itemId="name"
            placeholder="직원명을 입력해주세요."
            [required]="true" [nzErrorTip]="errorTpl">직원명
          </app-nz-input-text>
        </div>

        <div nz-col nzSpan="8">
          <app-nz-input-text
            [parentFormGroup]="fg" formControlName="staffName" itemId="duty_staffName"
            placeholder="직원명을 입력해주세요."
            [required]="true" [nzErrorTip]="errorTpl">직원명
          </app-nz-input-text>
        </div>
      </div>

      <!-- 2 Row -->
      <div nz-row nzGutter="8">
        <div nz-col nzSpan="8">
        </div>
      </div>
    </form>

    <div class="footer">
      <app-nz-crud-button-group
        [isSavePopupConfirm]="false"
        [deleteVisible]="false"
        (closeClick)="closeForm()"
        (saveClick)="save()">
      </app-nz-crud-button-group>
    </div>
  `,
  styles: [`
    .footer {
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      padding: 10px 16px;
      border-top: 1px solid rgb(232, 232, 232);
      text-align: right;
      /*background-color: black;*/
    }
  `]
})
export class StaffContactFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  //@ViewChild('domainName') domainName?: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private service: StaffContactService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      staffId           : new FormControl<string | null>(null, { validators: Validators.required }),
      staffNo           : new FormControl<string | null>(null, { validators: Validators.required }),
      staffName         : new FormControl<string | null>(null, { validators: Validators.required }),
      homeAddressType   : new FormControl<string | null>(null, { validators: Validators.required }),
      homePostNumber    : new FormControl<string | null>(null, { validators: Validators.required }),
      homeMainAddress   : new FormControl<string | null>(null),
      homeSubAddress    : new FormControl<string | null>(null),
      extensionNumber   : new FormControl<string | null>(null),
      mobileNumber      : new FormControl<string | null>(null)
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    /*
    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
    */
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  focus() {
    //this.domainName?.focus();
  }

  newForm(id: String) {
    this.formType = FormType.NEW;

    this.fg.get('staffId')?.setValue(id);
  }

  /*
  modifyForm(formData: DataDomain) {
    this.formType = FormType.MODIFY;

    this.fg.get('database')?.disable();
    this.fg.get('domainName')?.disable();

    this.fg.patchValue(formData);
  }
  */

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  save() {
    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<StaffContact>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

}
