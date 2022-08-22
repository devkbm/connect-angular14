import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/core/grid/renderer/checkbox-renderer.component';

import { AppointmentCodeComponent } from './component/appointment-code/appointment-code.component';
import { AppointmentCodeFormComponent } from './component/appointment-code/appointment-code-form.component';
import { AppointmentCodeService } from './service/appointment-code.service';
import { AppointmentCodeDetailFormComponent } from './component/appointment-code/appointment-code-detail-form.component';
import { AppointmentCodeGridComponent } from './component/appointment-code/appointment-code-grid.component';
import { AppointmentCodeDetailGridComponent } from './component/appointment-code/appointment-code-detail-grid.component';
import { LedgerFormComponent } from './component/ledger/ledger-form.component';
import { LedgerComponent } from './component/ledger/ledger.component';
import { LedgerService } from './service/ledger.service';
import { LedgerListFormComponent } from './component/ledger/ledger-list-form.component';
import { LedgerListDetailGridComponent } from './component/ledger/ledger-list-detail-grid.component';
import { LedgerGridComponent } from './component/ledger/ledger-grid.component';
import { LedgerListGridComponent } from './component/ledger/ledger-list-grid.component';
import { HrmCodeService } from './service/hrm-code.service';
import { HrmTypeFormComponent } from './component/hrm-type/hrm-type-form.component';
import { HrmTypeComponent } from './component/hrm-type/hrm-type.component';
import { HrmTypeGridComponent } from './component/hrm-type/hrm-type-grid.component';
import { HrmTypeCodeFormComponent } from './component/hrm-type/hrm-type-code-form.component';
import { HrmTypeCodeGridComponent } from './component/hrm-type/hrm-type-code-grid.component';
import { HrmRelationCodeFormComponent } from './component/hrm-type/hrm-relation-code-form.component';
import { HrmRelationCodeGridComponent } from './component/hrm-type/hrm-relation-code-grid.component';
import { HrmRelationCode } from './model/hrm-relation-code';
import { HrmRelationCodeComponent } from './component/hrm-type/hrm-relation-code.component';


const nzModules = [
  NzLayoutModule,
  NzGridModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule,
  NzTreeModule,
  NzTabsModule,
  NzInputNumberModule,
  NzTreeSelectModule,
  NzDatePickerModule,
  NzButtonModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    nzModules,
    AgGridModule,
  ],
  declarations: [
    HrmTypeComponent,
    HrmTypeFormComponent,
    HrmTypeGridComponent,
    HrmTypeCodeFormComponent,
    HrmTypeCodeGridComponent,
    AppointmentCodeComponent,
    AppointmentCodeFormComponent,
    AppointmentCodeGridComponent,
    AppointmentCodeDetailFormComponent,
    AppointmentCodeDetailGridComponent,

    LedgerFormComponent,
    LedgerListFormComponent,
    LedgerListDetailGridComponent,
    LedgerGridComponent,
    LedgerListGridComponent,
    LedgerComponent,

    HrmRelationCodeFormComponent,
    HrmRelationCodeGridComponent,
    HrmRelationCodeComponent
  ],
  providers: [
    HrmCodeService,
    AppointmentCodeService,
    LedgerService
  ],
  exports: [
    HrmTypeComponent,
    AppointmentCodeComponent,
    LedgerComponent,
    HrmRelationCodeComponent
  ]
})
export class AppointmentModule { }
