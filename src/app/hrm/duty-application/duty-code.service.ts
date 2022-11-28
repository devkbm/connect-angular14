import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';
import { DutyCode } from './duty-code';


@Injectable({
  providedIn: 'root'
})
export class DutyCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/hrm', http, tokenExtractor);
  }

  getDutyCodeList(params: any): Observable<ResponseList<DutyCode>> {
    const url = `${this.API_URL}/dutycode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<DutyCode>>(url, options).pipe(
      catchError(this.handleError<ResponseList<DutyCode>>('getDutyCodeList', undefined))
    );
  }

  getValidDutyCode(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/dutycode/${id}/valid`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getValidDutyCode', undefined))
    );
  }

  /**
   * 근태코드정보를 조회한다.
   * @param id 근태코드
   */
  getDutyCode(id: string): Observable<ResponseObject<DutyCode>> {
    const url = `${this.API_URL}/dutycode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<DutyCode>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<DutyCode>>('getDutyCode', undefined))
    );
  }

  /**
   * 근태코드정보를 저장한다.
   * @param dutyCode 근태코드정보
   */
  saveDutyCode(dutyCode: DutyCode): Observable<ResponseObject<DutyCode>> {
    const url = `${this.API_URL}/dutycode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<DutyCode>>(url, dutyCode, options).pipe(
      catchError(this.handleError<ResponseObject<DutyCode>>('saveDutyCode', undefined))
    );
  }

  /**
   * 근태코드정보를 삭제한다.
   * @param id 근태코드
   */
  deleteDutyCode(id: string): Observable<ResponseObject<DutyCode>> {
    const url = `${this.API_URL}/dutycode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<DutyCode>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<DutyCode>>('deleteDutyCode', undefined))
              );
  }

}
