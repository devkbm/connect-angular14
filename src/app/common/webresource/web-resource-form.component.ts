import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { WebResourceService } from './web-resource.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { WebResource } from './web-resource';
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

  @ViewChild('resourceCode', {static: true}) resourceCode!: NzInputTextComponent;

  resourceTypeList: ResouceTypeEnum[] = [];

  constructor(private fb: FormBuilder,
              private service: WebResourceService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      resourceCode  : new FormControl(null, {
                                              validators: Validators.required,
                                              asyncValidators: [existingWebResourceValidator(this.service)],
                                              updateOn: 'blur'
                                            }),
      resourceName  : [ null, [ Validators.required ] ],
      resourceType  : [ null, [ Validators.required ] ],
      url           : [ null, [ Validators.required ] ],
      description   : [ null]
    });

    this.getCommonCodeList();
  }

  ngOnInit(): void {
    this.newForm();

    if (this.initLoadId) {
      this.getForm(this.initLoadId);
    }
  }

  ngAfterViewInit(): void {
    this.resourceCode.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('resourceCode')?.enable();
  }

  modifyForm(formData: WebResource): void {
    this.formType = FormType.MODIFY;

    this.fg.get('resourceCode')?.disable();

    this.fg.patchValue(formData);
  }

  getForm(id: string): void {
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

  saveForm(): void {
    if (this.validForm(this.fg) === false)
      return;

    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteForm(id: string): void {
    this.service
        .delete(id)
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  private getCommonCodeList(): void {
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
