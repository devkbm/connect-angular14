import { Component, EventEmitter, Input, OnInit } from '@angular/core';

export interface ButtonTemplate {
  text: string;
  click(evt: MouseEvent): void;
  nzType?: string
}

@Component({
  selector: 'app-nz-buttons',
  template: `
    <nz-button-group *ngFor="let btn of buttons; let i = index">
      <button nz-button (click)="btn.click($event)">
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
