export class PayItem {
  constructor(
    public code: string,
    public codeName: string,
    public type: string,
    public seq: number,
    public comment: string,
    public usePayTable: boolean) {}
}
