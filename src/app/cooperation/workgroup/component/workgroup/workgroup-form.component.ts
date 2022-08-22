import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ResponseObject } from '../../../../core/model/response-object';
import { FormBase, FormType } from '../../../../core/form/form-base';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroup } from '../../model/workgroup.model';
import { WorkGroupMember } from '../../model/workgroup-member.model';
import { ResponseList } from '../../../../core/model/response-list';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
selector: 'app-workgroup-form',
templateUrl: './workgroup-form.component.html',
styleUrls: ['./workgroup-form.component.css']
})
export class WorkGroupFormComponent extends FormBase implements OnInit, AfterViewInit {

  workGroupList: any;
  memberList: any;
  color: any;
  preset_colors = ['#fff', '#000', '#2889e9', '#e920e9', '#fff500', 'rgb(236,64,64)'];

  @ViewChild('workGroupName') workGroupName?: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private workGroupService: WorkGroupService) {
    super();

    this.fg = this.fb.group({
      workGroupId     : new FormControl({value: null, disabled: true}),
      workGroupName   : [ null, [ Validators.required ] ],
      color           : [ null, [ Validators.required ] ],
      memberList      : [ null ]
  });
  }

  ngOnInit(): void {
    this.getAllMember();

    this.newForm();
  }

  ngAfterViewInit(): void {
    this.workGroupName?.focus();
  }

  newForm(): void {
      this.formType = FormType.NEW;
  }

  modifyForm(formData: WorkGroup): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  getWorkGroup(id: number): void {
    this.workGroupService.getWorkGroup(id)
        .subscribe(
          (model: ResponseObject<WorkGroup>) => {
            if (model.data) {
              this.modifyForm(model.data);
              this.color = model.data.color;
            } else {
              this.newForm();
            }
          }
        );
  }

  saveWorkGroup(): void {
    this.workGroupService
        .saveWorkGroup(this.fg.getRawValue())
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
              this.formSaved.emit(this.fg.getRawValue());
            }
        );
  }

  deleteWorkGroup(id: number): void {
    this.workGroupService.deleteWorkGroup(id)
        .subscribe(
            (model: ResponseObject<WorkGroup>) => {
              this.formDeleted.emit(this.fg.getRawValue());
            }
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  getAllMember(): void {
    this.workGroupService.getMemberList()
        .subscribe(
            (model: ResponseList<WorkGroupMember>) => {
              if (model.data) {
                  this.memberList = model.data;
              } else {
                  this.memberList = [];
              }
          }
        );
  }

  selectColor(color: any): void {
    this.fg.get('color')?.setValue(color);
  }

}
