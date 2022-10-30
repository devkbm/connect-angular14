export interface StaffDutyResponsibility {
  staffId: string;
  seq: number;
  dutyResponsibilityCode: string;
  dutyResponsibilityName: string;
  fromDate: Date;
  toDate: Date;
  isPayApply: boolean;
}
