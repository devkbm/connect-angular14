export class CommonCode {
  constructor(
    public id: string,
    public systemTypeCode: string,
    public code: string,
    public codeName: string,
    public codeNameAbbreviation: string,
    public fromDate: Date,
    public toDate: Date,
    public seq: number,
    public hierarchyLevel: number,
    public fixedLengthYn: boolean,
    public codeLength: number,
    public cmt: string,
    public parentId: string) {}
}
