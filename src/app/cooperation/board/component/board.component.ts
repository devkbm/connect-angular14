import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ArticleGridComponent } from './article-grid.component';
import { BoardTreeComponent } from './board-tree.component';
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

  @ViewChild('boardTree') boardTree!: BoardTreeComponent;
  @ViewChild('articleGrid') articleGrid!: ArticleGridComponent;

  board: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  article: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  articleView: { drawerVisible: boolean, selectedRow: any} = {
    drawerVisible: false,
    selectedRow: null
  }

  tabIndex: number = 0;
  tabs: TabArticle[] = [];
  tabTitle: any;

  /**
   * 게시판 트리 조회 Filter 조건
   */
  queryValue: any;

  constructor(private message: NzMessageService,
              public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    this.getBoardTree();
  }

  setBoardSelect(item: any): void {
    this.tabTitle = item.title;
    this.board.selectedRowId = item.key;

    this.getArticleGridData();
  }

  getArticleGridData(): void {
    this.article.drawerVisible = false;
    this.articleView.drawerVisible = false;

    this.articleGrid.getArticleList(this.board.selectedRowId);
  }

  newBoard(): void {
    this.board.selectedRowId = null;
    this.board.drawerVisible = true;
  }

  modifyBoard(item: any): void {
    this.board.drawerVisible = true;
  }

  getBoardTree(): void {
    this.board.drawerVisible = false;
    this.boardTree.getboardHierarchy();
  }

  newArticle(): void {
    if (this.board.selectedRowId === null || this.board.selectedRowId === undefined)  {
      this.message.create('error', '게시판을 선택해주세요.');
      return;
    }

    /*
    const componentRef = this.viewContainerRef.createComponent(ArticleFormComponent);
    this.tabs.push(componentRef);
    */

    this.article.selectedRowId = null;
    this.article.drawerVisible = true;
  }

  selectArticle(item: any) {
    this.articleView.selectedRow = item;
    this.article.selectedRowId = item.articleId;
  }

  editArticle(): void {
    this.article.selectedRowId = this.articleGrid.getSelectedRows()[0]?.articleId;
    if (this.article.selectedRowId === null || this.article.selectedRowId === undefined) {
      this.message.create('error', '게시글을 선택해주세요.');
      return;
    }

    this.article.drawerVisible = true;
  }

  addTabArticleView(): void {
    let title: string | null = '';
    const title_lentgh = this.articleView.selectedRow?.title.length as number;
    if (title_lentgh > 8) {
      title = this.articleView.selectedRow?.title.substring(0, 8) + '...';
    } else {
      title = this.articleView.selectedRow?.title as string;
    }

    const articleId = this.articleView.selectedRow?.articleId as number;
    const article = this.articleView.selectedRow as Article;
    const newTab: TabArticle = {
      tabName: title,
      articleId: articleId,
      article: article
    }

    let tabIndex = null;
    for (const index in this.tabs) {
      if (this.tabs[index].articleId === this.articleView.selectedRow?.articleId) {
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
    this.tabs.splice(index-1, 1);
  }

  print(item: any): void {
    console.log(item);
  }

}
