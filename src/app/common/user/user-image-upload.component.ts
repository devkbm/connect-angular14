import { Component, Input, OnInit } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { saveAs } from 'file-saver';
import { GlobalProperty } from 'src/app/global-property';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-image-upload',
  templateUrl: './user-image-upload.component.html',
  styleUrls: ['./user-image-upload.component.css']
})
export class UserImageUploadComponent implements OnInit {

  previewImage: string | undefined = '';
  imageUploadUrl: string = GlobalProperty.serverUrl + '/api/common/user/image/';
  imageSrc: string = GlobalProperty.serverUrl + '/static/';
  isShowUploadButton: boolean = true;
  @Input() imageWidth: string = '150px';
  @Input() imageHeight: string = '200px';
  @Input() imageUploadParam: any;
  @Input() imageBase64: any;
  @Input() userId: string = '';

  showUploadList = {
    showPreviewIcon: false,
    showDownloadIcon: false,
    showRemoveIcon: false
  };

  fileList: NzUploadFile[] = [
    /*{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }*/
  ];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
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
    if (param.type === 'success') {
      console.log(param);
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
