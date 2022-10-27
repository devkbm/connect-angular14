import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WebResourceService } from './web-resource.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { WebResource } from './web-resource.model';
import { FormBase, FormType } from '../../core/form/form-base';
import { existingWebResourceValidator } from './web-resource-duplication-validator.directive';
import { ResponseList } from '../../core/model/response-list';
import { ResouceTypeEnum } from './resource-type-enum';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-web-resource-form',
  templateUrl: './web-resource-form.component.html',
  styleUrls: ['./web-resource-form.component.css']
})
export class WebResourceFormComponent extends FormBase implements OnInit, AfterViewInit {

  @ViewChild('resourceCode') resourceCode!: NzInputTextComponent;

  resourceTypeList: ResouceTypeEnum[] = [];

  constructor(private fb: FormBuilder,
              private service: WebResourceService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      resourceId   : new FormControl<string | null>(null, {
        validators: Validators.required,
        asyncValidators: [existingWebResourceValidator(this.service)],
        updateOn: 'blur'
      }),
      resourceName  : new FormControl<string | null>('', {validators: [Validators.required]}),
      resourceType  : new FormControl<string | null>('', {validators: [Validators.required]}),
      url           : new FormControl<string | null>('', {validators: [Validators.required]}),
      description   : new FormControl<string | null>(null)
    });
  }

  ngOnInit(): void {
    this.getCommonCodeList();

    if (this.initLoadId) {
      this.get(this.initLoadId);
    } else {
      this.newForm();
    }
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  focus() {
    this.resourceCode.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('resourceId')?.enable();
  }

  modifyForm(formData: WebResource): void {
    this.formType = FormType.MODIFY;

    this.fg.get('resourceId')?.disable();

    this.fg.patchValue(formData);
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  get(id: string): void {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  save(): void {
    if (this.fg.invalid) {
      this.checkForm();
      return;
    }

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  remove(id: string) {
    this.service
        .delete(id)
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  getCommonCodeList() {
    this.service
        .getWebResourceTypeList()
        .subscribe(
        (model: ResponseList<ResouceTypeEnum>) => {
          if ( model.total > 0 ) {
            this.resourceTypeList = model.data;
          }
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

}
