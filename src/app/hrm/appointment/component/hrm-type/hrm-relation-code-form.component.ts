import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { ResponseObject } from 'src/app/core/model/response-object';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { HrmRelationCode } from '../../model/hrm-relation-code';
import { HrmCodeService } from '../../service/hrm-code.service';
import { AppointmentCodeService } from '../../service/appointment-code.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { HrmTypeDetailCode } from '../../model/hrm-type-detail-code';
import { CommonCodeService } from 'src/app/common/commoncode/common-code.service';

@Component({
  selector: 'app-hrm-relation-code-form',
  templateUrl: './hrm-relation-code-form.component.html',
  styleUrls: ['./hrm-relation-code-form.component.css']
})
export class HrmRelationCodeFormComponent extends FormBase implements OnInit {

   ;

  commonCodeList: any[] = [];
  parentHrmTypeList: any[] = [];
  parentHrmDetailCodeList: any[] = [];
  childHrmTypeList: any[] = [];
  childHrmDetailCodeList: any[] = [];

  constructor(private fb:FormBuilder,
              private hrmCodeService: HrmCodeService,
              private appointmentCodeService: AppointmentCodeService,
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      relationId      : [ null, [ Validators.required ] ], //new FormControl(fkBoard, {validators: Validators.required}),
      relCode         : [ null, [ Validators.required ] ],
      parentTypeId    : [ null, [ Validators.required ] ],
      parentDetailId  : [ null, [ Validators.required ] ],
      childTypeId     : [ null, [ Validators.required ] ],
      childDetailId   : [ null, [ Validators.required ] ]
    });

    this.getCommonCode();

    this.getTypeCodeList(true, 'JOB');
    this.getTypeCodeList(false, 'JOB');

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    /**
     * 컨트롤 초기값 설정
     */
    this.fg.reset();
    //this.fg.controls.typeId.setValue(typeId);
    //this.fg.controls.useYn.setValue(true);

    /**
     * 컨트롤 설정
     */
  }

  public modifyForm(formData: HrmRelationCode): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);

    //this.fg.controls.code.disable();
  }

  public selectParentId(param: any) {
    console.log(param);
    this.getHrmTypeDetail(true, param);
  }

  public selectChildId(param: any) {
    console.log(param);
    this.getHrmTypeDetail(false, param);
  }

  public getCommonCode(): void {
    this.commonCodeService
        .getCommonCodeListByParentId('HRMREL')
        .subscribe(
          (model: ResponseList<any>) => {
            if ( model.total > 0 ) {
              this.commonCodeList = model.data;
            } else {
              this.commonCodeList = [];
            }
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public getTypeCodeList(isParent: boolean, typeId: string): void {
    this.appointmentCodeService
        .getTypeCodeList(typeId)
        .subscribe(
          (model: ResponseList<any>) => {
            if (isParent) {
              if ( model.total > 0 ) {
                this.parentHrmTypeList = model.data;
              } else {
                this.parentHrmTypeList = [];
              }
            } else {
              if ( model.total > 0 ) {
                this.childHrmTypeList = model.data;
              } else {
                this.childHrmTypeList = [];
              }
            }
            //this.fg.get('changeTypeDetail').setValue(null);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public getHrmTypeDetail(isParent: boolean, typeId: string): void {
    this.hrmCodeService
        .getHrmTypeDetailCodeList({typeId: typeId})
        .subscribe(
          (model: ResponseList<HrmTypeDetailCode>) => {
            if (isParent) {
              this.parentHrmDetailCodeList = model.data;
            } else {
              this.childHrmDetailCodeList = model.data;
            }
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public getHrmRelationCode(id: string): void {
    this.hrmCodeService
        .getHrmRelationCode(id)
        .subscribe(
          (model: ResponseObject<HrmRelationCode>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  public submitForm(): void {
    this.hrmCodeService
        .saveHrmRelationCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<HrmRelationCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteHrmRelationCode(id: string): void {
    this.hrmCodeService
        .deleteHrmRelationCode(id)
        .subscribe(
            (model: ResponseObject<HrmRelationCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }
}
