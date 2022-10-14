import { AfterContentInit, AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { TermGridComponent } from './term-grid.component';
import { TermFormComponent } from './term-form.component';
import { AppBase } from '../../core/app/app-base';
import { DataDomainGridComponent } from './data-domain-grid.component';
import { WordGridComponent } from './word-grid.component';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent extends AppBase implements OnInit {
  
  @ViewChild('termGrid') termGrid!: TermGridComponent;
  @ViewChild('wordGrid') wordGrid!: WordGridComponent;
  @ViewChild('domainGrid') domainGrid!: DataDomainGridComponent;  

  query: { key: string, value: string, list: {label: string, value: string}[] } = {
    key: 'term',
    value: '',
    list: [
      {label: '용어', value: 'term'},
      {label: '업무영역', value: 'domain'}  
    ]
  }

  tabIndex: number = 0;  

  term: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  word: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  domain: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
  }

  getList() {    
    if (this.tabIndex === 0) {
      this.getTermList();
    } else if (this.tabIndex === 1) {
      this.getWordList();
    } else if (this.tabIndex === 2) {
      this.getDomainList();
    }
  }

  //#region 용어사전
  getTermList() {
    let params: any = new Object();
    if ( this.query.value !== '') {
      params[this.query.key] = this.query.value;
    }
    
    this.term.drawerVisible = false;
    this.termGrid.getList(params);
  }

  newTerm() {    
    this.term.selectedRowId = null;
    this.term.drawerVisible = true;
  }
  
  editTerm(item: any) {    
    this.term.selectedRowId = item.termId;
    this.term.drawerVisible = true;
  }

  termGridSelected(item: any) {        
    this.term.selectedRowId = item.termId;
  }
  //#endregion 용어사전

  //#region 단어사전
  getWordList() {
    this.word.drawerVisible = false;
    this.wordGrid.getList();
  }

  newWord() {
    this.word.selectedRowId = null;
    this.word.drawerVisible = true;
  }

  editWord(item: any) {    
    this.word.selectedRowId = item.logicalName;
    this.word.drawerVisible = true;
  }

  wordGridSelected(item: any) {
    this.word.selectedRowId = item.logicalName;
  }
  //#endregion 단어사전

  //#region 도메인
  getDomainList() {
    this.domain.drawerVisible = false;
    this.domainGrid.getList();
  }

  newDomain() {
    this.domain.selectedRowId = null;
    this.domain.drawerVisible = true;
  }  
      
  domainGridSelected(item: any) {    
    this.domain.selectedRowId = item.domainId;
  }
  //#endregion 도메인

}
