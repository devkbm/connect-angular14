import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MenuService } from './menu.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseList } from '../../core/model/response-list';
import { ResponseObject } from '../../core/model/response-object';
import { Menu } from './menu.model';
import { MenuHierarchy } from './menu-hierarchy.model';
import { MenuGroup } from './menu-group.model';
import { FormBase, FormType } from '../../core/form/form-base';
import { existingMenuValidator } from './menu-duplication-validator.directive';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('menuId', {static: true}) menuId!: NzInputTextComponent;

  programList: any;
  menuGroupList: any;
  menuTypeList: any;

  /**
   * 상위 메뉴 트리
   */
  menuHiererachy: MenuHierarchy[];

  @Input() menuGroupId: any;

  constructor(private fb: FormBuilder,
              private menuService: MenuService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      menuGroupId       : new FormControl<string | null>(null, { validators: Validators.required }),
      menuId            : new FormControl<string | null>(null, {
        validators: Validators.required,
        asyncValidators: [existingMenuValidator(this.menuService)],
        updateOn: 'blur'
      }),
      menuCode          : new FormControl<string | null>(null, { validators: Validators.required }),
      menuName          : new FormControl<string | null>(null, { validators: Validators.required }),
      menuType          : new FormControl<string | null>(null, { validators: Validators.required }),
      parentMenuId      : new FormControl<string | null>(null),
      sequence          : new FormControl<number | null>(null),
      appUrl            : new FormControl<string | null>(null, { validators: Validators.required })
    });

    this.fg.get('menuCode')?.valueChanges.subscribe(x => {
      const menuGroupId = this.fg.get('menuGroupId')?.value;

      this.fg.get('menuId')?.setValue(menuGroupId + x);
    });

    this.menuHiererachy = [];

    this.getMenuTypeList();
    this.getMenuGroupList();
  }

  ngOnInit() {
    this.newForm();

    if (this.initLoadId) {
      this.getMenu(this.initLoadId);
    }
  }

  ngAfterViewInit(): void {
    this.menuId.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  newForm(): void {
    this.formType = FormType.NEW;

    this.getMenuHierarchy(this.menuGroupId);

    this.fg.reset();
    this.fg.controls['menuGroupId'].setValue(this.menuGroupId);
    this.fg.controls['menuId'].enable();
  }

  modifyForm(formData: Menu): void {
    this.formType = FormType.MODIFY;

    this.getMenuHierarchy(formData.menuGroupId);

    this.fg.controls['menuId'].disable();

    this.fg.patchValue(formData);
  }

  getMenu(menuId: string) {

    this.menuService
        .getMenu(menuId)
        .subscribe(
          (model: ResponseObject<Menu>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  submitMenu() {
    this.menuService
        .registerMenu(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Menu>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  deleteMenu(): void {
    this.menuService
        .deleteMenu(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Menu>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

  getMenuHierarchy(menuGroupId: string): void {
    if (!menuGroupId) return;

    this.menuService
        .getMenuHierarchy(menuGroupId)
        .subscribe(
          (model: ResponseList<MenuHierarchy>) => {
            if ( model.total > 0 ) {
              this.menuHiererachy = model.data;
            } else {
              this.menuHiererachy = [];
            }
          }
        );
  }

  getMenuGroupList(): void {
    this.menuService
        .getMenuGroupList()
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
            console.log(model.data);
            if (model.total > 0) {
              this.menuGroupList = model.data;
            } else {
              this.menuGroupList = [];
            }
          }
        );
  }

  getMenuTypeList(): void {
    this.menuService
        .getMenuTypeList()
        .subscribe(
          (model: ResponseList<any>) => {
            if (model.total > 0) {
              this.menuTypeList = model.data;
            } else {
              this.menuTypeList = [];
            }
          }
        );
  }

  selectMenuGroup(menuGroupId: any): void {
    if (!menuGroupId) return;

    this.getMenuHierarchy(menuGroupId);
  }

}
