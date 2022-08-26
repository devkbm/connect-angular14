import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

import { FormType, FormBase } from '../../core/form/form-base';
import { AppAlarmService } from '../../core/service/app-alarm.service';
import { ResponseList } from '../../core/model/response-list';
import { ResponseObject } from '../../core/model/response-object';

import { UserService } from './user.service';
import { User } from './user.model';
import { Authority } from '../authority/authority.model';
import { MenuGroup } from '../menu/menu-group.model';
import { existingUserValidator } from './user-duplication-validator.directive';

import { DeptHierarchy } from '../dept/dept-hierarchy.model';
import { DeptService } from '../dept/dept.service';
import { GlobalProperty } from 'src/app/core/global-property';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  public authList: any;
  public menuGroupList: any;
  public deptHierarchy: DeptHierarchy[] = [];

  passwordConfirm: string = '';
  popup: boolean = false;

  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: false
  };

  previewImage: string | undefined = '';
  previewVisible = false;
  imageUploadUrl: string = GlobalProperty.serverUrl + '/api/common/user/image/';
  imageUploadHeader: any = {
    Authorization: sessionStorage.getItem('token')
    //'x-auth-token': sessionStorage.getItem('token')
    //'Content-Type': 'multipart/form-data'
  };
  imageUploadParam: any;

  imageBase64: any;
  isUploadable: any;

  @ViewChild('staffNo') staffNoField?: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private deptService: DeptService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      userId: new FormControl<string | null>(null, {
        validators: Validators.required,
        asyncValidators: [existingUserValidator(this.userService)],
        updateOn: 'blur'
      }),
      organizationCode: new FormControl<string | null>({ value: null, disabled: true }, { validators: Validators.required }),
      staffNo: new FormControl<string | null>(null),
      name: new FormControl<string | null>({ value: null, disabled: false }, { validators: Validators.required }),
      enabled: new FormControl<boolean>(true),
      deptCode: new FormControl<string | null>(null),
      mobileNum: new FormControl<string | null>(null),
      email: new FormControl<string | null>({ value: null, disabled: false }, { validators: Validators.email }),
      imageBase64: new FormControl<string | null>(null),
      authorityList: new FormControl<string | null>({ value: null, disabled: false }, { validators: Validators.required }),
      menuGroupList: new FormControl<string | null>(null)
    });

  }

  ngOnInit(): void {
    if (this.initLoadId) {
      this.getUser(this.initLoadId);
    } else {
      this.newForm();
    }

    this.getAuthorityList();
    this.getMenuGroupList();
    this.getDeptHierarchy();
  }

  ngAfterViewInit(): void {
    this.staffNoField?.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  newForm(): void {
    this.formType = FormType.NEW;
    this.imageBase64 = null;
    this.previewImage = '';

    this.fg.reset();

    this.fg.get('userId')?.setAsyncValidators(existingUserValidator(this.userService));
    this.fg.get('organizationCode')?.setValue(sessionStorage.getItem('organizationCode'));
    this.fg.get('staffNo')?.valueChanges.subscribe(x => {
      if (x === null) return;
      const organizationCode = sessionStorage.getItem('organizationCode');
      this.fg.get('userId')?.setValue(organizationCode + x);
      this.fg.get('userId')?.markAsTouched();
    });
    this.fg.get('enabled')?.setValue(true);
  }

  modifyForm(formData: User): void {
    this.formType = FormType.MODIFY;

    this.fg.get('userId')?.setAsyncValidators(null);

    this.fg.patchValue(formData);
  }

  getUser(userId: string): void {
    this.userService
        .getUser(userId)
        .subscribe(
          (model: ResponseObject<User>) => {
            if (model.total > 0) {
              if (model.data.userId == null) {
                this.newForm();
              } else {
                this.modifyForm(model.data);
              }

              this.previewImage = '';
              this.imageUploadHeader =  {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "Authorization": sessionStorage.getItem('token')
              };

              this.imageUploadParam = { userId: model.data.userId };
              if (model.data.imageBase64 != null) {
                //this.imageBase64 = 'data:image/jpg;base64,' + model.data.imageBase64;
                this.imageBase64 = model.data.imageBase64;
                this.isUploadable = false;
              } else {
                this.imageBase64 = '';
                this.isUploadable = true;
              }

            } else {
              this.fg.reset();
            }

            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  registerUser(): void {
    if (this.fg.invalid) return;

    this.userService
        .registerUser(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<User>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteUser(userId: string): void {
    this.userService
        .deleteUser(userId)
        .subscribe(
          (model: ResponseObject<User>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
          }
        );
  }

  protected checkUser(): void {
    const userId: string = this.fg.get('userId')?.value;

    this.fg.get('userId')?.markAsDirty();
    this.fg.get('userId')?.updateValueAndValidity();

    this.userService
        .checkUser(this.fg.get('userId')?.value)
        .subscribe(
          (model: ResponseObject<boolean>) => {
            this.appAlarmService.changeMessage(model.message);
          }
          /*
          (err: AppError) => {
            if (err instanceof UserNotFoundError) {
              console.log('유저정보가 없음');
            }
          }
          */
        );
  }

  private validPassword(field: any) {

    /*if ( this.user.password === this.passwordConfirm) {
      // 폼 검증 수행해야 함
    } else {
      // 폼 검증 실패
    }*/

  }

  getAuthorityList(): void {
    this.userService
        .getAuthorityList()
        .subscribe(
          (model: ResponseList<Authority>) => {
            if (model.total > 0) {
              this.authList = model.data;
            }
          }
        );
  }

  getMenuGroupList(): void {
    this.userService
        .getMenuGroupList()
        .subscribe(
          (model: ResponseList<MenuGroup>) => {
            if (model.total > 0) {
              this.menuGroupList = model.data;
            }
          }
        );
  }

  getDeptHierarchy(): void {
    this.deptService
        .getDeptHierarchyList()
        .subscribe(
          (model: ResponseList<DeptHierarchy>) => {
            if (model.total > 0) {
              this.deptHierarchy = model.data;
            } else {
              this.deptHierarchy = [];
            }
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.value);
  }

  // 미리보기 버튼 클릭시
  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  // 삭제버튼 클릭스
  handleRemove = (file: NzUploadFile) => {
    console.log(file);
    return true;
  }

  fileUploadChange(param: NzUploadChangeParam): void {
    if (param.type === 'success') {
      this.isUploadable = false;
    }
  }

}
