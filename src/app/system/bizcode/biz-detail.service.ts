import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../core/service/data.service';

import { ResponseObject } from '../../core/model/response-object';

import { BizDetail } from './biz-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BizDetailService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/common/biztype', http, tokenExtractor);
  }

  getBizDetail(typeCode: string, detailCode: string): Observable<ResponseObject<BizDetail>> {
    const url = `${this.API_URL}/${typeCode}/bizdetail/${detailCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

    return this.http.get<ResponseObject<BizDetail>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<BizDetail>>('getBizDetail', undefined))
    );
  }

  saveBizDetail(term: BizDetail): Observable<ResponseObject<BizDetail>> {
    const url = `${this.API_URL}/bizdetail`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.post<ResponseObject<BizDetail>>(url, term, options).pipe(
      catchError(this.handleError<ResponseObject<BizDetail>>('saveBizDetail', undefined))
    );
  }

  deleteBizDetail(typeCode: string, detailCode: string): Observable<ResponseObject<BizDetail>> {
    const url = `${this.API_URL}/${typeCode}/bizdetail/${detailCode}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<BizDetail>>(url, options).pipe(
        catchError(this.handleError<ResponseObject<BizDetail>>('deleteBizDetail', undefined))
      );
  }

}
