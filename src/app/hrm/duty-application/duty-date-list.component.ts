import { Component, OnInit } from '@angular/core';
import { DutyDate } from './duty-application.model';

@Component({
  selector: 'app-duty-date-list',
  template: `
    <div class="container">
      <div *ngFor="let item of _data">
        <label nz-checkbox [(ngModel)]="item.isSelected">
          {{item.date | date: 'yyyy-MM-dd'}}
        </label>
      </div>
    </div>
  `,
  styles: []
})
export class DutyDateListComponent implements OnInit {

  _data: DutyDate[] = [];

  constructor() { }

  ngOnInit() {
  }

}
