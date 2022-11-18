export interface StaffAppointmentRecord {
  staffId: string;
  seq: string;
  appointmentDate: Date;
  appointmentEndDate: Date;
  recordName: string;
  comment: string;
  isCompleted: boolean;
  blngDeptCode: string;
  workDeptCode: string;
  jobGroupCode: string;
  jobPositionCode: string;
  occupationCode: string;
  jobGradeCode: string;
  payStepCode: string;
  jobCode: string;
  dutyResponsibilityCode: string;
}
