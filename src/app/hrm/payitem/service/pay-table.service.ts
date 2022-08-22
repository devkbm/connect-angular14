import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../core/service/data.service';
import { ResponseObject } from '../../../core/model/response-object';
import { ResponseList } from '../../../core/model/response-list';
import { PayItem } from '../model/pay-item';
import { PayTable } from '../model/pay-table';
import { PayTableItem } from '../model/pay-table-item';

@Injectable({
  providedIn: 'root'
})
export class PayTableService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getPayTableList(params: any): Observable<ResponseList<PayTable>> {
    const url = `${this.API_URL}/paytable`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<PayTable>>(url, options).pipe(
      catchError(this.handleError<ResponseList<PayTable>>('getPayTableList', undefined))
    );
  }

  /**
   * 급여테이블을 조회한다.
   * @param id
   */
  getPayTable(id: string): Observable<ResponseObject<PayTable>> {
    const url = `${this.API_URL}/paytable/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<PayTable>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<PayTable>>('getPayTable', undefined))
    );
  }

  /**
   * 급여항목을 저장한다.
   * @param entity 근태신청정보
   */
  savePayTable(entity: PayItem): Observable<ResponseObject<PayTable>> {
    const url = `${this.API_URL}/paytable`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<PayTable>>(url, entity, options).pipe(
      catchError(this.handleError<ResponseObject<PayTable>>('savePayTable', undefined))
    );
  }

  /**
   * 급여항목을 삭제한다.
   * @param id
   */
  deletePayTable(id: string): Observable<ResponseObject<PayTable>> {
    const url = `${this.API_URL}/paytable/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<PayTable>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<PayTable>>('deletePayTable', undefined))
              );
  }


  /**
   * 급여테이블항목을 조회한다.
   * @param id
   */
  getPayTableItemList(payTableId: any): Observable<ResponseList<PayTable>> {
    const url = `${this.API_URL}/paytable/${payTableId}/item`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseList<PayTable>>(url, options).pipe(
      catchError(this.handleError<ResponseList<PayTable>>('getPayTableList', undefined))
    );
  }

  /**
   * 급여테이블항목을 조회한다.
   * @param id
   */
  getPayTableItem(paytableId: string, id: string): Observable<ResponseObject<PayTableItem>> {
    const url = `${this.API_URL}/paytable/${paytableId}/item/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<PayTableItem>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<PayTableItem>>('getPayTableItem', undefined))
    );
  }

  /**
   * 급여테이블항목을 저장한다.
   * @param entity 급여테이블항목
   */
  savePayTableItem(entity: PayTableItem): Observable<ResponseObject<PayTableItem>> {
    const url = `${this.API_URL}/paytable/item`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<PayTableItem>>(url, entity, options).pipe(
      catchError(this.handleError<ResponseObject<PayTableItem>>('savePayTableItem', undefined))
    );
  }

  /**
   * 급여테이블항목을 삭제한다.
   * @param id
   */
  deletePayTableItem(paytableId: string, id: string): Observable<ResponseObject<PayTableItem>> {
    const url = `${this.API_URL}/paytable/${paytableId}/item/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<PayTableItem>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<PayTableItem>>('deletePayTableItem', undefined))
              );
  }
}
