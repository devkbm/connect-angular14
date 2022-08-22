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

import { HrmCodeService } from '../../service/hrm-code.service';
import { HrmTypeDetailCode } from '../../model/hrm-type-detail-code';
import { existingHrmTypeDetailCodeValidator } from '../../validator/hrm-type-detail-code-duplication-validator';

@Component({
  selector: 'app-hrm-type-code-form',
  templateUrl: './hrm-type-code-form.component.html',
  styleUrls: ['./hrm-type-code-form.component.css']
})
export class HrmTypeCodeFormComponent extends FormBase implements OnInit {

   ;

  constructor(private fb:FormBuilder,
              private hrmCodeService: HrmCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      codeType  : [ null, [ Validators.required ] ],
      code      : new FormControl(null, {
                                    validators: Validators.required,
                                    asyncValidators: [existingHrmTypeDetailCodeValidator(this.hrmCodeService)],
                                    updateOn: 'blur'
                                  }),
      codeName  : [ null, [ Validators.required ] ],
      useYn     : [ null],
      sequence  : [ null],
      comment   : [ null]
    });

    this.newForm('', '');
  }

  public newForm(codeType: string, code: string): void {
    this.formType = FormType.NEW;

    /**
     * 컨트롤 초기값 설정
     */
    this.fg.reset();
    this.fg.get('codeType')?.setValue(codeType);
    this.fg.get('code')?.setValue(code);
    this.fg.get('useYn')?.setValue(true);

    /**
     * 컨트롤 설정
     */
    this.fg.get('codeType')?.disable();
    this.fg.get('code')?.enable();
  }

  public modifyForm(formData: HrmTypeDetailCode): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

    this.fg.get('code')?.disable();
  }

  public select(param: any) {
    this.getHrmTypeDetailCode(param.value['codetype'], param.value['code']);
  }

  public getHrmTypeDetailCode(codeType: string, code: string): void {
    this.hrmCodeService
        .getHrmTypeDetailCode(codeType, code)
        .subscribe(
          (model: ResponseObject<HrmTypeDetailCode>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm('', '');
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
        .saveHrmTypeDetailCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<HrmTypeDetailCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteHrmTypeDetailCode(): void {
    this.hrmCodeService
        .deleteHrmTypeDetailCode(this.fg.get('codeType')?.value, this.fg.get('code')?.value)
        .subscribe(
            (model: ResponseObject<HrmTypeDetailCode>) => {
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

