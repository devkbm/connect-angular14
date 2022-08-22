import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRegistFormComponent } from './staff-regist-form.component';

describe('StaffRegistFormComponent', () => {
  let component: StaffRegistFormComponent;
  let fixture: ComponentFixture<StaffRegistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRegistFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRegistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
