import { AfterViewInit, Component, ContentChild, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AuthorityGridComponent } from './authority-grid.component';
import { AppBase } from '../../core/app/app-base';
import { ResponseObject } from '../../core/model/response-object';
import { AuthorityService } from './authority.service';
import { Authority } from './authority.model';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent extends AppBase implements AfterViewInit {

  @ViewChild(AuthorityGridComponent) grid!: AuthorityGridComponent;

  drawerVisible = false;

  queryKey = 'authority';
  queryValue = '';
  queryOptionList = [
    {label: '권한', value: 'authority'},
    {label: '설명', value: 'description'}
  ];

  selectedId: any;

  constructor(private location: Location,
              private service: AuthorityService) {
    super(location);
    this.appId = "COM002";
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  selectedItem(data: any): void {
    if (data) {
      this.selectedId = data.id;
    } else {
      this.selectedId = null;
    }
  }

  initForm(): void {
    this.selectedId = null;

    this.openDrawer();
  }

  editDrawOpen(item: any): void {
    this.openDrawer();
  }

  getAuthorityList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid?.getList(params);
  }

  deleteAuthority(): void {
    const id = this.grid.getSelectedRows()[0].authority;

    this.service
        .deleteAuthority(id)
        .subscribe(
          (model: ResponseObject<Authority>) => {
            this.getAuthorityList();
          }
        );
  }

}
