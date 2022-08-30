import { PayTableGridComponent } from './component/paytable/pay-table-grid.component';
import { PayTableComponent } from './component/paytable/pay-table.component';
import { PayItemGridComponent } from './component/pay-item/pay-item-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SystemManagementModule } from 'src/app/system/system-management.module';

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

import { PayItemFormComponent } from './component/pay-item/pay-item-form.component';
import { PayitemComponent } from './component/pay-item/payitem.component';
import { PayTableFormComponent } from './component/paytable/pay-table-form.component';
import { PayTableItemFormComponent } from './component/paytable/pay-table-item-form.component';
import { PayTableItemGridComponent } from './component/paytable/pay-table-item-grid.component';

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
    SystemManagementModule,
    nzModules,
    AgGridModule
  ],
  declarations: [
    PayItemFormComponent,
    PayItemGridComponent,
    PayitemComponent,
    PayTableFormComponent,
    PayTableGridComponent,
    PayTableItemFormComponent,
    PayTableItemGridComponent,
    PayTableComponent
  ],
  providers: [
  ],
  exports: [
    PayitemComponent,
    PayTableComponent
  ]
})
export class PayitemModule { }
