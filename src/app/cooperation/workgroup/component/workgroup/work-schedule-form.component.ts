import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ResponseObject } from '../../../../core/model/response-object';
import { FormBase, FormType } from '../../../../core/form/form-base';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroup } from '../../model/workgroup.model';
import { WorkGroupSchedule } from '../../model/workgroup-schedule.model';
import { ResponseList } from '../../../../core/model/response-list';
import { NzInputTextareaComponent } from 'src/app/shared/nz-input-textarea/nz-input-textarea.component';

export interface NewFormValue {
  workGroupId: number;
  start: Date;
  end: Date;
}

@Component({
selector: 'app-work-schedule-form',
templateUrl: './work-schedule-form.component.html',
styleUrls: ['./work-schedule-form.component.css']
})
export class WorkScheduleFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('text', {static: true}) text!: NzInputTextareaComponent;
  @Input() override initLoadId: number = -1;
  @Input() newFormValue?: NewFormValue;

  workGroupList: WorkGroup[] = [];

  constructor(private fb: FormBuilder,
              private workGroupService: WorkGroupService) {
    super();

    this.fg = this.fb.group({
      id              : new FormControl({value: null, disabled: true}),
      text            : [ null, [ Validators.required ] ],
      start           : [ null, [ Validators.required ] ],
      end             : [ null, [ Validators.required ] ],
      allDay          : [ null, [ Validators.required ] ],
      workGroupId     : [ -1, [ Validators.required ] ]
    });
  }

  ngOnInit(): void {
    this.getMyWorkGroupList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.newFormValue) {
      this.newForm(this.newFormValue);
    } else if (this.initLoadId > 0) {
      this.getWorkGroupSchedule(this.initLoadId);
    }
  }

  ngAfterViewInit(): void {
    this.text?.focus();
  }

  newForm(args: NewFormValue): void {
    this.formType = FormType.NEW;

    // 30분 단위로 입력받기 위해 초,밀리초 초기화
    args.start.setSeconds(0);
    args.start.setMilliseconds(0);
    args.end.setSeconds(0);
    args.end.setMilliseconds(0);

    this.fg.get('workGroupId')?.setValue(Number.parseInt(args.workGroupId.toString(),10));
    this.fg.get('start')?.setValue(args.start);
    this.fg.get('end')?.setValue(args.end);
  }

  modifyForm(formData: WorkGroupSchedule): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  getWorkGroupSchedule(id: number): void {
    this.workGroupService.getWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
              if (model.data) {
                console.log(model.data);
                this.modifyForm(model.data);
              }
            }
        );
  }

  saveWorkGroupSchedule(): void {
    this.workGroupService
        .saveWorkGroupSchedule(this.fg.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
              this.formSaved.emit(this.fg.getRawValue());
            }
        );
  }

  deleteWorkGroupSchedule(id: number): void {
    this.workGroupService.deleteWorkGroupSchedule(id)
        .subscribe(
            (model: ResponseObject<WorkGroupSchedule>) => {
              this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  getMyWorkGroupList(): void {
    this.workGroupService
        .getMyWorkGroupList()
        .subscribe(
          (model: ResponseList<WorkGroup>) => {
            if (model.total > 0) {
                this.workGroupList = model.data;
            } else {
                this.workGroupList = [];
            }
            //this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }
}
