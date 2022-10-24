import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { StaffRegistFormComponent } from './staff-regist-form.component';
import { StaffGridComponent } from './staff-grid.component';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent extends AppBase implements OnInit {

  @ViewChild(StaffRegistFormComponent) staffForm!: StaffRegistFormComponent;
  @ViewChild(StaffGridComponent) grid!: StaffGridComponent;
  

  selectedStaff?: {staffId: string, staffNo: string, staffName: string};  

  staffDrawer: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  appointmentDrawer: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null    
  }  

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  staffGridRowClicked(params: any) {
    this.selectedStaff = {staffId: params.staffId, staffNo: params.staffNo, staffName: params.name};    
    this.staffForm.get(params.staffId);
  }

  selectStaffGrid() {
    this.staffDrawer.visible = false;

    this.grid.getList();
  }

  newStaff() {
    this.staffDrawer.visible = true;
  }

  newAppoint() {
    this.appointmentDrawer.visible = true;
  }
}
