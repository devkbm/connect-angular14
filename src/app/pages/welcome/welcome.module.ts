import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

import ko from '@angular/common/locales/ko';
registerLocaleData(ko);
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { ko_KR } from 'ng-zorro-antd/i18n';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CalendarModule,
    WelcomeRoutingModule
  ],
  declarations: [
    WelcomeComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: ko_KR }
  ],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
