import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { Authority } from './authority.model';
import { FormBase, FormType } from '../../core/form/form-base';
import { existingAuthorityValidator } from './authority-duplication-validator.directive';
import { AuthorityService } from './authority.service';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.css']
})
export class AuthorityFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('authorityCode') authorityCode!: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private service: AuthorityService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      id: new FormControl<string | null>(null, {
                                                validators: Validators.required,
                                                  asyncValidators: [existingAuthorityValidator(this.service)],
                                                  updateOn: 'blur'
                                               }),
      authorityCode : new FormControl<string | null>('', { validators: [Validators.required] }),
      description   : new FormControl<string | null>(null)
    });
  }

  ngOnInit() {
    if (this.initLoadId) {
      this.getAuthority(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*
    if (changes['initLoadId']) {
      this.getAuthority(changes['initLoadId'].currentValue);
    }
    */
  }

  focus() {
    this.authorityCode.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('id')?.setAsyncValidators(existingAuthorityValidator(this.service));

    this.fg.get('authorityCode')?.valueChanges.subscribe(x => {
      if (x === null) return;
      const organizationCode = sessionStorage.getItem('organizationCode');
      this.fg.get('id')?.setValue(organizationCode + x);
      this.fg.get('id')?.markAsTouched();
    });
    this.fg.get('authorityCode')?.enable();    
  }

  modifyForm(formData: Authority): void {
    this.formType = FormType.MODIFY;

    this.fg.get('id')?.setAsyncValidators(null);
    this.fg.get('authorityCode')?.disable();
    this.fg.patchValue(formData);
  }

  getAuthority(id: string): void {
    this.service
        .getAuthority(id)
        .subscribe(
          (model: ResponseObject<Authority>) => {
            if (model.total > 0) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  saveAuthority(): void {
    if (this.fg.invalid) return;

    this.service
        .registerAuthority(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Authority>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteAuthority(id: string): void {
    this.service
        .deleteAuthority(id)
        .subscribe(
          (model: ResponseObject<Authority>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
