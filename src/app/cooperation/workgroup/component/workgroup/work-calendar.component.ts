import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ResponseList } from '../../../../core/model/response-list';
import { WorkGroupService } from '../../service/workgroup.service';
import { WorkGroupSchedule } from '../../model/workgroup-schedule.model';
import { DaypilotCalendarComponent, ModeChangedArgs } from 'src/app/shared/calendar/daypilot-calendar.component';
import { DayPilot } from '@daypilot/daypilot-lite-angular';

export interface NewDateSelectedArgs {
  workGroupId: number;
  start: Date;
  end: Date;
}

@Component({
selector: 'app-work-calendar',
templateUrl: './work-calendar.component.html',
styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements AfterViewInit {

  @ViewChild(DaypilotCalendarComponent) calendar!: DaypilotCalendarComponent;
  @Input() fkWorkGroup: number = 0;
  @Output() itemSelected = new EventEmitter();
  @Output() newDateSelected: EventEmitter<NewDateSelectedArgs> = new EventEmitter<NewDateSelectedArgs>();
  @Output() eventDataChanged = new EventEmitter();
  @Output() visibleRangeChanged: EventEmitter<{start: Date, end: Date, date: Date}> = new EventEmitter<{start: Date, end: Date, date: Date}>();
  @Output() modeChanged: EventEmitter<ModeChangedArgs> = new EventEmitter<ModeChangedArgs>();

  from!: string;
  to!: string;
  eventData: any[] = [];
  mode?: ModeChangedArgs;

  constructor(private workGroupService: WorkGroupService,
              private datePipe: DatePipe) {
  }

  ngAfterViewInit(): void {
    this.from = this.datePipe.transform(this.calendar.start.toDateLocal(),'yyyyMMdd') ?? '';
    this.to = this.datePipe.transform(this.calendar.end.toDateLocal(),'yyyyMMdd') ?? '';
  }

  rangeChanged(e: any): void {
    this.visibleRangeChanged.emit({start: e.start, end: e.end, date: e.date});
    this.from = this.datePipe.transform(e.start,'yyyyMMdd') ?? '';
    this.to = this.datePipe.transform(e.end,'yyyyMMdd') ?? '';

    this.getWorkScheduleList();
  }

  getWorkScheduleList(): void {
    const workGroupId: string = this.fkWorkGroup.toString();

    if (workGroupId === "" || workGroupId === null || workGroupId === undefined) {
      this.eventData = [];
      return;
    }
    const param = {
      fkWorkGroup : this.fkWorkGroup,
      fromDate: this.from,
      toDate: this.to
    };

    this.workGroupService
        .getWorkScheduleList(param)
        .subscribe(
            (model: ResponseList<WorkGroupSchedule>) => {
              let data: any[] = [];
              model.data.forEach(e => data.push({
                id: e.id,
                text: e.text,
                start: e.start,
                end: e.end,
                barColor: e.color
              }));
              this.eventData = data;
              this.eventDataChanged.emit(this.eventData);
            }
        );
  }

  eventClicked(param: any): void {
    this.itemSelected.emit(param.id);
  }

  onDateClick(args: any): void {
    console.log('onDateClick: start');
    const eventArgs: NewDateSelectedArgs = {workGroupId: this.fkWorkGroup, start: args.start, end: args.end};
    this.newDateSelected.emit(eventArgs);
    console.log('onDateClick: end');
  }

  calendarModeChanged(args: ModeChangedArgs): void {
    this.mode = args;
    this.modeChanged.emit(this.mode);
  }

  calendarSetDate(date: DayPilot.Date) {
    this.calendar.setDate(date);
  }
}
