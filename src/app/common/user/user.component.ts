import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UserGridComponent } from './user-grid.component';
import { UserFormComponent } from './user-form.component';
import { AppBase } from '../../core/app/app-base';
import { UserService } from './user.service';
import { ResponseList } from '../../core/model/response-list';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AppBase implements OnInit {

  drawerVisible = false;
  drawerWidth = '720px';

  queryKey = 'userId';
  queryValue = '';

  @ViewChild('userGrid', {static: false})
  grid!: UserGridComponent;

  @ViewChild('userForm', {static: false})
  form!: UserFormComponent;

  @ViewChild('deleteForm', {static: false})
  deleteForm!: UserFormComponent;

  constructor(location: Location,private userService: UserService) {
    super(location);
  }

  ngOnInit() {
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  editDrawOpen(item: any) {
    this.openDrawer();

    setTimeout(() => {
      this.form.getUser(item.userId);
    },10);

    this.drawerWidth = window.innerWidth * 0.5 + 'px';
    console.log('window.innerWidth : ' + window.innerWidth);
    console.log('window.innerHeight : ' + window.innerHeight);
    console.log('this.drawerWidth : ' + this.drawerWidth)
  }

  getUserList() {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }
    //params.organizationCode = "001";

    this.closeDrawer();
    this.grid.getUserList(params);
  }

  saveUser() {
    this.form.registerUser();
  }

  deleteUser() {
    //this.form.deleteUser(this.grid.getSelectedRow().userId);
    this.deleteForm.deleteUser(this.grid.getSelectedRow().userId);
  }

  initForm() {

    this.openDrawer();

    setTimeout(() => {
      this.form.newForm();
    },10);

  }

  test() {
    window.location.href = 'http://localhost:8090/oauth2/authorization/google';
  }
}
