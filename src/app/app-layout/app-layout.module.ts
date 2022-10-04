import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NG-ZORRO */
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

import { AppLayoutRoutingModule } from './app-layout-routing.module';

import { AppAlarmService } from '../core/service/app-alarm.service';
import { AuthGuardService } from '../core/service/auth-guard.service';

import { MenuService } from '../system/menu/menu.service';
import { WebResourceService } from '../system/webresource/web-resource.service';
import { TermService } from '../system/terms/term.service';

import { AppLayoutComponent } from './app-layout.component';
import { UserPopupComponent } from '../system/user/user-popup.component';
import { UserProfileComponent } from './../system/user/user-profile.component';
import { UserModule } from '../system/user/user.module';


const nzModules = [
  NzLayoutModule,
  NzMenuModule,
  NzAvatarModule,
  NzIconModule,
  NzSelectModule,
  NzDropDownModule,
  NzBreadCrumbModule
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppLayoutRoutingModule,
    UserModule,
    nzModules
  ],
  declarations: [
    AppLayoutComponent
  ],
  entryComponents: [
    UserPopupComponent,
    UserProfileComponent
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
