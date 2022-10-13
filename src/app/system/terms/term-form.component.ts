import { DataDomain } from './data-domain.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TermService } from './term.service';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseObject } from '../../core/model/response-object';
import { Term } from './term.model';
import { FormBase } from 'src/app/core/form/form-base';
import { ResponseList } from 'src/app/core/model/response-list';
import { WordService } from './word.service';
import { Word } from './word.model';
import { DataDomainService } from './data-domain.service';

@Component({
  selector: 'app-term-form',
  templateUrl: './term-form.component.html',
  styleUrls: ['./term-form.component.css']
})
export class TermFormComponent extends FormBase implements OnInit {
  systemTypeList: any;
  wordList: Word[] = [];
  dataDomainList: DataDomain[] = [];

  constructor(private fb: FormBuilder,
              private service: TermService,
              private wordService: WordService,
              private dataDomainService: DataDomainService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      termId       : new FormControl<string | null>(null),
      system       : new FormControl<string | null>(null, { validators: Validators.required }),
      term         : new FormControl<string | null>(null, { validators: Validators.required }),
      termEng      : new FormControl<string | null>(null),
      columnName   : new FormControl<string | null>(null),
      dataDomainId : new FormControl<string | null>(null),
      description  : new FormControl<string | null>(null),
      comment      : new FormControl<string | null>(null)
    });

  }

  ngOnInit(): void {
    this.getSystemTypeList();
    this.getWordList();
    this.getDataDoaminList();
  }

  get(): void {
    const id: string = this.fg.get('termId')?.value;
    this.service
        .get(id)
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

  submit(): void {
    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Term>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          }
        );
  }

  delete(): void {
    const id: string = this.fg.get('termId')?.value;
    this.service
        .delete(id)
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

  getSystemTypeList(): void {
    this.service
        .getSystemTypeList()
        .subscribe(
          (model: ResponseList<any>) => {
            this.systemTypeList = model.data;
          }
        );
  }

  getWordList(): void {
    this.wordService
        .getList()
        .subscribe(
          (model: ResponseList<Word>) => {
            this.wordList = model.data;
          }
        );
  }

  getDataDoaminList(): void {
    this.dataDomainService
        .getList()
        .subscribe(
          (model: ResponseList<DataDomain>) => {
            this.dataDomainList = model.data;
          }
        );
  }

}
