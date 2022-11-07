import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { StaffRegistFormComponent } from './staff-regist-form.component';
import { StaffGridComponent } from './staff-grid.component';
import { StaffAppointmentRecordGridComponent } from './staff-appointment-record/staff-appointment-record-grid.component';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent extends AppBase implements OnInit {

  @ViewChild(StaffGridComponent) gridStaff!: StaffGridComponent;
  @ViewChild(StaffRegistFormComponent) formStaff!: StaffRegistFormComponent;
  @ViewChild(StaffAppointmentRecordGridComponent) gridAppointment!: StaffAppointmentRecordGridComponent;

  selectedStaff?: {staffId: string, staffNo: string, staffName: string};

  drawerNewStaff: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerAppointment: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerDutyResponsibility: { visible: boolean, initLoadId: any } = {
    visible: false,
    initLoadId: null
  }

  drawerContact: { visible: boolean, initLoadId: any } = {
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
    this.formStaff.get(params.staffId);
  }

  selectGridStaff() {
    this.drawerNewStaff.visible = false;

    this.gridStaff.getList();
  }

  newStaff() {
    this.drawerNewStaff.visible = true;
  }

  newAppoint() {
    this.drawerAppointment.visible = true;
  }

  newDutyResponsibility() {
    this.drawerDutyResponsibility.visible = true;
  }

  newContact() {
    this.drawerContact.visible = true;
  }

  selectGridAppointment() {
    this.drawerAppointment.visible = false;

    this.gridAppointment.getList(this.selectedStaff?.staffId!);
  }
}
