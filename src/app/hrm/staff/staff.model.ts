export interface Staff {
  staffId: string;
  staffNo: string;
  name: string;
  nameEng: string;
  nameChi: string;
  residentRegistrationNumber: string;
  gender: string;
  birthday: Date;
  workCondition: string;
  imagePath: string;
  deptHistory?: any;
  jobHistory?: any;
  deptChangeHistory?: any;
  jobChangeHistory?: any;
  statusChangeHistory?: any;
}

/*
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
*/