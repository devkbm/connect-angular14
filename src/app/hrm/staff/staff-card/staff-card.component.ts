import { Component, Input, OnInit } from '@angular/core';
import { GlobalProperty } from 'src/app/core/global-property';
import { StaffCardModel } from './staff-card.model';

@Component({
  selector: 'app-staff-card',
  template: `
    <nz-card class="card" nzHoverable nz-card-grid>
      <nz-card-meta
        [nzAvatar]="avatarTemplate"
        [nzTitle]="this.data?.staffName!"
        [nzDescription]="this.data?.blngDeptName!">
      </nz-card-meta>
    </nz-card>
    <ng-template #avatarTemplate>
      <nz-avatar
        [nzSrc]="getProfilePicture()"
        [nzShape]="'square'" [nzSize]="48">
      </nz-avatar>
    </ng-template>
  `,
  styles: [`
    .card {
      width: 200px;
      height: 100px;
      margin-top: 16px;
      margin-right: 8px;
      text-align: center;
    }
  `]
})
export class StaffCardComponent implements OnInit {

  @Input() data?: StaffCardModel;

  constructor() { }

  ngOnInit() {
  }

  getProfilePicture() {
    if (this.data?.profilePicture) {
      return GlobalProperty.serverUrl + '/static/' + this.data?.profilePicture;
    }
    return undefined;
  }

}
