import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArticleGridComponent } from './article-grid.component';
import { BoardFormComponent } from './board-form.component';
import { BoardTreeComponent } from './board-tree.component';
import { ArticleFormComponent } from './article-form.component';
import { Article } from './article.model';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface TabArticle {
  tabName: string;
  articleId: number;
  article: Article;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @ViewChild('boardTree', {static: true}) boardTree!: BoardTreeComponent;
  @ViewChild('boardForm', {static: false}) boardForm!: BoardFormComponent;
  @ViewChild('articleGrid', {static: true}) articleGrid!: ArticleGridComponent;
  @ViewChild('articleForm', {static: false}) articleForm!: ArticleFormComponent;

  boardDrawerVisible = false;
  articleDrawerVisible = false;
  articleViewDrawerVisible = false;

  selectedBoardId: any;
  selectedArticleId: any;
  selectedArticle!: Article;

  tabIndex: number = 0;
  tabs: TabArticle[] = [];

  /**
   * 게시판 트리 조회 Filter 조건
   */
  queryValue: any;
  tabTitle: any;

  constructor(private message: NzMessageService,
              public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getBoardTree();
  }

  setBoardSelect(item: any): void {
    this.tabTitle = item.title;
    this.selectedBoardId = item.key;
    this.getArticleGridData();
  }

  getArticleGridData(): void {
    this.closeArticleDrawer();
    this.articleGrid.getArticleList(this.selectedBoardId);
  }

  newBoard(): void {
    this.selectedBoardId = null;
    this.openBoardDrawer();
  }

  modifyBoard(item: any): void {
    this.openBoardDrawer();
  }

  getBoardTree(): void {
    this.closeBoardDrawer();
    this.boardTree.getboardHierarchy();
  }

  newArticle(): void {
    if (this.selectedBoardId === null || this.selectedBoardId === undefined)  {
      this.message.create('error', '게시판을 선택해주세요.');
      return;
    }

    /*
    const componentRef = this.viewContainerRef.createComponent(ArticleFormComponent);
    this.tabs.push(componentRef);
    */

    this.selectedArticleId = null;
    this.openArticleDrawer();
  }

  selectArticle(item: any) {
    this.selectedArticle = item;
    this.selectedArticleId = item.articleId;
  }

  editArticle(): void {
    this.selectedArticleId = this.articleGrid.getSelectedRows()[0]?.articleId;
    if (this.selectedArticleId === null || this.selectedArticleId === undefined) {
      this.message.create('error', '게시글을 선택해주세요.');
      return;
    }

    this.openArticleDrawer();
  }

  showArticleView(): void {
    this.openArticleViewDrawer();
  }

  addTabArticleView(): void {

    const newTab: TabArticle = {
      tabName: this.selectedArticle.articleId.toString(),
      articleId: this.selectedArticle.articleId,
      article: this.selectedArticle
    };

    let tabIndex = null;
    for (const index in this.tabs) {
      if (this.tabs[index].articleId === this.selectedArticle.articleId) {
        tabIndex = index;
      }
    }

    if (tabIndex === null) {
      this.tabs.push(newTab);
      this.tabIndex = this.tabs.length;
    } else {
      this.tabIndex = parseInt(tabIndex,10) + 1;
    }

  }

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index+1, 1);
  }

  print(item: any): void {
    console.log(item);
  }

  openBoardDrawer(): void {
    this.boardDrawerVisible = true;
  }

  closeBoardDrawer(): void {
    this.boardDrawerVisible = false;
  }

  openArticleDrawer(): void {
    this.articleDrawerVisible = true;
  }

  closeArticleDrawer(): void {
    this.articleDrawerVisible = false;
  }

  openArticleViewDrawer(): void {
    this.articleViewDrawerVisible = true;
  }

  closeArticleViewDrawer(): void {
    this.articleViewDrawerVisible = false;
  }
}
