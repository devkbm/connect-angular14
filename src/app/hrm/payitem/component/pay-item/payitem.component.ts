import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { PayItemFormComponent } from './pay-item-form.component';
import { PayItemGridComponent } from './pay-item-grid.component';

@Component({
  selector: 'app-payitem',
  templateUrl: './payitem.component.html',
  styleUrls: ['./payitem.component.css']
})
export class PayitemComponent extends AppBase implements OnInit {

  @ViewChild('form', {static: true}) form!: PayItemFormComponent;
  @ViewChild('grid', {static: true}) grid!: PayItemGridComponent;

  drawerVisible = false;

  queryKey = 'code';
  queryValue = '';

  optionList = [
    { label: '급여항목', value: 'code' },
    { label: '급여항목2', value: 'code' }
  ];

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
    this.getPayItemList();
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getPayItemList() {
    let params: any = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getGridList('');
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }

  deletePayItem() {
    const item = this.grid.getSelectedRows()[0];
    this.form.deleteForm(item.code);
  }

  selectedItem(item: any) {
    // this.form.programForm.patchValue(item);
  }

  editDrawerOpen(item: any) {
    this.form.getForm(item.code);
    this.openDrawer();
  }
}
