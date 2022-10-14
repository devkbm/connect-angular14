import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UserGridComponent } from './user-grid.component';
import { AppBase } from '../../core/app/app-base';
import { UserService } from './user.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { User } from './user.model';
import { ButtonTemplate } from 'src/app/shared/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AppBase implements OnInit {

  @ViewChild(UserGridComponent, {static: true})
  grid!: UserGridComponent;

  buttons: ButtonTemplate[] = [{
    text: '구글 로그인',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.test();
    }
  },{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getUserList();
    }
  },{
    text: '신규',
    nzType: 'form',
    click: (e: MouseEvent) => {
      this.newForm();
    }
  },{
    text: '삭제',
    nzType: 'delete',
    isDanger: true,
    popConfirm: {
      title: '삭제하시겠습니까?',
      confirmClick: () => {
        this.deleteUser();
      }
    }
  }];  

  query: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'userId',
    value: '',
    list: [
      {label: '아이디', value: 'userId'},
      {label: '성명', value: 'name'}
    ]
  }  

  user: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }  

  constructor(location: Location,private userService: UserService) {
    super(location);
  }

  ngOnInit() {
  }  

  newForm() {
    this.user.selectedRowId = null;
    this.user.drawerVisible = true;
    
  }

  editForm(item: any) {
    this.user.selectedRowId = item.userId;    
    this.user.drawerVisible = true;    
  }

  getUserList() {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }

    this.user.drawerVisible = false;
    this.grid.getUserList(params);
  }

  deleteUser() {
    const userId: string = this.grid.getSelectedRow().userId;
    this.userService
        .deleteUser(userId)
        .subscribe(
          (model: ResponseObject<User>) => {
            this.getUserList();
          }
        );
  }

  userGridSelected(params: any) {    
    this.user.selectedRowId = params.userId;
  }

  test() {
    window.location.href = 'http://localhost:8090/oauth2/authorization/google';
  }
}
