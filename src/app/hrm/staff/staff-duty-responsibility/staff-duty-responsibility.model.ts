export interface StaffDutyResponsibility {
  staffId: string;
  staffNo: string;
  staffName: string;
  seq: number;
  dutyResponsibilityCode: string;
  dutyResponsibilityName: string;
  fromDate: Date;
  toDate: Date;
  isPayApply: boolean;
}
