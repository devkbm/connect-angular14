import { Component, OnInit, ViewChild } from '@angular/core';
import { NewFormValue, WorkScheduleFormComponent } from './work-schedule-form.component';
import { WorkGroupFormComponent } from './workgroup-form.component';
import { MyWorkGroupGridComponent } from './myworkgroup-grid.component';
import { NewDateSelectedArgs, WorkCalendarComponent } from './work-calendar.component';
import { DaypilotCalendarNavigatorComponent } from 'src/app/shared/calendar/daypilot-calendar-navigator.component';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { ModeChangedArgs } from 'src/app/shared/calendar/daypilot-calendar.component';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.css']
})
export class WorkgroupComponent implements OnInit {

  @ViewChild('myWorkGroupGrid', {static: true}) myWorkGroupGrid!: MyWorkGroupGridComponent;
  @ViewChild('workCalendar', {static: true}) workCalendar!: WorkCalendarComponent;
  @ViewChild('workScheduleForm', {static: false}) workScheduleForm!: WorkScheduleFormComponent;
  @ViewChild('workGroupForm', {static: false}) workGroupForm!: WorkGroupFormComponent;

  @ViewChild('navigator', {static: true}) navigator!: DaypilotCalendarNavigatorComponent;

  scheduleDrawerVisible: boolean = false;
  workGroupDrawerVisible: boolean = false;

  mode: "Day" | "Week" | "Month" | "None" = 'Month';

  selectedWorkGroupId: number = -1;
  selectedScheduleId: number = -1;
  newScheduleArgs?: NewFormValue;
  eventData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getMyWorkGroupList();
  }

  getMyWorkGroupList(): void {
    this.closeWorkGroupDrawer();
    this.myWorkGroupGrid.getMyWorkGroupList();
  }

  getScheduleList(): void {
    this.closeWorkGroupDrawer();
    this.closeScheduleDrawer();

    this.workCalendar.fkWorkGroup = this.selectedWorkGroupId;
    this.workCalendar.getWorkScheduleList();
  }

  openScheduleDrawer() {
    console.log('openScheduleDrawer: start');
    this.scheduleDrawerVisible = true;
    console.log('openScheduleDrawer: end');
  }

  closeScheduleDrawer() {
    this.scheduleDrawerVisible = false;

    this.workCalendar.fkWorkGroup = this.selectedWorkGroupId;
    this.workCalendar.getWorkScheduleList();
  }

  openWorkGroupDrawer() {
    this.workGroupDrawerVisible = true;
  }

  closeWorkGroupDrawer() {
    this.workGroupDrawerVisible = false;
  }

  newWorkGroup(): void {
    this.openWorkGroupDrawer();

    setTimeout(() => {
      this.workGroupForm.newForm();
    },50);
  }

  modifyWorkGroup(workGroup: any): void {
    this.openWorkGroupDrawer();

    setTimeout(() => {
      this.workGroupForm.getWorkGroup(workGroup.id);
    },50);
  }

  newSchedule(): void {
    this.openScheduleDrawer();

    const today: Date = new Date();
    const from: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), 0);
    const to: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours() + 1, 0);
    this.newScheduleArgs = {workGroupId: this.selectedWorkGroupId, start: from, end: to};
    this.selectedScheduleId = -1;
  }

  newScheduleByDateSelect(param: NewDateSelectedArgs) {
    console.log('newScheduleByDateSelect: start');
    if (param.workGroupId === -1) {
      alert('작업그룹을 선택해주세요.');
      return;
    }

    this.navigator.date = new DayPilot.Date(param.start,true);
    this.newScheduleArgs = {workGroupId: this.selectedWorkGroupId, start: param.start, end: param.end};
    this.selectedScheduleId = -1;

    this.openScheduleDrawer();
    console.log('newScheduleByDateSelect: end');
  }

  editSchedule(id: any) {
    this.selectedScheduleId = id;
    this.newScheduleArgs = undefined;

    this.openScheduleDrawer();
  }

  workGroupSelect(ids: any): void {
    this.selectedWorkGroupId = ids;
    this.getScheduleList();
  }

  eventDateChanged(event: any) {
    this.eventData = event;
  }

  calendarVisibleRangeChanged(args: any) {
    if (this.mode === 'Month') {
      this.navigator.date = new DayPilot.Date(args.date, true);
    } else {
      this.navigator.date = new DayPilot.Date(args.start, true);
    }
  }

  modeChanged(args: ModeChangedArgs): void {
    this.mode = args.mode;
  }

  navigatorSelectChanged(args: any) {
    this.workCalendar.calendarSetDate(new DayPilot.Date(args.start,true));
  }

}
