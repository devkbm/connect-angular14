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
import { Term } from './term.model';
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
      pkTerm            : new FormControl<string | null>(null),
      domain            : new FormControl<string | null>(null, { validators: Validators.required }),
      term              : new FormControl<string | null>(null, { validators: Validators.required }),
      nameKor           : new FormControl<string | null>(null, { validators: Validators.required }),
      abbreviationKor   : new FormControl<string | null>(null, { validators: Validators.required }),
      nameEng           : new FormControl<string | null>(null, { validators: Validators.required }),
      abbreviationEng   : new FormControl<string | null>(null, { validators: Validators.required }),
      description       : new FormControl<string | null>(null),
      comment           : new FormControl<string | null>(null)
    });
  }

  getTerm(): void {
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

  submitTerm(): void {
    this.termService
        .registerTerm(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Term>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  deleteTerm(): void {
    this.termService
      .deleteTerm(this.fg.get('pkTerm')?.value)
      .subscribe(
        (model: ResponseObject<Term>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
        }
      );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
