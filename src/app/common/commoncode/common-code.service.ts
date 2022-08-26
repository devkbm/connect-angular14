import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../core/service/data.service';
import { ResponseObject } from '../../core/model/response-object';
import { ResponseList } from '../../core/model/response-list';

import { CommonCode } from './common-code.model';
import { CommonCodeHierarchy } from './common-code-hierarchy.model';
import { GlobalProperty } from 'src/app/core/global-property';
import { SystemTypeEnum } from './system-type-enum.model';


@Injectable()
export class CommonCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/common/code', http, tokenExtractor);
  }

  getSystemTypeList(): Observable<ResponseList<SystemTypeEnum>> {
    const url = `${this.API_URL}/systemtype`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<SystemTypeEnum>>(url, options).pipe(
    );
  }


  getCommonCodeList(params?: any): Observable<ResponseList<CommonCode>> {
    const url = `${this.API_URL}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<CommonCode>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  getCommonCode(id: string): Observable<ResponseObject<CommonCode>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<CommonCode>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  getCommonCodeHierarchy(params?: any): Observable<ResponseList<CommonCodeHierarchy>> {
    const url = GlobalProperty.serverUrl + `/api/common/codetree`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<CommonCodeHierarchy>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  getCommonCodeListByParentId(parentId: string): Observable<ResponseList<CommonCode>> {
    const url = `${this.API_URL}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: {
          parentId : parentId
        }
     };

    return this.http.get<ResponseList<CommonCode>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  registerCommonCode(program: CommonCode): Observable<ResponseObject<CommonCode>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.post<ResponseObject<CommonCode>>(url, program, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

  deleteCommonCode(id: string): Observable<ResponseObject<CommonCode>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.delete<ResponseObject<CommonCode>>(url, options).pipe(
      //catchError((err) => Observable.throw(err))
    );
  }

}
