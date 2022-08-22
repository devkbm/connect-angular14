import { AfterContentInit, AfterViewInit, Component, ContentChild, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { TermGridComponent } from './term-grid.component';
import { TermFormComponent } from './term-form.component';
import { AppBase } from '../../core/app/app-base';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent extends AppBase implements OnInit {

  drawerVisible = false;

  queryKey: string = 'term';
  queryValue: string = '';

  @ViewChild('termGrid', {static: false})
  grid!: TermGridComponent;

  @ViewChild('termForm', {static: false})
  form?: TermFormComponent;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getTermList(): void {
    let params: any = new Object();
    if ( this.queryValue !== '') {
      params[this.queryKey] = this.queryValue;
    }

    console.log(this.form);
    this.closeDrawer();
    this.grid.getTermList(params);
  }

  initForm(): void {
    this.form?.fg.reset();
    this.openDrawer();
  }

  saveTerm(): void {
    this.form?.submitTerm();
  }

  deleteTerm(): void {
    this.form?.deleteTerm();
  }

  selectedItem(item: any): void {

    //if (this.form) {
    //  this.form.fg.patchValue(item);
      //this.form.getTerm(item.term);
    //}
    //console.log(this.form);
  }

  editDrawerOpen(item: any): void {

    this.openDrawer();

    setTimeout(() => {
      this.form?.fg.patchValue(item);
    },10);
  }

}
