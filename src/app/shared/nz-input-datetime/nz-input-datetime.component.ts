import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';

import * as dateFns from "date-fns";

export enum TimeFormat {
  HourMinuteSecond = 'HH:mm:ss',
  HourMinute = 'HH:mm'
}

@Component({
  selector: 'app-nz-input-datetime',
  template: `
    <!--{{formField.errors | json}}-->
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" [nzValidateStatus]="formField" #control>
        <nz-date-picker #date
          [nzId]="itemId"
          [nzPlaceHolder]="placeholder"
          [required]="required"
          [nzDisabled]="disabled"
          [nzInputReadOnly]="readonly"
          [(ngModel)]="value"
          (ngModelChange)="dateValueChange($event)"
          (blur)="onTouched()">
        </nz-date-picker>
        <nz-time-picker #time
          [nzDisabled]="disabled"
          [nzFormat]="timeFormat"
          [nzNowText]="' '"
          [nzMinuteStep]="30"
          [(ngModel)]="value"
          (ngModelChange)="timeValueChange($event)">
        </nz-time-picker>
      </nz-form-control>
      <!--style="width: 90px" -->
    </nz-form-item>
  `,
  styles:[`
    nz-date-picker {
      width: 140px
    }
    nz-time-picker {
      width: 120px
    }
  `],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputDateTimeComponent
      ),
      multi: true
    }
  ]
})
export class NzInputDateTimeComponent implements ControlValueAccessor {

  @ViewChild('date') dateElement?: NzDatePickerComponent;
  @ViewChild('time') timeElement?: NzTimePickerComponent;
  @Input() parentFormGroup?: FormGroup;
  @Input() fieldName!: string;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;

  @Input() timeFormat: TimeFormat = TimeFormat.HourMinuteSecond;

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
    this.dateElement?.focus();
  }

  dateValueChange(val: Date) {
    this.value = val;
    const nativeValue = this.dateElement?.pickerInput?.nativeElement.value as string;
    // keyboard로 8자리 숫자입력 받을 경우 Date로 변환 처리
    if (nativeValue.length === 8) {
      this.value = this.convertDate(nativeValue);
    }

    if (this.value !== null) {
      this.onChange(dateFns.format(this.value, "yyyy-MM-dd HH:mm:ss"));
    } else {
      this.onChange(null);
      this.focus();
    }
  }

  timeValueChange(val: any) {
    this.value = val;
    const nativeValue = this.timeElement?.inputRef.nativeElement.value as string;
    console.log(nativeValue);

    if (this.value !== null) {
      this.onChange(dateFns.format(this.value, "yyyy-MM-dd HH:mm:ss"));
    }
  }

  convertDate(dateStr: string): Date | null {
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

  convertTime(timeStr: string): Date | null {
    const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const convertValue = timeStr.replace(reg,'');

    if (timeStr.length >= 8) {
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
