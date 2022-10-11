import { AfterContentInit, AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { TermGridComponent } from './term-grid.component';
import { TermFormComponent } from './term-form.component';
import { AppBase } from '../../core/app/app-base';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent extends AppBase implements OnInit {

  drawerVisible: boolean = false;
  wordDrawerVisible: boolean = false;
  domainDrawerVisible: boolean = false;

  queryKey: string = 'term';
  queryValue: string = '';
  queryOptionList = [
    {label: '용어', value: 'term'},
    {label: '업무영역', value: 'domain'}
  ];

  @ViewChild('termGrid', {static: false})
  grid!: TermGridComponent;

  @ViewChild('termForm', {static: false})
  form?: TermFormComponent;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
  }

  getTermList() {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    console.log(this.form);
    this.closeDrawer();
    this.grid.getTermList(params);
  }

  initForm() {
    this.form?.fg.reset();
    this.openDrawer();
  }

  saveTerm() {
    this.form?.submit();
  }

  deleteTerm() {
    this.form?.delete();
  }

  selectedItem(item: any) {

    //if (this.form) {
    //  this.form.fg.patchValue(item);
      //this.form.getTerm(item.term);
    //}
    //console.log(this.form);
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  editDrawerOpen(item: any) {

    this.openDrawer();

    setTimeout(() => {
      this.form?.fg.patchValue(item);
    },10);
  }

  openWordDrawerVisible() {
    this.wordDrawerVisible = true;
  }

  closeWordDrawerVisible() {
    this.wordDrawerVisible = false;
  }

  openDomainDrawerVisible() {
    this.domainDrawerVisible = true;
  }

  closeDomainDrawerVisible() {
    this.domainDrawerVisible = false;
  }
}
