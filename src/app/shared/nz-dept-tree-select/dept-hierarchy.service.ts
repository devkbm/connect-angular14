import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../core/service/data.service';
import { ResponseObject } from '../../core/model/response-object';
import { ResponseList } from '../../core/model/response-list';

import { DeptHierarchy } from './dept-hierarchy.model';
import { GlobalProperty } from 'src/app/global-property';

@Injectable()
export class DeptHierarchyService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/common/dept', http, tokenExtractor);
  }

  getDeptHierarchyList(params?: any): Observable<ResponseList<DeptHierarchy>> {
    const url = GlobalProperty.serverUrl + '/api/common/depttree';
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<DeptHierarchy>>(url, options).pipe(
      catchError(this.handleError<ResponseList<DeptHierarchy>>('getDeptHierarchyList', undefined))
    );
  }

}
