import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';


import { DataService } from '../../../core/service/data.service';
import { ResponseObject } from '../../../core/model/response-object';
import { ResponseList } from '../../../core/model/response-list';


import { AppointmentCode } from '../model/appointment-code';
import { AppointmentCodeDetail } from '../model/appointment-code-detail';

@Injectable()
export class AppointmentCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getAppointmentCodeList(params?: any): Observable<ResponseList<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<AppointmentCode>>(url, options).pipe(
      catchError(this.handleError<ResponseList<AppointmentCode>>('getAppointmentCodeList', undefined))
    );
  }

  getValidAppointmentCode(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/appointmentcode/${id}/valid`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getValidAppointmentCode', undefined))
    );
  }

  getAppointmentCode(id: string): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<AppointmentCode>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<AppointmentCode>>('getAppointmentCode', undefined))
    );
  }


  saveAppointmentCode(appointmentCode: AppointmentCode): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<AppointmentCode>>(url, appointmentCode, options).pipe(
      catchError(this.handleError<ResponseObject<AppointmentCode>>('saveAppointmentCode', undefined))
    );
  }

  deleteAppointmentCode(id: string): Observable<ResponseObject<AppointmentCode>> {
    const url = `${this.API_URL}/appointmentcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<AppointmentCode>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<AppointmentCode>>('deleteAppointmentCode', undefined))
              );
  }

  getTypeList(): Observable<ResponseList<any>> {
    const url = `${this.API_URL}/typelist`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<any>>(url, options).pipe(
      catchError(this.handleError<ResponseList<any>>('getTypeList', undefined))
    );
  }

  getTypeCodeList(type: string): Observable<ResponseList<any>> {
    const param = {hrmType: type};
    const url = `${this.API_URL}/hrmtype`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: param
     };

    return this.http.get<ResponseList<any>>(url, options).pipe(
      catchError(this.handleError<ResponseList<any>>('getTypeCodeList', undefined))
    );
  }

  getAppointmentCodeDetailList(params?: any): Observable<ResponseList<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<AppointmentCodeDetail>>(url, options).pipe(
      catchError(this.handleError<ResponseList<AppointmentCodeDetail>>('getAppointmentCodeDetailList', undefined))
    );
  }

  getAppointmentCodeDetail(id: string, detailId: string): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail/${id}/${detailId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<AppointmentCodeDetail>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<AppointmentCodeDetail>>('getAppointmentCodeDetail', undefined))
    );
  }

  saveAppointmentCodeDetail(appointmentCode: AppointmentCode): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<AppointmentCodeDetail>>(url, appointmentCode, options).pipe(
      catchError(this.handleError<ResponseObject<AppointmentCodeDetail>>('saveAppointmentCodeDetail', undefined))
    );
  }

  deleteAppointmentCodeDetail(id: string, detailId: string): Observable<ResponseObject<AppointmentCodeDetail>> {
    const url = `${this.API_URL}/appointmentcodedetail/${id}/${detailId}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<AppointmentCodeDetail>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<AppointmentCodeDetail>>('deleteAppointmentCodeDetail', undefined))
              );
  }

}
