import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './app-layout.component';
import { AuthGuardService } from '../core/service/auth-guard.service';

import { AuthorityComponent } from '../system/authority/authority.component';
import { UserComponent } from '../system/user/user.component';
import { WebResourceComponent } from '../system/webresource/web-resource.component';
import { MenuComponent } from '../system/menu/menu.component';
import { TermComponent } from '../system/terms/term.component';
import { CommonCodeComponent } from '../system/commoncode/common-code.component';
import { DeptComponent } from '../system/dept/dept.component';
import { HolidayComponent } from '../system/holiday/holiday.component';
import { BizCodeComponent } from '../system/biz-code/biz-code.component';

import { TeamComponent } from '../cooperation/communication/component/team.component';
import { BoardComponent } from '../cooperation/board/component/board.component';
import { SurveyFormComponent } from '../cooperation/survey/component/survey-form.component';
import { WorkgroupComponent } from '../cooperation/workgroup/component/workgroup/workgroup.component';
import { TodosComponent } from '../cooperation/todo/todos.component';

import { AppointmentCodeComponent } from '../hrm/appointment/component/appointment-code/appointment-code.component';
import { HrmRelationCodeComponent } from '../hrm/appointment/component/hrm-type/hrm-relation-code.component';

import { LedgerComponent } from '../hrm/appointment/component/ledger/ledger.component';
import { DutyApplicationComponent } from '../hrm/duty/component/duty-application/duty-application.component';
import { DutyCodeComponent } from '../hrm/duty/component/duty-code/duty-code.component';
import { EmployeeMasterComponent } from '../hrm/employee/component/basic-info/employee-master.component';
import { DeptEmployeeListComponent } from '../hrm/employee/component/dept-employee-list/dept-employee-list.component';
import { PayitemComponent } from './../hrm/payitem/component/pay-item/payitem.component';
import { PayTableComponent } from '../hrm/payitem/component/paytable/pay-table.component';
import { StaffManagementComponent } from '../hrm/staff/staff-management.component';
import { HrmTypeComponent } from '../hrm/hrm-code/hrm-type.component';

const layoutroutes: Routes = [
  {
    path: 'home', component: AppLayoutComponent, canActivateChild: [AuthGuardService],
    children: [
      /* 공통 시스템 */
      {path: 'user',          component: UserComponent},
      {path: 'auth',          component: AuthorityComponent},
      {path: 'program',       component: WebResourceComponent},
      {path: 'menu',          component: MenuComponent},
      {path: 'commoncode',    component: CommonCodeComponent},
      {path: 'dept',          component: DeptComponent},
      {path: 'term',          component: TermComponent},
      {path: 'holiday',       component: HolidayComponent},
      {path: 'bizcode',       component: BizCodeComponent},

      /* 협업시스템 */
      {path: 'team',          component: TeamComponent},
      {path: 'board',         component: BoardComponent},
      {path: 'workgroup',     component: WorkgroupComponent},
      {path: 'surveyform',    component: SurveyFormComponent},
      {path: 'todo',          component: TodosComponent},

      /* 인사시스템 */
      {path: 'hrmtype',           component: HrmTypeComponent},
      {path: 'relationcode',      component: HrmRelationCodeComponent},
      {path: 'appointmentcode',   component: AppointmentCodeComponent},
      {path: 'appointmentledger', component: LedgerComponent},
      {path: 'employee',          component: EmployeeMasterComponent},
      {path: 'deptemployeelist',  component: DeptEmployeeListComponent},
      {path: 'dutycode',          component: DutyCodeComponent},
      {path: 'dutyapplication',   component: DutyApplicationComponent},
      {path: 'payitem',           component: PayitemComponent},
      {path: 'paytable',          component: PayTableComponent},
      {path: 'staff',             component: StaffManagementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(layoutroutes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
