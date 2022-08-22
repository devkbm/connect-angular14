import { ChangeDetectionStrategy, Component, forwardRef, Input, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-nz-input-number-custom',
  template: `
    <!--{{formField.errors | json}}-->
    <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" [nzValidateStatus]="formField" #control>
        <nz-input-number
          [nzId]="itemId"
          [required]="required"
          [nzDisabled]="disabled"
          placeholder="placeholder"
          [ngModel]="value"
          [nzMin]="1" [nzMax]="9999" [nzStep]="1"
          (ngModelChange)="onChange($event)"
          (blur)="onTouched()">
        </nz-input-number>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputNumberCustomComponent
      ),
      multi: true
    }
  ]
})
export class NzInputNumberCustomComponent implements ControlValueAccessor {

  @Input() parentFormGroup?: FormGroup;
  @Input() fieldName!: string;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';

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



}
