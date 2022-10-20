import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* NG-ZORRO */
import { NZ_I18N, ko_KR } from 'ng-zorro-antd/i18n';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalService } from 'ng-zorro-antd/modal';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from '../app-routing.module';

import { UserDuplicationValidatorDirective } from './user/user-duplication-validator.directive';
import { CustomHttpInterceptor } from '../core/interceptor/custom-http-interceptor';
import { UserSessionService } from '../core/service/user-session.service';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from './user/user.module';
import { AutorityModule } from './authority/autority.module';
import { WebResourceModule } from './webresource/web-resource.module';
import { MenuModule } from './menu/menu.module';
import { LoginModule } from './login/login.module';
import { HolidayModule } from './holiday/holiday.module';
import { DeptModule } from './dept/dept.module';
import { CommonCodeModule } from './commoncode/common-code.module';
import { CoreModule } from '../core/core.module';
import { TermModule } from './terms/term.module';
import { BizCodeModule } from './biz-code/biz-code.module';

const nzModules = [
  NzGridModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzInputModule,
  NzDrawerModule,
  NzDividerModule
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({cookieName: 'XSRF-TOKEN'}),
    AppRoutingModule,
    nzModules,
    SharedModule,
    CoreModule,
    AgGridModule,
    LoginModule,
    UserModule,
    AutorityModule,
    WebResourceModule,
    MenuModule,
    HolidayModule,
    DeptModule,
    CommonCodeModule,
    TermModule,
    BizCodeModule
  ],
  declarations: [
    UserDuplicationValidatorDirective    
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR },
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false},
    UserSessionService,
    NzModalService
  ],
  exports: [    
  ]
})
export class SystemManagementModule { }
