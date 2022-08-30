export class User {
  constructor(
    public userId: string,
    public organizationCode: string,
    public staffNo: string,
    public password: string,
    public name: string,
    public deptCode: string,
    public mobileNum: string,
    public email: string,
    public imageBase64: string,
    public enabled: boolean,
    public authorityList: string[],
    public menuGroupList: string[]) {}
}
