import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { StaffRegistFormComponent } from './staff-regist-form.component';

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent extends AppBase implements OnInit {

  @ViewChild(StaffRegistFormComponent) staffForm!: StaffRegistFormComponent;
  

  staff?: {staffId: string, staffNo: string, staffName: string};

  staffId?: string;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  staffGridRowClicked(params: any) {
    this.staff = {staffId: params.staffId, staffNo: params.staffNo, staffName: params.name};
    this.staffId = params.staffId;
    this.staffForm.getForm(params.staffId);
  }
}
