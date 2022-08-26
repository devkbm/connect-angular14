import { Injectable } from '@angular/core';

export interface MenuBreadCrumb {
  name: string;
  isLink: boolean;
  url?: string;
  marked?: boolean
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
    let names: MenuBreadCrumb[] = new Array();
    // 현재 화면에 해당하는 메뉴 탐색
    let find = (children: any[]): boolean => {
      for (const child of children) {
        names.push({name: child.title, isLink: child.menuType === 'ITEM' ? true : false, url: child.url, marked: false});
        if (child.leaf) {
          if (window.location.pathname === '/' + child.url) {
            names[names.length-1].marked = true;
            return true;
          } else {
            names.pop();  // Leaf 노드중 일치하지 않은 메뉴 제거
          }
        } else if (child.children) {
          find(child.children);
          if (names[names.length-1].marked !== true) { // Leaf 노드 중 marked 되지 않은 노드 제거
            names.pop();
          }
        }
      }
      return false;
    }
    find(obj);

    return names;
  }

}