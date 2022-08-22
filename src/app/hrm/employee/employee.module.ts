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
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/core/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/core/grid/renderer/checkbox-renderer.component';

import { EmployeeMasterComponent } from './component/basic-info/employee-master.component';
import { EmployeeFormComponent } from './component/basic-info/employee-form.component';
import { DeptChangeHistoryGridComponent } from './component/basic-info/dept-change-history-grid.component';
import { JobChangeHistoryGridComponent } from './component/basic-info/job-change-history-grid.component';
import { StatusChangeHistoryGridComponent } from './component/basic-info/status-change-history-grid.component';
import { EmployeeGridComponent } from './component/basic-info/employee-grid.component';
import { DeptEmployeeListComponent } from './component/dept-employee-list/dept-employee-list.component';
import { EmployeeCardComponent } from './component/employee-card/employee-card.component';
import { DeptModule } from 'src/app/common/dept/dept.module';

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
  NzButtonModule,
  NzAvatarModule,
  NzCardModule,
  NzUploadModule
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    nzModules,
    AgGridModule,
    DeptModule
  ],
  declarations: [
    EmployeeFormComponent,
    DeptChangeHistoryGridComponent,
    JobChangeHistoryGridComponent,
    StatusChangeHistoryGridComponent,
    EmployeeGridComponent,
    EmployeeMasterComponent,
    DeptEmployeeListComponent,
    EmployeeCardComponent
  ],
  providers: [
  ],
  exports: [
    EmployeeFormComponent,
    EmployeeMasterComponent,
    DeptEmployeeListComponent
  ]
})
export class EmployeeModule { }
