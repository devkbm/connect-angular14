import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
//import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
//import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Editor from 'ckeditor5/build/ckeditor';

import { MyUploadAdapter } from './my-upload-adapter';


// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/frameworks/angular.html
// https://ckeditor.com/docs/ckeditor5/latest/installation/getting-started/installing-plugins.html

// https://github.com/stevermeister/ngx-cookie-service
@Component({
  selector: 'app-nz-input-ckeditor',
  template: `
   <nz-form-item>
      <nz-form-label [nzFor]="itemId" [nzRequired]="required">
        <ng-content></ng-content>
      </nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="nzErrorTip" [nzValidateStatus]="formField" #control>
        <!-- tagName="textarea" -->
        <ckeditor #ckEditor
          [editor]="Editor"
          [config]="editorConfig"
          [disabled]="disabled"

          [formControl]="formField"
          (change)="textChange($event)"
          (blur)="onTouched()"
          (ready)="onReady($event)"
          >
        </ckeditor>
        <!--
        <input #inputControl nz-input
                [required]="required"
                [disabled]="disabled"
                [id]="itemId"
                [placeholder]="placeholder"
                [ngModel]="value"
                [readonly]="readonly"
                (ngModelChange)="onChange($event)"
                (ngModelChange)="valueChange($event)"
                (blur)="onTouched()"/>
        -->
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => NzInputCkeditorComponent
      ),
      multi: true
    }
  ],
  styles: [`
    :host ::ng-deep .ck-editor__editable {
      color: black;
      height: var(--height);
    }
  `]
})
export class NzInputCkeditorComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild('ckEditor', { static: true }) ckEditor!: CKEditorComponent;
  @Input() parentFormGroup?: FormGroup;
  @Input() fieldName!: string;
  @Input() itemId: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = '';

  @HostBinding("style.--height")
  @Input() height: string = '100px';

  @Input() nzErrorTip?: string | TemplateRef<{$implicit: AbstractControl | NgModel;}>;

  value!: string;

  onChange!: (value: string) => void;
  onTouched!: () => void;

  Editor = Editor;
  editorConfig;

  constructor() {
    this.editorConfig = {
      language: 'ko',
      toolbar: [
        'heading', '|',
        'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
        'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
        'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify', '|',
        'bulletedList', 'numberedList', 'todoList', '|',
        '-', // break point
        'uploadImage', 'insertTable', '|',
        'outdent', 'indent', '|',
        'blockQuote', 'codeBlock', '|',
        'link', '|',
        'undo', 'redo'
      ],
      image: {
        toolbar: [
          'imageStyle:inline',
          'imageStyle:block',
          'imageStyle:side',
          '|',
          'toggleImageCaption',
          'imageTextAlternative'
        ]
      },
      extraPlugins: [
        function (editor: any) {
          editor.plugins.get('FileRepository').createUploadAdapter = (loader :any) => {
            return new MyUploadAdapter(loader);
          };
        }
      ]
    };
  }

  ngAfterViewInit(): void {

    //console.log(this.element?.nativeElement.value);
    //this.ckEditor.writeValue(this.value);
  }

  onReady(editor: any): void {
    //this.MyCustomUploadAdapterPlugin(editor);
    //editor.extraPlugins = [this.MyCustomUploadAdapterPlugin(editor)];
  }

  MyCustomUploadAdapterPlugin(editor: any ): any {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader: any ) => {
      return new MyUploadAdapter( loader );
    }
  }

  get formField(): FormControl {
    return this.parentFormGroup?.get(this.fieldName) as FormControl;
  }

  logging(args: any) {
    console.log(args);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  textChange( {editor}: ChangeEvent): void {
    this.value = editor.getData();
    this.onChange(this.value);
  }

}
