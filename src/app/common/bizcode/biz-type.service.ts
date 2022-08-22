import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../core/service/data.service';

import { BizType } from './biz-type.model';
import { ResponseObject } from '../../core/model/response-object';

@Injectable({
  providedIn: 'root'
})
export class BizTypeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/common/biztype', http, tokenExtractor);
  }

  getBizType(id: string): Observable<ResponseObject<BizType>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

    return this.http.get<ResponseObject<BizType>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<BizType>>('getBizType', undefined))
    );
  }

  saveBizType(term: BizType): Observable<ResponseObject<BizType>> {
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.post<ResponseObject<BizType>>(this.API_URL, term, options).pipe(
      catchError(this.handleError<ResponseObject<BizType>>('saveBizType', undefined))
    );
  }

  deleteBizType(id: string): Observable<ResponseObject<BizType>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
      .delete<ResponseObject<BizType>>(url, options).pipe(
        catchError(this.handleError<ResponseObject<BizType>>('deleteBizType', undefined))
      );
  }

}
