export class Dept {
  constructor(
    public parentDeptCode: string,
    public deptCode: string,
    public deptNameKorean: string,
    public deptAbbreviationKorean: string,
    public deptNameEnglish: string,
    public deptAbbreviationEnglish: string,
    public fromDate: Date,
    public toDate: Date,
    public seq: number,
    public comment: string) {}
}
