export interface User {
  userId: string;
  organizationCode: string;
  staffNo: string;
  password: string;
  name: string;
  deptCode: string;
  mobileNum: string;
  email: string;
  imageBase64: string;
  enabled: boolean;
  authorityList: string[];
  menuGroupList: string[];
}
