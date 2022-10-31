import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase, FormType } from 'src/app/core/form/form-base';
import { AppAlarmService } from 'src/app/core/service/app-alarm.service';

import { ResponseObject } from 'src/app/core/model/response-object';

@Component({
  selector: 'app-staff-contact-form',
  template: `
   <p>
  		staff-contact-form Works!
   </p>
  `,
  styles: []
})
export class StaffContactFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
