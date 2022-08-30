import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MenuGroupFormComponent } from './menu-group-form.component';
import { MenuGroupGridComponent } from './menu-group-grid.component';
import { MenuGridComponent } from './menu-grid.component';
import { MenuFormComponent } from './menu-form.component';
import { AppBase } from '../../core/app/app-base';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends AppBase implements OnInit {

  @ViewChild(MenuGroupGridComponent, {static: true})
  menuGroupGrid!: MenuGroupGridComponent;

  @ViewChild(MenuGroupFormComponent, {static: false})
  menuGroupForm!: MenuGroupFormComponent;

  @ViewChild(MenuGridComponent, {static: true})
  menuGrid!: MenuGridComponent;

  @ViewChild(MenuFormComponent, {static: false})
  menuForm!: MenuFormComponent;

  queryOptionList1 = [
    {label: '메뉴그룹ID', value: 'menuGroupId'},
    {label: '메뉴그룹명', value: 'menuGroupName'}
  ];
  queryKey1: string = 'menuGroupId';
  queryValue1: string = '';

  queryOptionList2 = [
    {label: '메뉴ID', value: 'menuId'},
    {label: '메뉴명', value: 'menuName'}
  ];
  queryKey2: string = 'menuId';
  queryValue2: string = '';


  menuGroupFormVisible = false;
  menuFormVisible = false;
  selectedMenuGroupId: any;
  selectedMenuId: any;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  newMenuGroupForm(): void {
    this.selectedMenuGroupId = null;

    this.menuGroupFormVisible = true;
  }

  menuGroupFormOpen(item: any): void {
    this.menuGroupFormVisible = true;
  }

  menuGroupFormClose(): void {
    this.menuGroupFormVisible = false;
  }

  newMenu(): void {
    this.selectedMenuId = null;
    this.menuFormVisible = true;
  }

  menuFormOpen(item: any): void {
    this.menuFormVisible = true;
  }

  menuFormClose(): void {
    this.menuFormVisible = false;
  }

  getMenuGroupList(): void {
    let params: any = new Object();
    if ( this.queryValue1 !== '') {
      params[this.queryKey1] = this.queryValue1;
    }

    this.menuGroupFormClose();
    this.menuGrid.clearData();
    this.menuGroupGrid.getMenuGroupList(params);
  }

  getMenuList(): void {
    let params: any = new Object();
    params['menuGroupId'] = this.selectedMenuGroupId;

    if ( this.queryValue2 !== '') {
      params[this.queryKey2] = this.queryValue2;
    }

    this.menuFormClose();
    this.menuGrid.getMenuList(params);
  }

  selectMenuGroup(row: any): void {
    this.selectedMenuGroupId = row.menuGroupId;
    this.getMenuList();
  }

  selectMenu(row: any): void {
    this.selectedMenuId = row.menuId;
  }

}
