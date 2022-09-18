import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../core/service/data.service';
import { ResponseObject } from '../../core/model/response-object';
import { ResponseList } from '../../core/model/response-list';
import { DataDomain } from './data-domain.model';

@Injectable({
  providedIn: 'root'
})
export class DataDominService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/system/datadomin', http, tokenExtractor);
  }

  get(id: string): Observable<ResponseObject<DataDomain>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
   };

    return this.http.get<ResponseObject<DataDomain>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<DataDomain>>('get', undefined))
    );
  }

  save(term: DataDomain): Observable<ResponseObject<DataDomain>> {
    const url = `${this.API_URL}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.post<ResponseObject<DataDomain>>(url, term, options).pipe(
      catchError(this.handleError<ResponseObject<DataDomain>>('save', undefined))
    );
  }

  delete(id: string): Observable<ResponseObject<DataDomain>> {
    const url = `${this.API_URL}/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .delete<ResponseObject<DataDomain>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<DataDomain>>('delete', undefined))
              );
  }

}
