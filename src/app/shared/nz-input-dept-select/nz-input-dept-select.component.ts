import { Component, Self, Optional, Input, TemplateRef, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NgControl } from '@angular/forms';

import { NzSelectModeType } from 'ng-zorro-antd/select';

import { ResponseList } from 'src/app/core/model/response-list';
import { Dept, DeptSelectService } from './DeptSelect.service';

@Component({
  selector: 'app-nz-input-dept-select',
  template: `
   <nz-form-item>
    <nz-form-label [nzFor]="itemId" [nzRequired]="required">
      <ng-content></ng-content>
    </nz-form-label>
    <nz-form-control [nzErrorTip]="nzErrorTip">
      <nz-select
          [nzId]="itemId"
          [(ngModel)]="value"
          [nzDisabled]="disabled"
          [nzPlaceHolder]="placeholder"
          [nzMode]="mode"
          nzShowSearch
          (blur)="onTouched()"
          (ngModelChange)="onChange($event)">
        <nz-option *ngFor="let option of deptList"
          [nzLabel]="option[opt_label]"
          [nzValue]="option[opt_value]">
          </nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: []
})
export class NzInputDeptSelectComponent implements ControlValueAccessor, OnInit {

  @Input() parentFormGroup?: FormGroup;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() opt_label: string = 'deptNameKorean';
  @Input() opt_value: 'deptId' | 'deptCode' = 'deptCode';
  @Input() mode: NzSelectModeType = 'default';

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  value!: string;

  deptList: Dept[] = [];

  constructor(@Self()  @Optional() private ngControl: NgControl
             ,private service: DeptSelectService ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.getDeptList();
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

  getDeptList(): void {
    const params = {isEnabled: true};

    this.service
         .getDeptList(params)
         .subscribe(
          (model: ResponseList<Dept>) => {
            this.deptList = model.data;
          }
      );
  }

}