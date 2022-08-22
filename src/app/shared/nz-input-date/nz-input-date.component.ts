import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-nz-input-date',
  template: `
    <!--{{formField.errors | json}}-->
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" [nzValidateStatus]="formField" #control>
        <nz-date-picker #inputControl
              [nzId]="itemId"
              [nzPlaceHolder]="placeholder"
              [required]="required"
              [nzDisabled]="disabled"
              [ngModel]="value"
              [nzInputReadOnly]="readonly"
              (ngModelChange)="onChange($event)"
              (ngModelChange)="valueChange($event)"
              (blur)="onTouched()">
        </nz-date-picker>
      </nz-form-control>
    </nz-form-item>
  `,
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

  value!: string;

  onChange!: (value: string) => void;
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

  valueChange(val: any) {
    const nativeValue = this.element?.pickerInput?.nativeElement.value;
    console.log('nativeValue: ' + nativeValue);
  }

}
