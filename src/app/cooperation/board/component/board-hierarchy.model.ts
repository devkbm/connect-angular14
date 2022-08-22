export class BoardHierarchy {
  constructor(
    public createdDt: Date,
    public createdBy: string,
    public modifiedDt: Date,
    public modifiedBy: string,
    public pkBoard: string,
    public ppkBoard: string,
    public boardName: string,
    public boardDescription: string,
    public fromDate: Date,
    public toDate: Date,
    public articleCount: number,
    public sequence: number,
    public selected: boolean,
    public expanded: boolean,
    public isLeaf: boolean,
    public active: boolean,
    public children: BoardHierarchy[],
    public title: string,
    public key: string) {}
}
