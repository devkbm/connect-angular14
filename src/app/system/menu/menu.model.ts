export interface Menu {
  createdDt: Date;
  createdBy: string;
  modifiedDt: Date;
  modifiedBy: string;
  menuGroupId: string;
  menuId: string;
  menuName: string;
  menuType: string;
  parentMenuId: string;
  sequence: number;
  level: number;
  resource: string;
}
