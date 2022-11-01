import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { RoadAddress, RoadAddressResult } from './road-address.model';
import { RoadAddressService } from './road-address.service';

@Component({
  selector: 'app-nz-list-road-address',
  template: `
    <button (click)="cli()">조회</button>
    <nz-list>
      <nz-list-item *ngFor="let item of data?.juso">
        {{ item.roadAddr }}
      </nz-list-item>
    </nz-list>
  `,
  styles: []
})
export class NzListRoadAddressComponent implements OnInit {

  data?: RoadAddress;

  constructor(
    private service: RoadAddressService
  ) { }

  ngOnInit() {
    this.getList('은계중앙로',1);
  }

  cli() {
    this.getList('은계중앙로',1);
  }

  getList(keyword: string, currentPage: number) {
    this.service
        .get(keyword,1)
        .subscribe(
          (model: RoadAddressResult) => {
            this.data = model.results;
          }
        );
  }

}
