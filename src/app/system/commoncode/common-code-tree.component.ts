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

  @Input() searchValue = '';
  @Output() itemSelected = new EventEmitter();

  nodeItems: CommonCodeHierarchy[] = [];

  constructor(private service: CommonCodeService) { }

  ngOnInit(): void {    
  }

  getCommonCodeHierarchy(systemTypeCode: string) {
    const params = {
      systemTypeCode: systemTypeCode
    };

    this.service
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

  nzClick(event: NzFormatEmitEvent) {
    const node = event.node?.origin;
    this.itemSelected.emit(node);
  }

}
