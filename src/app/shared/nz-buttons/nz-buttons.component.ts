import { Component, EventEmitter, Input, OnInit } from '@angular/core';

export interface ButtonTemplate {
  text: string;
  click?(evt: MouseEvent): void;
  nzType?: string;
  isDanger?: boolean;
  popConfirm?: {
    title: string;
    confirmClick(): void;
    cancelClick?(): void;
  }
}

/**
 * example)
  btns: ButtonTemplate[] = [{
    text: 'test',
    click: (e: MouseEvent) => {
      console.log('test');
    },
    nzType: 'save'
  },{
    text: 'test2',
    click: (e: MouseEvent) => {
      console.log('test2');
    },
    nzType: 'delete',
    isDanger: true
  },{
    text: 'test3',
    click: (e: MouseEvent) => {
      console.log('test3');
    },
    isDanger: true,
    popConfirm: {
      title: 'confirm?',
      confirmClick: () => {
        console.log('confirm');
      },
      cancelClick: () => {
        console.log('cancel');
      }
    }
  }];
 */
@Component({
  selector: 'app-nz-buttons',
  template: `
    <nz-button-group *ngFor="let btn of buttons; let i = index">
      <!-- nz-popconfirm을 사용하지 않을 경우 -->
      <button nz-button (click)="btn?.click($event)" [nzDanger]="btn.isDanger" *ngIf="btn.popConfirm === null">
        <i nz-icon [nzType]="btn.nzType" nzTheme="outline" *ngIf="btn.nzType"></i>{{btn.text}}
      </button>

      <!-- nz-popcofirm을 사용할 경우 -->
      <button nz-button (click)="btn?.click($event)" [nzDanger]="btn.isDanger" *ngIf="btn.popConfirm !== null"
        nz-popconfirm [nzPopconfirmTitle]="btn.popConfirm?.title" [nzOkType]="btn.isDanger === true ? 'danger' : 'primary'"
        (nzOnConfirm)="btn.popConfirm?.confirmClick()" (nzOnCancel)="btn.popConfirm?.cancelClick()">
        <i nz-icon [nzType]="btn.nzType" nzTheme="outline" *ngIf="btn.nzType"></i>{{btn.text}}
      </button>

      <nz-divider nzType="vertical" *ngIf="buttons.length > 0 && i < buttons.length - 1"></nz-divider>
    </nz-button-group>
  `,
  styles: []
})
export class NzButtonsComponent implements OnInit {

  @Input() buttons!: ButtonTemplate[];

  constructor() { }

  ngOnInit() {
  }

}
