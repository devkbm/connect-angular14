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

  @ViewChild('deleteForm', {static: true})
  deleteform!: HolidayFormComponent;

  drawerVisible = false;

  queryKey = 'resourceCode';
  queryValue = '';
  queryOptionList = [
    {label: '휴일명', value: 'resourceCode'},
    {label: '비고', value: 'description'}
  ];

  selectedRow: any;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getHolidayList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getGridList();
  }

  initForm(): void {
    this.openDrawer();

    setTimeout(() => {
      this.form.newForm(this.selectedRow.date);
    },10);
  }

  saveProgram(): void {
    this.form.submitEntity();
  }

  deleteEntity(): void {
    //console.log(this.grid.getSelectedRows()[0].date);
    this.deleteform.deleteEntity(this.grid.getSelectedRows()[0].date);
  }

  selectedItem(item: any): void {
    this.selectedRow = item;
  }

  editDrawerOpen(item: any): void {
    this.openDrawer();
    const date: Date = item.date;

    setTimeout(() => {
      this.form.getEntity(date);
    },10);
  }
}
