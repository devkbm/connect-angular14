export class AppointmentCode {
  constructor(
    public code: string,
    public codeName: string,
    public sequence: number,
    public useYn: boolean,
    public endDateYn: boolean,
    public comment: string) {}
}

