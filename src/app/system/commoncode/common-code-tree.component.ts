import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ResponseList } from '../../core/model/response-list';
import { CommonCodeHierarchy } from './common-code-hierarchy.model';

import { CommonCodeService } from './common-code.service';

import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-common-code-tree',
  template: `
    {{searchValue}}
    <nz-tree
        #treeComponent
        [nzData]="nodeItems"
        [nzSearchValue]="searchValue"
        (nzClick)="nzClick($event)">
    </nz-tree>
  `,
  styles: ['']
})
export class CommonCodeTreeComponent implements OnInit {

  @ViewChild('treeComponent', {static: false}) treeComponent: any;

  nodeItems: CommonCodeHierarchy[] = [];

  @Input()
  searchValue = '';

  @Output()
  itemSelected = new EventEmitter();

  constructor(private commonCodeService: CommonCodeService) { }

  ngOnInit(): void {
    console.log('CommonCodeTreeComponent init');
  }

  getCommonCodeHierarchy(systemTypeCode: string): void {
    const params = {
      systemTypeCode: systemTypeCode
    };

    this.commonCodeService
        .getCommonCodeHierarchy(params)
        .subscribe(
          (model: ResponseList<CommonCodeHierarchy>) => {
            if ( model.total > 0 ) {
                this.nodeItems = model.data;
            } else {
                this.nodeItems = [];
            }
          }
        );
  }

  nzClick(event: NzFormatEmitEvent): void {
    const node = event.node?.origin;
    this.itemSelected.emit(node);
  }

}
