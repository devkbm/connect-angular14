import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import ko from '@angular/common/locales/ko';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ko_KR } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalProperty } from './core/global-property';
import { AppLayoutModule } from './app-layout/app-layout.module';
import { AppInjector } from './core/app/app-injector.service';
import { CommonFuncModule } from './common/common-func.module';

import { BoardModule } from './cooperation/board/board.module';
import { CommunicationModule } from './cooperation/communication/communication.module';
import { SurveyModule } from './cooperation/survey/survey.module';
import { WorkgroupModule } from './cooperation/workgroup/workgroup.module';
import { AppointmentModule } from './hrm/appointment/appointment.module';
import { DutyModule } from './hrm/duty/duty.module';
import { EmployeeModule } from './hrm/employee/employee.module';
import { PayitemModule } from './hrm/payitem/payitem.module';
import { StaffModule } from './hrm/staff/staff.module';
import { TodoModule } from './cooperation/todo/todo.module';

registerLocaleData(ko);

const antDesignIcons = AllIcons as {
     [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NzIconModule.forRoot(icons),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN'}),
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    AppRoutingModule,
    AppLayoutModule,
    CommonFuncModule,
    BoardModule,
    CommunicationModule,
    SurveyModule,
    WorkgroupModule,
    AppointmentModule,
    EmployeeModule,
    DutyModule,
    PayitemModule,
    StaffModule,
    TodoModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    GlobalProperty,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}
