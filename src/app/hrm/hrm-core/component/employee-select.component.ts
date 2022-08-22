import { Component, Self, Optional, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmployeeCombo } from '../model/employee-combo';
import { ResponseList } from 'src/app/core/model/response-list';
import { HrmCoreService } from '../service/hrm-core.service';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  styleUrls: ['./employee-select.component.css']
})
export class EmployeeSelectComponent implements ControlValueAccessor, OnInit {

  @Input() disabled: boolean = false;
  @Input() placeholder = '';

  _value: any = '';

  employeeList: EmployeeCombo[] = [];

  constructor(@Self()  @Optional() private ngControl: NgControl,
              private hrmCoreService: HrmCoreService) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.getEmployeeList();
  }

  ngOnInit() {
  }

  public getEmployeeList(): void {
    this.hrmCoreService
        .getEmployeeList()
        .subscribe(
          (model: ResponseList<EmployeeCombo>) => {
            console.log(model.data);
            this.employeeList = model.data;
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(value: any): void {
    console.log('writeValue: '+ value);
    this._value = value;
    this.onChange(this._value);
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Update form when DOM element value changes (view => model)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.onChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.onTouched = fn;
  }

  onChange = (_: any) => { console.log('onChange : ' + _); };
  onTouched = (_: any) => { console.log('onTouched : ' + _); };

  _selectChanged(value: any): void {
    console.log('_selectChanged :' + value);
    this.onChange(value);
    //this.onChange(value);
  }

  _input(event: any): void {
    this.onChange(event.target.value);
  }
}
