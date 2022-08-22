export class LedgerChangeInfo {
  constructor(
    public id: number,
    public changeType: string,
    public changeTypeDetail: string,
    public changeCode: string,
    public sequence: number,

    public listId: string) {}
}
