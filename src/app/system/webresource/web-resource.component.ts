import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WebResourceGridComponent } from './web-resource-grid.component';
import { WebResourceFormComponent } from './web-resource-form.component';
import { AppBase } from '../../core/app/app-base';
import { WebResourceService } from './web-resource.service';
import { ResponseObject } from 'src/app/core/model/response-object';
import { WebResource } from './web-resource';
import { ButtonTemplate } from 'src/app/shared/nz-buttons/nz-buttons.component';

@Component({
  selector: 'app-web-resource',
  templateUrl: './web-resource.component.html',
  styleUrls: ['./web-resource.component.css']
})
export class WebResourceComponent extends AppBase  implements OnInit {

  @ViewChild(WebResourceGridComponent, {static: false})
  grid!: WebResourceGridComponent;

  @ViewChild(WebResourceFormComponent, {static: false})
  form!: WebResourceFormComponent;

  queryKey = 'resourceCode';
  queryValue = '';
  queryOptionList = [
    {label: '리소스코드', value: 'resourceCode'},
    {label: '리소스명', value: 'resourceName'},
    {label: 'URL', value: 'url'},
    {label: '설명', value: 'description'}
  ];

  buttons: ButtonTemplate[] = [{
    text: '조회',
    nzType: 'search',
    click: (e: MouseEvent) => {
      this.getList();
    }
  },{
    text: '신규',
    nzType: 'form',
    click: (e: MouseEvent) => {
      this.initForm();
    }
  },{
    text: '삭제',
    nzType: 'delete',
    isDanger: true,
    popConfirm: {
      title: '삭제하시겠습니까?',
      confirmClick: () => {
        this.delete();
      }
    }
  }];

  drawerVisible = false;

  selectedId: any;

  constructor(location: Location,
              private programService: WebResourceService) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  editDrawerOpen(item: any): void {
    this.openDrawer();
  }

  getList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getList(params);
  }

  initForm(): void {
    this.selectedId = null;

    this.openDrawer();
  }

  save(): void {
    this.form.saveForm();
  }

  delete(): void {
    const id = this.grid.getSelectedRows()[0].resourceCode;

    this.programService
        .delete(id)
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.getList();
          }
        );
  }

  selectedItem(item: any): void {
    // console.log(item);
    this.selectedId = item.resourceCode;
  }

}
