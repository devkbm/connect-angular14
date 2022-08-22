export class HrmType {
  constructor(
    public code: string,
    public codeName: string,
    public useYn: boolean,
    public sequence: number,
    public appointmentType: string,
    public comment: string) {}
}
