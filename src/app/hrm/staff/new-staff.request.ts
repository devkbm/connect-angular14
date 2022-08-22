export class NewStaff {
  constructor(
    public staffId: string,
    public name: string,
    public nameEng: string = '',
    public nameChi: string = '',
	  public residentRegistrationNumber: string) {}
}
