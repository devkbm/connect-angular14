import { ChangeDetectionStrategy, Component, forwardRef, Input, TemplateRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzSelectModeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-nz-input-select',
  template: `
   <!--{{formField.errors | json}}-->
   <nz-form-item>
    <nz-form-label [nzFor]="itemId" [nzRequired]="required">
      <ng-content></ng-content>
    </nz-form-label>
    <nz-form-control [nzErrorTip]="nzErrorTip">
      <nz-select
          [nzId]="itemId"
          [ngModel]="value"
          [nzDisabled]="disabled"
          [nzPlaceHolder]="placeholder"
          [nzMode]="mode"
          nzShowSearch
          (blur)="onTouched()"
          (ngModelChange)="onChange($event)">
        <nz-option *ngFor="let option of options"
          [nzLabel]="option[opt_label]"
          [nzValue]="option[opt_value]">
          </nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputSelectComponent
      ),
      multi: true
    }
  ]
})
export class NzInputSelectComponent implements ControlValueAccessor {

  @Input() parentFormGroup?: FormGroup;
  @Input() fieldName: string = '';
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() options!: any[];
  @Input() opt_label: string = 'label';
  @Input() opt_value: string = 'value';
  @Input() mode: NzSelectModeType = 'default';

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  value!: string;

  constructor() { }

  get formField(): FormControl {
    return this.parentFormGroup?.get(this.fieldName) as FormControl;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
}
