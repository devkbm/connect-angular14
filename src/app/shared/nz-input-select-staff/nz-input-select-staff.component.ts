import { Self, Optional, Component, ElementRef, Input, TemplateRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup, NgModel, NgControl } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzSelectModeType } from 'ng-zorro-antd/select';
import { ResponseList } from 'src/app/core/model/response-list';
import { Staff, StaffSelectService } from './StaffSelect.service';

@Component({
  selector: 'app-nz-input-select-staff',
  template: `
   <!--{{formField.errors | json}}-->
   <nz-form-item>
    <nz-form-label [nzFor]="itemId" [nzRequired]="required">
      <ng-content></ng-content>
    </nz-form-label>
    <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip">
      <nz-select
          [nzId]="itemId"
          [(ngModel)]="value"
          [nzDisabled]="disabled"
          [nzPlaceHolder]="placeholder"
          [nzMode]="mode"
          nzShowSearch
          (blur)="onTouched()"
          (ngModelChange)="onChange($event)">
        <nz-option *ngFor="let option of _list; let i=index;"
          [nzLabel]="custom_label ? custom_label(option, i) : option[opt_label]"
          [nzValue]="option[opt_value]">asf
          </nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: []
})
export class NzInputSelectStaffComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild(NzFormControlComponent, {static: true})
  control!: NzFormControlComponent;

  @Input() parentFormGroup?: FormGroup;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() mode: NzSelectModeType = 'default';

  _list: Staff[] = [];
  @Input() opt_label: string = 'name';
  @Input() opt_value: string = 'staffId';
  @Input() custom_label?: (option: any, index: number) => {};

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  value!: string;

  constructor(@Self()  @Optional() private ngControl: NgControl,
              private service: StaffSelectService) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.control.nzValidateStatus = this.ngControl.control as AbstractControl;

    this.getStaffList();
  }

  ngAfterViewInit(): void {
    if (this.control) {
      this.control.nzValidateStatus = this.ngControl.control as AbstractControl;
    }
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

  getStaffList(): void {
    const params = {isEnabled: true};

    this.service
         .getList(params)
         .subscribe(
          (model: ResponseList<Staff>) => {
            this._list = model.data;
          }
      );
  }
}
