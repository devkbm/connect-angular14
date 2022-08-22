import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { AppLayoutRoutingModule } from './app-layout-routing.module';

import { MenuService } from '../common/menu/menu.service';
import { WebResourceService } from '../common/webresource/web-resource.service';
import { AppAlarmService } from '../core/service/app-alarm.service';
import { TermService } from '../common/terms/term.service';

import { AppLayoutComponent } from './app-layout.component';
import { UserPopupComponent } from '../common/user/user-popup.component';
import { AuthGuardService } from '../core/service/auth-guard.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppLayoutRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzAvatarModule,
    NzIconModule,
    NzSelectModule
  ],
  declarations: [
    AppLayoutComponent
  ],
  entryComponents: [
    UserPopupComponent
  ],
  providers: [
    AppAlarmService,
    MenuService,
    WebResourceService,
    TermService,
    AuthGuardService
  ],
  exports: [
    AppLayoutComponent
  ]
})
export class AppLayoutModule { }
