import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

// https://zefoy.github.io/ngx-color-picker/

@Component({
  selector: 'app-nz-input-color-picker',
  template: `
    <!--{{formField.errors | json}}-->
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" [nzValidateStatus]="formField" #control>
      <input #input nz-input
            [cpPresetColors]="preset_colors"
            [ngModel]="value"
            [(colorPicker)]="value"
            [style.background]="value"
            [cpAlphaChannel]="'always'"
            [cpOutputFormat]="'hex'"
            [cpOKButton]="true"
            [required]="required"
            [placeholder]="placeholder"
            (colorPickerChange)="onChange($event)"
            (ngModelChange)="valueChange($event)"
            (blur)="onTouched()"
            />
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputColorPickerComponent
      ),
      multi: true
    }
  ],
  styles: []
})
export class NzInputColorPickerComponent implements ControlValueAccessor {

  @ViewChild('input') element?: ElementRef;

  @Input() parentFormGroup?: FormGroup;
  @Input() fieldName!: string;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() readonly: boolean = false;

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  color: any;
  preset_colors = ['#fff', '#000', '#2889e9', '#e920e9', '#fff500', 'rgb(236,64,64)'];

  value!: string;

  onChange!: (value: any) => void;
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
    this.element?.nativeElement.focus();
  }

  valueChange(val: any) {
    this.value = val;
    //const nativeValue = this.element?.pickerInput?.nativeElement.value;
    //console.log('nativeValue: ' + nativeValue);
  }

}
