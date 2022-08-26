import { Injectable } from '@angular/core';

export interface MenuBreadCrumb {
  name: string;
  isLink: boolean;
  url?: string;
}

@Injectable()
export class SessionManager {

  constructor() { }

  static getOrganizationCode(): string | null {
    return sessionStorage.getItem('organizationCode');
  }

  static getMenuList(): any {
    return JSON.parse(sessionStorage.getItem('menuList') as string);
  }

  /**
   * Menu BreadCrumb 데이터 생성
   * @returns
   */
  static createBreadCrumb(): MenuBreadCrumb[] {
    /*
    let convertMenuBread = (obj: any, level: number): MenuBread => {
      return {
        name: obj.title as string,
        isLink: obj.menuType === 'ITEM' ? true : false,
        url: obj.url as string,
      };
    }

    let convertMenuChildren = (children: any[], level: number): MenuBread[] => {
      let item: MenuBread[] = new Array();
      for (const child of children) {
        item.push(convertMenuBread(child, level));
      }
      return item;
    }
    */
    const obj = JSON.parse(sessionStorage.getItem('menuList') as string);
    const isFindChild: Boolean = false;

    let names: MenuBreadCrumb[] = new Array();
    // 현재 화면에 해당하는 메뉴 탐색
    let find = (children: any[], isFindChild: Boolean): boolean => {
      console.log(isFindChild);
      for (const child of children) {
        names.push({name: child.title, isLink: child.menuType === 'ITEM' ? true : false, url: child.url});
        //console.log(names);
        if (child.leaf) {
          if (window.location.pathname === '/' + child.url) {
            isFindChild = true;
            return true;
          } else {
            names.pop();  // Leaf 노드중 일치하지 않은 메뉴 제거
          }
        } else if (child.children) {
          // 수정해야 함
          let d:boolean = find(child.children, isFindChild);
          console.log(child.children);
          //console.log(isFindChild);
          if (isFindChild === false && d === false) { // 하위메뉴중 일치하는 화면이 없으면 제거
            console.log(names.pop());
          }
        }
      }
      return false;
    }
    find(obj, isFindChild);

    return names;
  }

}
