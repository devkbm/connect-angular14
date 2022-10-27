import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { HrmCodeService } from './hrm-code.service';
import { HrmCode } from './hrm-code.model';
import { existingHrmTypeDetailCodeValidator } from './hrm-code-duplication-validator';

@Component({
  selector: 'app-hrm-code-form',
  templateUrl: './hrm-code-form.component.html',
  styleUrls: ['./hrm-code-form.component.css']
})
export class HrmTypeCodeFormComponent extends FormBase implements OnInit, AfterViewInit {

  constructor(private fb:FormBuilder,
              private service: HrmCodeService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      typeId    : new FormControl<string | null>(null, { validators: Validators.required }),
      code      : new FormControl(null, {
                                    validators: Validators.required,
                                    asyncValidators: [existingHrmTypeDetailCodeValidator(this.service)],
                                    updateOn: 'blur'
                                  }),
      codeName  : new FormControl<string | null>(null, { validators: Validators.required }),
      useYn     : new FormControl<boolean>(true),
      sequence  : new FormControl<number>(0),
      comment   : new FormControl<string | null>(null)
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    if (this.initLoadId && this.initLoadId.typeId && this.initLoadId.code) {
      this.get(this.initLoadId.typeId, this.initLoadId.code);
    } else if (this.initLoadId && this.initLoadId.typeId){
      this.newForm(this.initLoadId.typeId);
    }
  }

  newForm(typeId: string): void {
    this.formType = FormType.NEW;

    this.fg.get('typeId')?.setValue(typeId);
    this.fg.get('useYn')?.setValue(true);

    this.fg.get('typeId')?.disable();
    this.fg.get('code')?.enable();
  }

  modifyForm(formData: HrmCode): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

    this.fg.get('code')?.disable();
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  select(param: any) {
    this.get(param.value['typeId'], param.value['code']);
  }

  get(typeId: string, code: string): void {
    this.service
        .getHrmTypeDetailCode(typeId, code)
        .subscribe(
          (model: ResponseObject<HrmCode>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm('');
            }
            this.appAlarmService.changeMessage(model.message);
          }
      );
  }

  save(): void {
    this.service
        .saveHrmTypeDetailCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<HrmCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(): void {
    this.service
        .deleteHrmTypeDetailCode(this.fg.get('typeId')?.value, this.fg.get('code')?.value)
        .subscribe(
          (model: ResponseObject<HrmCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

}

