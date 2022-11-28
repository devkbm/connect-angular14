export class DutyApplication {
  constructor(
    public dutyId: number,
    public employeeId: string,
    public dutyCode: string,
    public dutyReason: string,
    public dutyStartDateTime: Date,
    public dutyEndDateTime: Date) {}
}

