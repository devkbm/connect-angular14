import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleGridComponent } from './article-grid.component';
import { BoardFormComponent } from './board-form.component';
import { BoardTreeComponent } from './board-tree.component';
import { ArticleFormComponent } from './article-form.component';
import { Article } from './article.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  /**
   * 게시판 Drawer 여부
   */
  drawerVisible = false;

  /**
   * 게시글 Drawer 여부
   */
  articleDrawerVisible = false;

  articleViewDrawerVisible = false;

  /**
   * 선택된 게시판 키
   */
  selectedBoard: any;

  selectedArticle!: Article;

  /**
   * 게시판 트리 조회 Filter 조건
   */
  queryValue: any;

  tabTitle: any;

  @ViewChild('boardTree', {static: true}) boardTree!: BoardTreeComponent;
  @ViewChild('boardForm', {static: false}) boardForm!: BoardFormComponent;
  @ViewChild('articleGrid', {static: true}) articleGrid!: ArticleGridComponent;
  @ViewChild('articleForm', {static: false}) articleForm!: ArticleFormComponent;

  constructor() { }

  ngOnInit() {
    this.getBoardTree();
  }

  setBoardSelect(item: any): void {
    this.tabTitle = item.title;
    this.selectedBoard = item.key;
    this.getArticleGridData();
  }

  getArticleGridData(): void {
    this.closeArticleDrawer();
    this.articleGrid.getArticleList(this.selectedBoard);
  }

  newBoard(): void {
    this.openDrawer();

    setTimeout(() => {
      this.boardForm.newForm();
    },10);
  }

  modifyBoard(item: any): void {
    this.openDrawer();

    setTimeout(() => {
      this.boardForm.getBoard(item.key);
    },10);
  }

  getBoardTree(): void {
    this.closeDrawer();
    this.boardTree.getboardHierarchy();
  }

  newArticle(): void {
    this.openArticleDrawer();

    /*
    setTimeout(() => {
      this.articleForm.newForm(this.selectedBoard);
    },10);
    */
  }

  validEditable(item: any) {
    if (item.editable === true) {
      this.editArticle(item);
    } else {
      this.showArticleView(item);
    }
    console.log(item);
  }

  editArticle(item: any): void {
    this.openArticleDrawer();

    setTimeout(() => {
      this.articleForm.getArticle(item.pkArticle);
    },10);
  }

  showArticleView(item: any): void {
    this.openArticleViewDrawer();

    setTimeout(() => {
      this.selectedArticle = item;
    },10);
  }

  print(item: any): void {
    console.log(item);
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
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
