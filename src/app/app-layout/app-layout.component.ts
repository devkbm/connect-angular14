import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzFormatEmitEvent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { NzModalService } from 'ng-zorro-antd/modal';
import { AppAlarmService } from '../core/service/app-alarm.service';
import { MenuService } from '../common/menu/menu.service';

import { MenuHierarchy } from '../common/menu/menu-hierarchy.model';
import { ResponseList } from '../core/model/response-list';
import { UserSessionService } from '../core/service/user-session.service';
import { UserPopupComponent } from '../common/user/user-popup.component';
import { SelectControlModel } from '../core/model/select-control.model.ts';


@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit  {

  isCollapsed = false;
  triggerTemplate: TemplateRef<void> | null = null;
  selectedValue: string = '';
  message: string = '';
  menuGroupCode: string = '';
  avartarImgSrc = '';

  menuGroupList: SelectControlModel[] = [];
  menuItems: MenuHierarchy[] = [];

  @ViewChild('treeCom', {static: false}) treeCom: any;

  constructor(private appAlarmService: AppAlarmService,
              private sessionService: UserSessionService,
              private menuService: MenuService,
              private modalService: NzModalService,
              private viewContainerRef: ViewContainerRef,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.appAlarmService.currentMessage.subscribe(message => this.message = message);

    this.setInitMenuGroup();
    this.setAvatar();
  }

  /**
   * 초기 메뉴 그룹을 설정한다.
   */
  private setInitMenuGroup(): void {
    const stringMenuGroupList = sessionStorage.getItem('menuGroupList') as string;
    const selectedMenuGroup   = sessionStorage.getItem('selectedMenuGroup') as string;

    this.menuGroupList = JSON.parse(stringMenuGroupList);

    if ( selectedMenuGroup != null ) {
      this.selectedValue = selectedMenuGroup;
    } else {
      this.selectedValue = this.menuGroupList[0].value;
    }

    if (this.selectedValue != null) {
      this.selectMenuGroup(this.selectedValue);
    }
  }

  sendMen(mess: any): void {
    this.menuGroupCode = mess;
  }

  selectMenuGroup(value: string): void {

    sessionStorage.setItem('selectedMenuGroup', value);

    this.menuService
      .getMenuHierarchy(value)
      .subscribe(
        (model: ResponseList<MenuHierarchy>) => {
          if ( model.total > 0 ) {
            this.menuItems = model.data;
          } else {
            this.menuItems = [];
          }
          const seledtedMenu = sessionStorage.getItem('selectedMenu');
          console.log(seledtedMenu);
          this.selectMenuItem(seledtedMenu as string);
        }
      );
  }

  selectMenu(event: NzFormatEmitEvent): void {

    console.log(event.node?.origin);
    const node = event.node?.origin as NzTreeNodeOptions;
    sessionStorage.setItem('selectedMenu', node.key);
    this.router.navigate([node['url']]);
  }

  selectMenuItem(url: string): void {
    sessionStorage.setItem('selectedMenu', url);
    // '/home/' +
    this.router.navigate([url]);
  }

  public setAvatar(): void {
    // this.userImageBase64 = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    // const url = sessionStorage.getItem('imageUrl');
    // this.userImageBase64 = `http://localhost:8090/static/${url}`;
    this.avartarImgSrc = this.sessionService.getAvartarImageString();
  }

  public imageClick(args: any): void {
    const modal = this.modalService.create({
      nzTitle: '',
      nzContent: UserPopupComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzKeyboard: true,
      nzWidth: 400,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });

    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));
  }

}
