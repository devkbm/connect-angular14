import { Component, Input, OnInit } from '@angular/core';
import { DutyDate } from './duty-application.model';

@Component({
  selector: 'app-duty-date-list',
  template: `
    <div class="container" [style.height]="height">
      <div *ngFor="let item of _data">
        <label nz-checkbox [(ngModel)]="item.isSelected">
          {{item.date | date: 'yyyy-MM-dd'}}
        </label>
      </div>
    </div>
  `,
  styles: [`
    .container {
      overflow: auto;
    }
  `]
})
export class DutyDateListComponent implements OnInit {

  @Input() height = '100%';
  @Input() _data: DutyDate[] = [];

  constructor() { }

  ngOnInit() {
  }

}
