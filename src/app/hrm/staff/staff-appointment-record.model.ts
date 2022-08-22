export class StaffAppointmentRecord {
  constructor(
    public staffId: string,
    public id: string,
    public appointmentDate: Date,
    public appointmentEndDate: Date,
    public recordName: string,
    public comment: string,
    public processWatingYn: string = '',
    public blngDeptCode: string,
    public workDeptCode: string,
    public jobGroupCode: string,
    public jobPositionCode: string,
    public occupationCode: string,
    public jobGradeCode: string,
    public payStepCode: string,
    public jobCode: string,
    public dutyResponsibilityCode: string
  ) {}
}
