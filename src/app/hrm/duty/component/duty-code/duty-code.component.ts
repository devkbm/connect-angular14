import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { DutyCodeFormComponent } from './duty-code-form.component';
import { DutyCodeGridComponent } from './duty-code-grid.component';

@Component({
  selector: 'app-duty-code',
  templateUrl: './duty-code.component.html',
  styleUrls: ['./duty-code.component.css']
})
export class DutyCodeComponent extends AppBase implements OnInit {

  @ViewChild('formDutyCode', {static: true}) form!: DutyCodeFormComponent;
  @ViewChild('gridDutyCode', {static: true}) grid!: DutyCodeGridComponent;

  drawerVisible = false;

  queryKey = 'dutyCode';
  queryValue = '';

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
    this.getDutyCodeList();
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getDutyCodeList() {
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

  saveDutyCode() {
    this.form.submitForm();
  }

  deleteDutyCode() {
    const item = this.grid.getSelectedRows()[0];

    this.form.deleteForm(item.dutyCode);
  }

  selectedItem(item: any) {
    // this.form.programForm.patchValue(item);
  }

  editDrawerOpen(item: any) {
    this.form.getForm(item.dutyCode);
    this.openDrawer();
  }
}
