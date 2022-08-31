import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

import * as dateFns from "date-fns";

@Component({
  selector: 'app-nz-input-date',
  template: `
    <!--{{formField.errors | json}}-->
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" [nzValidateStatus]="formField" #control>
        <!-- (ngModelChange)="onChange($event)" -->
        <nz-date-picker #inputControl
              [nzId]="itemId"
              [nzPlaceHolder]="placeholder"
              [required]="required"
              [nzDisabled]="disabled"
              [nzInputReadOnly]="readonly"
              [(ngModel)]="value"
              (ngModelChange)="valueChange($event)"
              (blur)="onTouched()">
        </nz-date-picker>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [`
    nz-date-picker {
      width: 140px
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputDateComponent
      ),
      multi: true
    }
  ]
})
export class NzInputDateComponent implements ControlValueAccessor {

  @ViewChild('inputControl') element?: NzDatePickerComponent;
  @Input() parentFormGroup?: FormGroup;
  @Input() fieldName!: string;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;



  value!: Date | null;

  onChange!: (value: string | null) => void;
  onTouched!: () => void;

  constructor() { }

  get formField(): FormControl {
    return this.parentFormGroup?.get(this.fieldName) as FormControl;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  focus(): void {
    this.element?.focus();
  }

  valueChange(val: Date) {
    this.value = val;
    const nativeValue = this.element?.pickerInput?.nativeElement.value as string;
    // keyboard로 8자리 숫자입력 받을 경우 Date로 변환 처리
    if (nativeValue.length === 8) {
      this.value = this.convert(nativeValue);
    }

    if (this.value !== null) {
      this.onChange(dateFns.format(this.value, "yyyy-MM-dd"));
    } else {
      this.onChange(null);
      this.focus();
    }
  }

  convert(dateStr: string): Date | null {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const convertValue = dateStr.replace(reg,'');

    if (dateStr.length >= 8) {
      const year = convertValue.substring(0,4);
      const month = convertValue.substring(4,6);
      const day = convertValue.substring(6,8);
      const dateStr = year + '-' + month + '-' + day;
      const dateNum = Date.parse(dateStr);
      // Validate Date String
      if (!isNaN(dateNum)) {
        return new Date(dateStr);
      }
    }

    return null;
  }

}
