import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { AppBase } from '../../core/app/app-base';
import { HolidayGridComponent } from './holiday-grid.component';
import { HolidayFormComponent } from './holiday-form.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent extends AppBase implements OnInit {

  @ViewChild('holidayGrid', {static: false})
  grid!: HolidayGridComponent;

  @ViewChild('holidayForm', {static: false})
  form!: HolidayFormComponent;  
    
  query: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'resourceCode',
    value: '',
    list: [
      {label: '휴일명', value: 'resourceCode'},
      {label: '비고', value: 'description'}
    ]
  }  

  holiday: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  constructor(location: Location) {
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

    this.closeDrawer();
    this.grid.getGridList();
  }

  initForm(): void {
    this.openDrawer();

    setTimeout(() => {
      this.form.newForm(this.holiday.selectedRowId);
    },10);
  }

  saveProgram(): void {
    this.form.submit();
  }

  deleteEntity(): void {
    //console.log(this.grid.getSelectedRows()[0].date);
    //this.deleteform.deleteEntity(this.grid.getSelectedRows()[0].date);
  }

  holidayGridRowClicked(item: any): void {
    this.holiday.selectedRowId = item.date;
  }

  editDrawerOpen(item: any): void {
    this.openDrawer();
    const date: Date = item.date;

    setTimeout(() => {
      this.form.get(date);
    },10);
  }
}
