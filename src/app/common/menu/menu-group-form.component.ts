import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MenuService } from './menu.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { MenuGroup } from './menu-group.model';
import { existingMenuGroupValidator } from './menu-group-duplication-validator.directive';
import { FormBase, FormType } from '../../core/form/form-base';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-menu-group-form',
  templateUrl: './menu-group-form.component.html',
  styleUrls: ['./menu-group-form.component.css']
})
export class MenuGroupFormComponent extends FormBase implements OnInit, AfterViewInit {

  @ViewChild('menuGroupId', {static: true}) menuGroupId!: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      menuGroupId     : new FormControl(null, {
                                                validators: Validators.required,
                                                asyncValidators: [existingMenuGroupValidator(this.menuService)],
                                                updateOn: 'blur'
                                              }),
      menuGroupCode   : [ null, [ Validators.required ] ],
      menuGroupName   : [ null, [ Validators.required ] ],
      description     : [ null]
    });

    this.fg.get('menuGroupCode')?.valueChanges.subscribe(x => {
      const organizationCode = sessionStorage.getItem('organizationCode');
      this.fg.get('menuGroupId')?.setValue(organizationCode + x);
    });
  }

  ngOnInit() {
    this.newForm();

    if (this.initLoadId) {
      this.getMenuGroup(this.initLoadId);
    }
  }

  ngAfterViewInit(): void {
    this.menuGroupId.focus();
  }

  newForm(): void {
    this.formType = FormType.NEW;
    this.fg.get('menuGroupCode')?.setValue('');

    this.fg.reset();
  }

  modifyForm(formData: MenuGroup): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  getMenuGroup(menuGroupId: string) {
    this.menuService
        .getMenuGroup(menuGroupId)
        .subscribe(
          (model: ResponseObject<MenuGroup>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  submitMenuGroup() {
    if (this.validForm(this.fg) === false)
      return;

    this.menuService
        .registerMenuGroup(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<MenuGroup>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  deleteMenuGroup() {
    this.menuService
        .deleteMenuGroup(this.fg.get('menuGroupId')?.value)
        .subscribe(
          (model: ResponseObject<MenuGroup>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.total + '건의 메뉴그룹이 삭제되었습니다.');
          }
        );
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
