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

  @ViewChild(WebResourceGridComponent) grid!: WebResourceGridComponent;

  query: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'resourceCode',
    value: '',
    list: [
      {label: '리소스코드', value: 'resourceCode'},
      {label: '리소스명', value: 'resourceName'},
      {label: 'URL', value: 'url'},
      {label: '설명', value: 'description'}
    ]
  }  

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
      this.newResource();
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

  resource: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }  

  constructor(location: Location,
              private service: WebResourceService) {
    super(location);
  }

  ngOnInit(): void {
  }  

  getList(): void {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }

    this.resource.drawerVisible = false;
    this.grid.getList(params);
  }

  newResource(): void {
    this.resource.selectedRowId = null;
    this.resource.drawerVisible = true;
  }

  editResource(item: any): void {
    this.resource.selectedRowId = item.resourceCode;
    this.resource.drawerVisible = true;
  }  

  delete(): void {
    const id = this.grid.getSelectedRows()[0].resourceCode;

    this.service
        .delete(id)
        .subscribe(
          (model: ResponseObject<WebResource>) => {
            this.getList();
          }
        );
  }

  resourceGridRowClicked(item: any): void {    
    this.resource.selectedRowId = item.resourceCode;
  }

}
