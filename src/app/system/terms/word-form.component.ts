import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase } from 'src/app/core/form/form-base';
import { AppAlarmService } from '../../core/service/app-alarm.service';

import { ResponseList } from '../../core/model/response-list';
import { ResponseObject } from '../../core/model/response-object';
import { WordService } from './word.service';
import { Word } from './word.model';
import { NzInputTextComponent } from 'src/app/shared/nz-input-text/nz-input-text.component';

@Component({
  selector: 'app-word-form',
  templateUrl: './word-form.component.html',
  styleUrls: ['./word-form.component.css']
})
export class WordFormComponent extends FormBase implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('logicalName') logicalName?: NzInputTextComponent;

  constructor(private fb: FormBuilder,
              private service: WordService,
              private appAlarmService: AppAlarmService) {
    super();

    this.fg = this.fb.group({
      logicalName     : new FormControl<string | null>(null, { validators: Validators.required }),
      logicalNameEng  : new FormControl<string | null>(null),
      physicalName    : new FormControl<string | null>(null, { validators: Validators.required }),
      comment         : new FormControl<string | null>(null)
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.newForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  newForm(): void {
    this.logicalName?.focus();
  }

  modifyForm(formData: Word): void {
  }

  get(id: string) {
    this.service
        .get(id)
        .subscribe(
          (model: ResponseObject<Word>) => {
            if ( model.total > 0 ) {
              this.modifyForm(model.data);
            } else {
              this.newForm();
            }
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  submit() {
    this.service
        .save(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Word>) => {
            this.formSaved.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  delete(): void {
    this.service
        .delete(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Word>) => {
            this.formDeleted.emit(this.fg.getRawValue());
            this.appAlarmService.changeMessage(model.message);
          }
        );
  }

  closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
