import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { AppBase } from '../../core/app/app-base';
import { HolidayGridComponent } from './holiday-grid.component';
import { HolidayService } from './holiday.service';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';
import { Holiday } from './holiday.model';
import { ResponseObject } from 'src/app/core/model/response-object';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent extends AppBase implements OnInit {

  @ViewChild('holidayGrid') grid!: HolidayGridComponent;  
    
  query: { key: string, value: string, list: {label: string, value: string}[], year: Date } = {
    key: 'resourceCode',
    value: '',
    list: [
      {label: '휴일명', value: 'resourceCode'},
      {label: '비고', value: 'description'}      
    ],
    year: new Date()
  }  

  holiday: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  constructor(location: Location,
              private service: HolidayService,
              private appAlarmService: AppAlarmService,
              private datePipe: DatePipe) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.holiday.drawerVisible = true;
  }

  closeDrawer(): void {
    this.holiday.drawerVisible = false;
  }

  getHolidayList(): void {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }

    const date: Date = this.query.year;    

    this.closeDrawer();
    this.grid.getGridList(date.getFullYear()+'0101', date.getFullYear()+'1231');
  }

  newHoliday(): void {
    this.holiday.selectedRowId = null;
    this.openDrawer();    
  }
  
  deleteHoliday(): void {    
    const date = this.grid.getSelectedRows()[0].date;    
    this.delete(date);
  }

  delete(date: Date): void {
    const id = this.datePipe.transform(date, 'yyyyMMdd') as string;
    if (id === null) return;

    this.service
        .deleteHoliday(id)
        .subscribe(
          (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);            
            this.getHolidayList();
          }
        );
  }

  holidayGridRowClicked(item: any): void {
    this.holiday.selectedRowId = item.date;
  }

  edit(item: any): void {
    this.holiday.selectedRowId = item.date;
    this.openDrawer();        
  }
}
