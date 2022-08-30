import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from './login.service';
import { UserToken } from './user-token.model';
import { ResponseObject } from '../../core/model/response-object';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      organizationCode: [ '001', [ Validators.required ] ],
      staffNo: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });

    const token = this.route.snapshot.params['id'];

    console.log(token);

    if (token != null) {
      sessionStorage.setItem('token', token);

      this.loginService.getAuthToken()
          .subscribe(
            (model: UserToken) => {
              this.setItemSessionStorage(model);

              this.router.navigate(['/home']);
            }
          );
    }
  }

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.loginForm.get('staffNo')?.value);

    this.loginService.doLogin('001', this.loginForm.get('staffNo')?.value, this.loginForm.get('password')?.value)

      .subscribe((model: UserToken) => {
        this.setItemSessionStorage(model);

        this.router.navigate(['/home']);
      });
  }

  private setItemSessionStorage(data: UserToken) {
    sessionStorage.setItem('organizationCode', data.organizationCode);
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('imageUrl', data.imageUrl);
    sessionStorage.setItem('menuGroupList', JSON.stringify(data.menuGroupList));
    sessionStorage.setItem('authorityList', JSON.stringify(data.authorities));
  }

  socialLogin(): void {
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[ i ].markAsDirty();
      this.loginForm.controls[ i ].updateValueAndValidity();
    }
    console.log(this.loginForm.get('userName')?.value);


    window.location.href = 'http://localhost:8090/oauth2/authorization/google';

    /*
    window.location.href =
      'http://localhost:8090/oauth2/authorization/google?response_type=code&' +
      'scope=profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&'+
      'client_id=' + '497322312042-mstkseqfmr5t8r7nch5bp17r9lh5eoen.apps.googleusercontent.com'+
      '&redirect_uri='+ 'http%3A%2F%2Flocalhost%3A8090%2Flogin%2Foauth2%2Fcode%2Fgoogle';
    */
    /*
    this.loginService
      .getSocialLogin()
      .subscribe(
        (model: any) => {
          this.router.navigate(['/home']);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('완료');
          this.router.navigate(['/home']);
        }
      );
    */
  }

  socialLogin2(): void {
    this.loginService.getAuthToken()
          .subscribe(
            (model: UserToken) => {
              console.log(model);

              sessionStorage.setItem('token', model.token);
              sessionStorage.setItem('imageUrl', model.imageUrl);
              sessionStorage.setItem('menuGroupList', JSON.stringify(model.menuGroupList));
              sessionStorage.setItem('authorityList', JSON.stringify(model.authorities));


              this.router.navigate(['/home']);
            }
          );
  }

  test() {
    window.open('/home','_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,status=no,top=500,left=500,width=400,height=400');
  }
}
