import { FormGroup } from '@angular/forms';
import { Output, EventEmitter, Component, Input } from '@angular/core';

export enum FormType {
    NEW = 'NEW',
    MODIFY = 'MODIFY'
}
@Component({
  template : ''
})
export abstract class FormBase {

  appUrl: string = '';
  formType: FormType = FormType.NEW;
  fg: FormGroup = new FormGroup({});

  defaultControlSize = {
    /** width < 576 px */
    xs: 24,
    /** width >= 576 px */
    sm: 24,
    /** width >= 768 px */
    md: 24,
    /** width >= 992 px */
    lg: 24,
    /** width >= 1200 px */
    xl: 24,
    /** width >= 1600 px */
    xxl: 24
  }

  defaultLabelSize = {
    /** width < 576 px */
    xs: 24,
    /** width >= 576 px */
    sm: 24,
    /** width >= 768 px */
    md: 24,
    /** width >= 992 px */
    lg: 24,
    /** width >= 1200 px */
    xl: 24,
    /** width >= 1600 px */
    xxl: 24
  }

  @Input() initLoadId: any;
  @Output() formSaved = new EventEmitter();
  @Output() formDeleted = new EventEmitter();
  @Output() formClosed = new EventEmitter();

  constructor() {
  }

  /**
   *
   * @param formGroup 폼그룹
   * @param fieldName 필드명
   * @param errorName 에러명
   */
  isFieldErrors(formGroup: FormGroup, fieldName: string, errorName: string): boolean {
      return formGroup.get(fieldName)?.dirty
          && formGroup.get(fieldName)?.hasError(errorName) ? true : false;
  }

  validForm(fg: FormGroup): boolean {
    for (const i in fg.controls) {
      fg.controls[i].markAsDirty({onlySelf: true});
      //fg.controls[i].updateValueAndValidity();
    }
    return fg.valid;
  }

  /**
   * 세션정보를 입력한다.
   */
  setSessionInfo(): void {
    this.fg.get('organizationCode')?.setValue(sessionStorage.getItem('organizationCode'));
  }
}
