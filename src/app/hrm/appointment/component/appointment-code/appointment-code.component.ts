import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppointmentCodeGridComponent } from './appointment-code-grid.component';
import { AppointmentCodeDetailGridComponent } from './appointment-code-detail-grid.component';
import { AppBase } from 'src/app/core/app/app-base';
import { AppointmentCodeFormComponent } from './appointment-code-form.component';
import { AppointmentCodeDetailFormComponent } from './appointment-code-detail-form.component';


@Component({
  selector: 'app-appointment-code',
  templateUrl: './appointment-code.component.html',
  styleUrls: ['./appointment-code.component.css']
})
export class AppointmentCodeComponent extends AppBase implements OnInit {

  @ViewChild('gridCode', {static: true}) gridCode!: AppointmentCodeGridComponent;
  @ViewChild('gridDetail', {static: true}) gridDetail!: AppointmentCodeDetailGridComponent;
  @ViewChild('formCode', {static: true}) formCode!: AppointmentCodeFormComponent;
  @ViewChild('formCodeDetail', {static: true}) formCodeDetail!: AppointmentCodeDetailFormComponent;

  /**
   * 발령코드 Drawer Visibile
   */
  drawerVisibleCode = false;

  /**
   * 발령코드상세 Drawer Visibile
   */
  drawerVisibleCodeDetail = false;

  /**
   * 발령대장 그리드에서 선택된 발령코드
   */
  selectedCode = '';


  ledgerQueryKey: string = '';
  ledgerQueryValue: string = '';

  ledgerListQueryKey: string = '';
  ledgerListQueryValue: string = '';

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
    //this.gridDetail.getGridList();
  }

  public openDrawerCode(item: any): void {
    this.formCode.getForm(item.code);
    this.drawerVisibleCode = true;
  }

  public closeDrawerCode(): void {
    this.drawerVisibleCode = false;
  }

  public gridCodeRefresh(): void {
    this.gridCode.getGridList();
    this.closeDrawerCode();
  }

  public gridCodeRowSelected(p: any): void {
    this.selectedCode = p.code;
    this.gridCodeDetailRefresh();
  }

  public newCodeForm(): void {
    this.drawerVisibleCode = true;
    this.formCode.newForm();
  }

  public openDrawerCodeDetail(item: any): void {
    console.log(item);
    this.formCodeDetail.getForm(item.code, item.changeType, item.changeTypeDetail);
    this.drawerVisibleCodeDetail = true;
  }

  public closeDrawerCodeDetail(): void {
    this.drawerVisibleCodeDetail = false;
  }

  public gridCodeDetailRefresh(): void {
    this.gridDetail.getGridList(this.selectedCode, {});
    this.closeDrawerCodeDetail();
  }

  public newCodeDetailForm(): void {
    this.formCodeDetail.newForm(this.selectedCode);
    this.drawerVisibleCodeDetail = true;
  }

}
