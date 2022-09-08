import { ArticleRead } from './article-read.model';

export class Article {
  constructor(
    public articleId: number,
    public boardId: number,
    public articleParentId: number,
    public title: string,
    public contents: string,
    public pwd: string,
    public hitCnt: string,
    public fromDate: string,
    public toDate: string,
    public seq: number,
    public depth: number,
    public articleChecks: ArticleRead[],
    public fileList: string[],
    public file: File,
    public editable: boolean) {}
}
