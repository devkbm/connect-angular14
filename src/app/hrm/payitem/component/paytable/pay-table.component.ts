import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { PayTableFormComponent } from './pay-table-form.component';
import { PayTableGridComponent } from './pay-table-grid.component';
import { PayTableItemFormComponent } from './pay-table-item-form.component';
import { PayTableItemGridComponent } from './pay-table-item-grid.component';

@Component({
  selector: 'app-pay-table',
  templateUrl: './pay-table.component.html',
  styleUrls: ['./pay-table.component.css']
})
export class PayTableComponent extends AppBase implements OnInit {

  @ViewChild('formMaster', {static: true}) formMaster!: PayTableFormComponent;
  @ViewChild('gridMaster', {static: true}) gridMaster!: PayTableGridComponent;
  @ViewChild('formDetail', {static: true}) formDetail!: PayTableItemFormComponent;
  @ViewChild('gridDetail', {static: true}) gridDetail!: PayTableItemGridComponent;

  drawerVisibleMaster = false;
  drawerVisibleDetail = false;

  queryKey = 'dutyCode';
  queryValue = '';

  selectedMasterRow: any;

  optionList = [
    { label: '근무코드', value: 'dutyCode' },
    { label: '급여항목', value: 'code' }
  ];

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  editDrawerMaster(row: any): void {
    this.formMaster.getForm(row.id);
    this.drawerVisibleMaster = true;
  }

  editDrawerDetail(row: any): void {
    this.formDetail.getForm(row.payTableId, row.id);
    this.drawerVisibleDetail = true;
  }

  openDrawerMaster(): void {
    this.drawerVisibleMaster = true;
  }

  closeDrawerMaster(): void {
    this.drawerVisibleMaster = false;
  }

  openDrawerDetail(): void {
    this.drawerVisibleDetail = true;
  }

  closeDrawerDetail(): void {
    this.drawerVisibleDetail = false;
  }

  loadGridMaster(): void {
    this.gridMaster.getGridList('');
  }

  loadGridDetail(payTableId: string): void {
    this.gridDetail.getGridList(payTableId);
  }

  reloadGridMatser(): void {
    this.loadGridMaster();
    this.closeDrawerMaster();
  }

  reloadGridDetail(): void {
    this.loadGridDetail(this.selectedMasterRow.id);
    this.closeDrawerDetail();
  }

  selectedGridMasterRow(row: any): void {
    this.selectedMasterRow = row;
    this.loadGridDetail(row.id);
  }

  newFormMaster(): void {
    this.openDrawerMaster();
    this.formMaster.newForm();
  }

  newFormDetail(): void {
    this.openDrawerDetail();
    this.formDetail.newForm(this.selectedMasterRow.id);
  }


}
