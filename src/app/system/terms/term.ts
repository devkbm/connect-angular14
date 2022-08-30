export class Term {
  constructor(
    public createdDt: Date,
    public createdBy: string,
    public modifiedDt: Date,
    public modifiedBy: string,
    public pkTerm: string,
    public domain: string,
    public term: string,
    public nameKor: string,
    public abbreviationKor: string,
    public nameEng: string,
    public abbreviationEng: string,
    public description: string,
    public comment: string) {}
}
