import { MenuGroup } from '../menu/menu-group.model';
import { Authority } from '../authority/authority.model';

export class UserToken {
  constructor(
    public token: string,
    public organizationCode: string,
    public imageUrl: string,
    public authorities: Authority[],
    public menuGroupList: MenuGroup[]) {}
}
