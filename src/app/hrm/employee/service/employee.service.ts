import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';


import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../core/service/data.service';
import { ResponseObject } from '../../../core/model/response-object';
import { ResponseList } from '../../../core/model/response-list';
import { EmployeeModel } from '../model/employee-model';
import { NewEmployee } from '../model/new-employee';
import { SearchEmployee } from '../model/search-employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getAppointmentCodeList(params?: any): Observable<ResponseList<EmployeeModel>> {
    const url = `${this.API_URL}/employee`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<EmployeeModel>>(url, options).pipe(
      catchError(this.handleError<ResponseList<EmployeeModel>>('getAppointmentCodeList', undefined))
    );
  }

  getEmployeeList(params: SearchEmployee): Observable<ResponseList<EmployeeModel>> {
    const url = `${this.API_URL}/employee`;
    const obj:any = params;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: obj
    };

    return this.http.get<ResponseList<EmployeeModel>>(url, options).pipe(
      catchError(this.handleError<ResponseList<EmployeeModel>>('getEmployeeList', undefined))
    );
  }

  getEmployee(id: string): Observable<ResponseObject<EmployeeModel>> {
    const url = `${this.API_URL}/employee/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<EmployeeModel>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<EmployeeModel>>('getEmployee', undefined))
    );
  }

  saveEmployee(obj: EmployeeModel): Observable<ResponseObject<EmployeeModel>> {
    const url = `${this.API_URL}/employee`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<EmployeeModel>>(url, obj, options).pipe(
      catchError(this.handleError<ResponseObject<EmployeeModel>>('saveEmployee', undefined))
    );
  }

  createEmployee(obj: NewEmployee): Observable<ResponseObject<EmployeeModel>> {
    const url = `${this.API_URL}/employee/create`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<EmployeeModel>>(url, obj, options).pipe(
      catchError(this.handleError<ResponseObject<EmployeeModel>>('createEmployee', undefined))
    );
  }

  downloadEmployeeImage(employeeId: string): Observable<Blob> {
    const url = `${this.API_URL}/employee/downloadimage`;
    const obj:any = {employeeId: employeeId};
    const token = sessionStorage.getItem('token') as string;

    const options = {
      headers: new HttpHeaders().set('X-Auth-Token', token),
      responseType: 'blob' as 'json',
      withCredentials: true,
      params: obj
    };

    return this.http.get<Blob>(url, options).pipe(
      catchError(this.handleError<Blob>('downloadEmployeeImage', undefined))
    );
  }

}
