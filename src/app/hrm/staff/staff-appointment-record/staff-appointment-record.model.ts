export interface StaffAppointmentRecord {
  staffId: string;
  id: string;
  appointmentDate: Date;
  appointmentEndDate: Date;
  recordName: string;
  comment: string;
  processWatingYn: string;
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
