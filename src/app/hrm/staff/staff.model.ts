export class Staff {
  constructor(
    public staffId: string,
    public name: string,
    public nameEng: string = '',
    public nameChi: string = '',
    public residentRegistrationNumber: string,
    public gender: string = '',
    public birthday: Date,
    public workCondition: string,
    public imagePath: string,
    public deptHistory?: any, // DeptChangeHistory[];
    public jobHistory?: any, // JobChangeHistory[];
    public statusHistory?: any, // StatusChangeHistory[];
    public deptChangeHistory?: any,// DeptChangeHistory[];
    public jobChangeHistory?: any, //JobChangeHistory[];
    public statusChangeHistory?: any //StatusChangeHistory[];
  ) {}
}
