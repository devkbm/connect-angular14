import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* AG-GRID */
import { AgGridModule } from 'ag-grid-angular';

/* NG-ZORRO */
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { ButtonRendererComponent } from './grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from './grid/renderer/checkbox-renderer.component';

const nzModules = [
  NzIconModule,
  NzButtonModule,
  NzCheckboxModule
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    nzModules
  ],
  declarations: [
    ButtonRendererComponent,
    CheckboxRendererComponent
  ],
  exports: [
    ButtonRendererComponent,
    CheckboxRendererComponent
  ]
})
export class CoreModule { }
