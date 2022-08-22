import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { BoardService } from './board.service';
import { ResponseList } from '../../../core/model/response-list';
import { BoardHierarchy } from './board-hierarchy.model';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';


@Component({
  selector: 'app-board-tree',
  template: `
    <nz-tree
      #treeCom
      [nzData]="boardItems"
      [nzSearchValue]="searchValue"
      (nzClick)="nzClick($event)"
      (nzDblClick)="nzDbClick($event)">
  </nz-tree>
  `,
  styles: ['']
})
export class BoardTreeComponent implements OnInit {

  @ViewChild('treeCom', {static: false}) treeCom: any;

  boardItems: BoardHierarchy[] = [];

  @Input() searchValue = '';
  @Output() itemSelected = new EventEmitter();
  @Output() itemDbClicked = new EventEmitter();

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    console.log('BoardTreeComponent init');
  }

  public getboardHierarchy(): void {
    this.boardService
      .getBoardHierarchy()
      .subscribe(
        (model: ResponseList<BoardHierarchy>) => {
            if ( model.total > 0 ) {
              this.boardItems = model.data;
            } else {
              this.boardItems = [];
            }

            // title 노드 텍스트
            // key   데이터 키
            // isLeaf 마지막 노드 여부
            // checked 체크 여부
        }
      );
  }

  nzClick(event: NzFormatEmitEvent): void {
    const node = event.node?.origin;
    this.itemSelected.emit(node);
  }

  public nzDbClick(event: NzFormatEmitEvent): void {
    const node = event.node?.origin;
    this.itemDbClicked.emit(node);
  }

}
