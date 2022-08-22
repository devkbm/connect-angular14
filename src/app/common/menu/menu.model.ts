export class Menu {
  constructor(
    public createdDt: Date,
    public createdBy: string,
    public modifiedDt: Date,
    public modifiedBy: string,
    public menuGroupId: string,
    public menuId: string,
    public menuName: string,
    public menuType: string,
    public parentMenuId: string,
    public sequence: number,
    public level: number,
    public resource: string) { }
}
