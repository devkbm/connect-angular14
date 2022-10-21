import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';

import { HrmType } from './hrm-type.model';
import { HrmCode } from './hrm-code.model';
import { HrmRelationCode } from './hrm-relation-code';


@Injectable({
  providedIn: 'root'
})
export class HrmCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/hrm', http, tokenExtractor);
  }

  getHrmTypeList(params: any): Observable<ResponseList<HrmType>> {
    const url = `${this.API_URL}/hrmtype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmType>>(url, options).pipe(
      catchError(this.handleError<ResponseList<HrmType>>('getHrmTypeList', undefined))
    );
  }

  getVaildHrmType(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/hrmtype/${id}/valid`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getVaildHrmType', undefined))
    );
  }

  getHrmType(id: string): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmType>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<HrmType>>('getHrmType', undefined))
    );
  }


  saveHrmType(dept: HrmType): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmType>>(url, dept, options).pipe(
      catchError(this.handleError<ResponseObject<HrmType>>('saveHrmType', undefined))
    );
  }

  deleteHrmType(id: string): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmType>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<HrmType>>('deleteHrmType', undefined))
              );
  }

  getHrmTypeDetailCodeList(params: any): Observable<ResponseList<HrmCode>> {
    const url = `${this.API_URL}/hrmtype/code`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmCode>>(url, options).pipe(
      catchError(this.handleError<ResponseList<HrmCode>>('getHrmTypeDetailCodeList', undefined))
    );
  }

  getValidHrmTypeDetailCode(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/hrmtype/code/${id}/valid`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getValidHrmTypeDetailCode', undefined))
    );
  }

  getHrmTypeDetailCode(codeType: string, code: string): Observable<ResponseObject<HrmCode>> {
    const url = `${this.API_URL}/hrmtype/${codeType}/code/${code}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmCode>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<HrmCode>>('getHrmTypeDetailCode', undefined))
    );
  }


  saveHrmTypeDetailCode(dept: HrmType): Observable<ResponseObject<HrmCode>> {
    const url = `${this.API_URL}/hrmtype/type/code`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmCode>>(url, dept, options).pipe(
      catchError(this.handleError<ResponseObject<HrmCode>>('saveHrmTypeDetailCode', undefined))
    );
  }

  deleteHrmTypeDetailCode(codeType: string, code: string): Observable<ResponseObject<HrmCode>> {
    const url = `${this.API_URL}/hrmtype/${codeType}/code/${code}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmCode>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<HrmCode>>('deleteHrmTypeDetailCode', undefined))
              );
  }

  getHrmRelationCodeList(params: any): Observable<ResponseList<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmRelationCode>>(url, options).pipe(
      catchError(this.handleError<ResponseList<HrmRelationCode>>('getHrmRelationCodeList', undefined))
    );
  }

  getHrmRelationCode(id: string): Observable<ResponseObject<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmRelationCode>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<HrmRelationCode>>('getHrmRelationCode', undefined))
    );
  }

  saveHrmRelationCode(code: HrmRelationCode): Observable<ResponseObject<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmRelationCode>>(url, code, options).pipe(
      catchError(this.handleError<ResponseObject<HrmRelationCode>>('saveHrmRelationCode', undefined))
    );
  }

  deleteHrmRelationCode(id: string): Observable<ResponseObject<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmRelationCode>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<HrmRelationCode>>('deleteHrmRelationCode', undefined))
              );
  }

}
