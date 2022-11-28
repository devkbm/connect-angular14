import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RoadAddress, RoadAddressJuso, RoadAddressResult } from './road-address.model';
import { RoadAddressService } from './road-address.service';

@Component({
  selector: 'app-nz-list-road-address',
  template: `
    <ng-template #suffixIconButton>
      <button nz-button nzType="primary" nzSearch on-click="search()"><span nz-icon nzType="search"></span></button>
    </ng-template>
    <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
      <input [(ngModel)]="searchText" (keyup.enter)="search()" type="text" nz-input placeholder="input search text"/>
    </nz-input-group>

    <nz-pagination [nzPageIndex]="_page?.index" [nzTotal]="_page?.total" (nzPageIndexChange)="changePageIndex($event)"></nz-pagination>
    <nz-list [nzLoading]="_isLoading">
      <nz-list-item *ngFor="let item of _data?.juso" (click)="choice(item)">
        <span nz-typography> {{ item.roadAddr }} </span>
        {{ item.zipNo }}
      </nz-list-item>
    </nz-list>

  `,
  styles: [`
    span:hover {
      text-decoration: underline;
    }
  `]
})
export class NzListRoadAddressComponent implements OnInit {

  @Input() searchText: string = '';
  @Output() itemClicked: EventEmitter<{roadAddress: string, zipNo: string}> = new EventEmitter<{roadAddress: string, zipNo: string}>();

  protected _isLoading: boolean = false;
  protected _data?: RoadAddress;
  protected _page?: {index: number, total: number};

  constructor(
    private service: RoadAddressService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }

  choice(item: RoadAddressJuso) {
    this.itemClicked.emit({roadAddress: item.roadAddr, zipNo: item.zipNo});
  }

  changePageIndex(page: number) {
    if (this._page) {
      this._page.index = page;
    } else {
      this._page = {index: page, total: 0};
    }
    this.search();
  }

  search() {
    let currentPage: number = this._page?.index ?? 1;
    this.getList(this.searchText, currentPage);
  }

  getList(keyword: string, currentPage: number) {
    if (!keyword) {
      this.message.create('warning', `검색어를 입력해주세요.`);
      return;
    }

    this._isLoading = true;
    this.service
        .get(keyword, currentPage)
        .subscribe(
          (model: RoadAddressResult) => {
            this._data = model.results;
            this._page = {index: this._data.common.currentPage, total: parseInt(this._data.common.totalCount)};
            this._isLoading = false;
          }
        );
  }

}
