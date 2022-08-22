import { Injectable } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DataService } from './data.service';
import { ResponseObject } from '../model/response-object';
import { User } from '../../common/user/user.model';
import { GlobalProperty } from 'src/app/global-property';


@Injectable()
export class UserSessionService extends DataService {
  private STATIC_URI = '/static/';

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/common/user', http, tokenExtractor);
    this.STATIC_URI = GlobalProperty.serverUrl + '/static/';
  }

  getAvartarImageString(): string {
    return this.STATIC_URI + sessionStorage.getItem('imageUrl');
  }

  getSessionUserInfo(): Observable<ResponseObject<User>> {
    const url = `${this.API_URL}/myinfo`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .get<ResponseObject<User>>(url, options).pipe(
        //catchError((err) => Observable.throw(err))
      );
  }
}
