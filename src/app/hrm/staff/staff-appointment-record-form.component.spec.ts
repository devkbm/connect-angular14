import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAppointmentRecordFormComponent } from './staff-appointment-record-form.component';

describe('StaffAppointmentRecordFormComponent', () => {
  let component: StaffAppointmentRecordFormComponent;
  let fixture: ComponentFixture<StaffAppointmentRecordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAppointmentRecordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAppointmentRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
