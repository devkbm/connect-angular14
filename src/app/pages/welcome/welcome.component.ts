import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  title = 'angular-forms-example';
  fg!: FormGroup;

  selectList = [{value: 'HRM', label: 'HRM'}, {value: 'HRM2', label: 'HRM2'}]

  treeList: NzTreeNodeOptions[] = [
    {
      key: 'title1',
      title: '제목1',
      isLeaf: false,
      children: [
        {
          key: 'content1',
          title: '본문1',
          isLeaf: true
        },
        {
          key: 'content1',
          title: '본문2',
          isLeaf: true
        },
      ]
    },
    {
      key: 'title2',
      title: '제목2',
      isLeaf: false,
      children: [
      ]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.fg = this.fb.group({
      input_text: ['test', [ Validators.required ]],
      input_textarea: ['text area', [ Validators.required ]],
      input_date: [new Date(), [ Validators.required ]],
      input_number: [1, [ Validators.required ]],
      input_select: [null, [ Validators.required ]],
      input_treeselect: [null, [ Validators.required ]]
    });
  }

  ngOnInit() {
  }

}
