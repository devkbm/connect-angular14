import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';
import { AppBase } from '../../core/app/app-base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AppBase implements OnInit {

  @ViewChild(MenuGroupGridComponent) menuGroupGrid!: MenuGroupGridComponent;  
  @ViewChild(MenuGridComponent) menuGrid!: MenuGridComponent;

  queryMenuGroup: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'menuGroupId',
    value: '',
    list: [
      {label: '메뉴그룹ID', value: 'menuGroupId'},
      {label: '메뉴그룹명', value: 'menuGroupName'}
    ]
  }

  queryMenu: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'menuId',
    value: '',
    list: [
      {label: '메뉴ID', value: 'menuId'},
      {label: '메뉴명', value: 'menuName'}
    ]
  }

  menuGroup: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  menu: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  //#region 메뉴그룹
  getMenuGroupList(): void {
    let params: any = new Object();
    if ( this.queryMenuGroup.value !== '') {
      params[this.queryMenuGroup.key] = this.queryMenuGroup.value;
    }

    this.menuGroup.drawerVisible = false;
    this.menuGrid.clearData();
    this.menuGroupGrid.getMenuGroupList(params);
  }

  newMenuGroup(): void {
    this.menuGroup.selectedRowId = null;
    this.menuGroup.drawerVisible = true;
  }  

  editMenuGroup(item: any) {
    this.menuGroup.selectedRowId = item.menuGroupId;
    this.menuGroup.drawerVisible = true;
  }

  menuGroupGridRowClicked(row: any): void {
    this.menuGroup.selectedRowId = row.menuGroupId;
    this.getMenuList();
  }

  //#endregion 메뉴그룹
  
  //#region 메뉴
  getMenuList(): void {
    let params: any = new Object();
    params['menuGroupId'] = this.menuGroup.selectedRowId;

    if ( this.queryMenu.value !== '') {
      params[this.queryMenu.key] = this.queryMenu.value;
    }

    this.menu.drawerVisible = false;
    this.menuGrid.getMenuList(params);
  }

  newMenu(): void {
    this.menu.selectedRowId = null;
    this.menu.drawerVisible = true;
  }
  
  editMenu(item: any) {
    this.menu.selectedRowId = item.menuId;
    this.menu.drawerVisible = true;
  }  

  menuGridRowClicked(row: any): void {    
    this.menu.selectedRowId = row.menuId;
  }
  //#endregion 메뉴

}
