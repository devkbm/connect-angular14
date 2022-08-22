import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { TermService } from './term.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { Term } from './term';
import { FormBase } from 'src/app/core/form/form-base';

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.css']
})
export class TermFormComponent extends FormBase implements OnInit {

  constructor(private fb: FormBuilder,
              private termService: TermService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {

    this.fg = this.fb.group({
      pkTerm            : [ null ],
      domain            : [ null, [ Validators.required ] ],
      term              : [ null, [ Validators.required ] ],
      nameKor           : [ null, [ Validators.required ] ],
      abbreviationKor   : [ null, [ Validators.required ] ],
      nameEng           : [ null, [ Validators.required ] ],
      abbreviationEng   : [ null, [ Validators.required ] ],
      description       : [ null ],
      comment           : [ null ]
    });
  }

  public getTerm(): void {
    this.termService
      .getTerm(this.fg.get('pkTerm')?.value)
      .subscribe(
        (model: ResponseObject<Term>) => {
          if ( model.total > 0 ) {
            this.fg.patchValue(model.data);
          } else {
            this.fg.reset();
          }
          this.appAlarmService.changeMessage(model.message);
        }
      );
  }

  public submitTerm(): void {

    this.termService
        .registerTerm(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Term>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  public deleteTerm(): void {
    this.termService
      .deleteTerm(this.fg.get('pkTerm')?.value)
      .subscribe(
        (model: ResponseObject<Term>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
        }
      );
  }

  public closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
