import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { LedgerFormComponent } from './ledger-form.component';
import { LedgerGridComponent } from './ledger-grid.component';
import { LedgerListFormComponent } from './ledger-list-form.component';
import { LedgerListGridComponent } from './ledger-list-grid.component';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent extends AppBase implements OnInit {

  @ViewChild('gridLedger', {static: true}) gridLedger!: LedgerGridComponent;
  @ViewChild('formLedger', {static: true}) formLedger!: LedgerFormComponent;
  @ViewChild('gridLedgerList', {static: true}) gridLedgerList!: LedgerListGridComponent;
  @ViewChild('formLedgerList', {static: true}) formLedgerList!: LedgerListFormComponent;

  drawerVisibleLedger = false;
  drawerVisibleLedgerList = false;

  selectedLedgerId = '';

  ledgerQueryKey = 'ledgerId';
  ledgerQueryValue = '';

  ledgerListQueryKey = 'empId';
  ledgerListQueryValue = '';

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  public openDrawerLedger(row: any): void {
    console.log(row);
    this.formLedger.getForm(row.ledgerId);
    this.drawerVisibleLedger = true;
  }

  public closeDrawerLedger(): void {
    this.drawerVisibleLedger = false;
  }

  public refreshGridLedger(): void {
    this.closeDrawerLedger();
    this.gridLedger.getGridList();

    this.gridLedgerList.getGridList({});
  }

  public selectLedgerRow(row: any): void {
    this.selectedLedgerId = row.ledgerId;

    console.log(row);
    this.gridLedgerList.getGridList({ledgerId: this.selectedLedgerId});
  }

  public newLedgerForm(): void {
    this.drawerVisibleLedger = true;
    this.formLedger.newForm();
  }

  public openDrawerLedgerList(row: any): void {
    console.log(row);
    this.formLedgerList.getForm(row.listId);
    this.drawerVisibleLedgerList = true;
  }

  public closeDrawerLedgerList(): void {
    this.drawerVisibleLedgerList = false;
  }

  public refreshGridLedgerList(): void {

    const params = {ledgerId: this.selectedLedgerId};
    this.closeDrawerLedgerList();
    this.gridLedgerList.getGridList(params);
  }

  public newLedgerList(): void {
    this.formLedgerList.newForm(this.selectedLedgerId);
    this.drawerVisibleLedgerList = true;
  }

}
