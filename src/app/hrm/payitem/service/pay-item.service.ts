import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';


import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../core/service/data.service';
import { ResponseObject } from '../../../core/model/response-object';
import { ResponseList } from '../../../core/model/response-list';
import { PayItem } from '../model/pay-item';

@Injectable({
  providedIn: 'root'
})
export class PayItemService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getPayItemList(params: any): Observable<ResponseList<PayItem>> {
    const url = `${this.API_URL}/payitem`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<PayItem>>(url, options).pipe(
      catchError(this.handleError<ResponseList<PayItem>>('getPayItemList', undefined))
    );
  }

  /**
   * 급여항목을 조회한다.
   * @param id
   */
  getPayItem(id: string): Observable<ResponseObject<PayItem>> {
    const url = `${this.API_URL}/payitem/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<PayItem>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<PayItem>>('getPayItem', undefined))
    );
  }

  /**
   * 급여항목을 저장한다.
   * @param payItem 근태신청정보
   */
  savePayItem(payItem: PayItem): Observable<ResponseObject<PayItem>> {
    const url = `${this.API_URL}/payitem`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<PayItem>>(url, payItem, options).pipe(
      catchError(this.handleError<ResponseObject<PayItem>>('savePayItem', undefined))
    );
  }

  /**
   * 급여항목을 삭제한다.
   * @param id
   */
  deletePayItem(id: string): Observable<ResponseObject<PayItem>> {
    const url = `${this.API_URL}/payitem/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<PayItem>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<PayItem>>('deletePayItem', undefined))
              );
  }

}
