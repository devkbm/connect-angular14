import { Component, Input, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { saveAs } from 'file-saver';
import { GlobalProperty } from 'src/app/core/global-property';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-image-upload',
  template: `
  <div style="text-align: center;">
    <img nz-image [nzSrc]="imageSrc + imageBase64" width="100px" height="100px" />
    <br/>
    <nz-space [nzAlign]="'center'">
      <nz-upload
          nzAction="uploadUrl"
          [nzShowButton]="isShowUploadButton"
          [nzShowUploadList]="false"
          [nzPreview]="handlePreview"
          [nzRemove]="handleRemove"
          [nzWithCredentials]="true"
          [nzData]="uploadParam"
          [nzHeaders]="uploadHeader"
          [nzFileList]="fileList"
          (nzChange)="fileUploadChange($event)">
          <button nz-button><i nz-icon nzType="upload"></i></button>
      </nz-upload>
      <button nz-button (click)="downloadImage()">
        <i nz-icon nzType="download"></i>
      </button>
    </nz-space>
  </div>
  `,
  styles: [`
  `]
})
export class UserImageUploadComponent implements OnInit {

  previewImage: string | undefined = '';

  uploadHeader: any = { Authorization: sessionStorage.getItem('token') };
  @Input() uploadParam: any = { userId: '0011' };
  uploadUrl: string = GlobalProperty.serverUrl + '/api/common/user/image';

  showUploadList = {
    showPreviewIcon: false,
    showDownloadIcon: false,
    showRemoveIcon: false
  };

  imageSrc: string = GlobalProperty.serverUrl + '/static/';
  isShowUploadButton: boolean = true;
  @Input() imageWidth: string = '150px';
  @Input() imageHeight: string = '200px';
  @Input() imageBase64: any;
  @Input() userId: string = '';

  /*{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }*/
  fileList: NzUploadFile[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.uploadHeader = {
      "Content-Type": "multipart/form-data",
      "Accept": "application/json",
      "Authorization": sessionStorage.getItem('token')
    }
  }

  // 미리보기 버튼 클릭시
  handlePreview = (file: NzUploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
  }

  // 삭제버튼 클릭스
  handleRemove = (file: NzUploadFile) => {
    console.log(file);
    return true;
  }

  fileUploadChange(param: NzUploadChangeParam): void {
    console.log(this.uploadUrl);
    console.log(param);
    console.log(this.uploadParam);
    if (param.type === 'success') {
      const serverFilePath = param.file.response.data;
      this.imageBase64 = this.findFileName(serverFilePath);
    }
  }

  downloadImage(): void {
    this.userService
        .downloadUserImage(this.userId)
        .subscribe(
          (model: Blob) => {
            const blob = new Blob([model], { type: 'application/octet-stream' });
            saveAs(blob, this.userId + ".jpg");
          }
        );
  }

  private findFileName(path: string): string {
    const names: string[] = path.split("\\");
    return names[names.length-1];
  }



  onclick() {
    //location.href=this.imageSrc + this.imageBase64;
    saveAs(this.imageSrc + this.imageBase64, 'image.jpg');
  }

}
