import { LedgerChangeInfo } from './ledger-change-info';

export class LedgerList {
  constructor(
    public listId: string,
    public sequence: number,
    public empId: string,
    public appointmentCode: string,
    public appointmentFromDate: Date,
    public appointmentToDate: Date,
    public changeInfoList: LedgerChangeInfo[],

    public ledgerId: string) {}
}
