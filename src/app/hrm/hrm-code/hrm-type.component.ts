import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/core/app/app-base';
import { HrmTypeGridComponent } from './hrm-type-grid.component';
import { HrmTypeCodeGridComponent } from './hrm-type-code-grid.component';
import { HrmTypeFormComponent } from './hrm-type-form.component';
import { HrmTypeCodeFormComponent } from './hrm-type-code-form.component';
import { HrmType } from './hrm-type.model';

@Component({
  selector: 'app-hrm-type',
  templateUrl: './hrm-type.component.html',
  styleUrls: ['./hrm-type.component.css']
})
export class HrmTypeComponent extends AppBase implements OnInit {

  @ViewChild('gridHrmType') gridHrmType!: HrmTypeGridComponent;
  
  @ViewChild('gridHrmTypeCode') gridHrmTypeCode!: HrmTypeCodeGridComponent;  

  ledgerQueryKey = 'ledgerId';
  ledgerQueryValue: any;

  ledgerListQueryKey = 'empId';
  ledgerListQueryValue: any;

  type: { drawerVisible: boolean, selectedRowId: any } = {
    drawerVisible: false,
    selectedRowId: null
  }

  code: { drawerVisible: boolean, selectedRowId: {typeId: any, code: any} | null } = {
    drawerVisible: false,
    selectedRowId: null
  }

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  refreshGridHrmType(): void {
    this.type.drawerVisible = false;    
    this.gridHrmType.getGridList('');
  }

  selectHrmType(row: any): void {        
    this.type.selectedRowId = row.typeId;
    this.code.selectedRowId = {typeId: row.typeId, code: ''};

    this.gridHrmTypeCode.getGridList(row.typeId);
  }

  public newHrmTypeForm(): void {
    this.type.selectedRowId = null;
    this.type.drawerVisible = true;        
  }

  editHrmType(row: any): void {
    console.log(row);
    this.type.selectedRowId = row.typeId;
    this.type.drawerVisible = true;
  }  

  selectHrmTypeCode(row: any): void {
    this.code.selectedRowId = {typeId: row.typeId, code: row.code};
  }

  refreshGridHrmTypeCode(): void {
    this.code.drawerVisible = false;    
    this.gridHrmTypeCode.getGridList(this.type.selectedRowId);
  }

  newHrmTypeCodeForm(): void {
    this.code.selectedRowId = {typeId: this.type.selectedRowId, code: null};
    this.code.drawerVisible = true;
  }

  editHrmTypeCodeForm(row: any): void {        
    this.code.selectedRowId = {typeId: row.typeId, code: row.code};
    this.code.drawerVisible = true;
  }  

}
