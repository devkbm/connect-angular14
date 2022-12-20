import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserDuplicationValidatorDirective } from './user/user-duplication-validator.directive';
import { CustomHttpInterceptor } from '../core/interceptor/custom-http-interceptor';
import { UserModule } from './user/user.module';
import { AutorityModule } from './authority/autority.module';
import { WebResourceModule } from './webresource/web-resource.module';
import { MenuModule } from './menu/menu.module';
import { HolidayModule } from './holiday/holiday.module';
import { DeptModule } from './dept/dept.module';
import { CommonCodeModule } from './commoncode/common-code.module';
import { TermModule } from './terms/term.module';
import { BizCodeModule } from './biz-code/biz-code.module';
import { SystemManagementRoutingModule } from './system-management-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SystemManagementRoutingModule,
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
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: COMPOSITION_BUFFER_MODE, useValue: false}
  ],
  exports: [
  ]
})
export class SystemManagementModule { }
