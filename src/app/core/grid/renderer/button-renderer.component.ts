import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button nz-button nzSize="small" nzBlock="true" (click)="onClick($event)" style="height: 24px">
      <!--<i nz-icon style="font-size: 16px; color: #08c;"></i>-->
      <i nz-icon [nzType]="iconType" style="font-size: 16px; color: #08c;"></i>
      {{label}}
    </button>
  `,
  styles: []
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  params: any;
  label: string = '';
  iconType: string= '';

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.label = this.params.label || null;
    this.iconType = this.params.iconType || null;
  }

  refresh(params: any): boolean {
    return true;
  }

  onClick($event: any): void {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
      };

      this.params.onClick(params);
    }
  }


}
