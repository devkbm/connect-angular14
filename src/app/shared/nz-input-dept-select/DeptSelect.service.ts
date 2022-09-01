import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../core/service/data.service';
import { ResponseList } from '../../core/model/response-list';

export interface Dept {
  deptId: string;
  deptCode: string;
  parentDeptCode: string;
  deptNameKorean: string;
  deptAbbreviationKorean: string;
  deptNameEnglish: string;
  deptAbbreviationEnglish: string;
  fromDate: Date;
  toDate: Date;
  seq: number;
  comment: string;
  [key:string]:any;
}

@Injectable({
  providedIn: 'root'
})
export class DeptSelectService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api/common/dept', http, tokenExtractor);
  }

  getDeptList(params?: any): Observable<ResponseList<Dept>> {
    const url = `${this.API_URL}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<Dept>>(url, options).pipe(
      catchError(this.handleError<ResponseList<Dept>>('getDeptList', undefined))
    );
  }

}
