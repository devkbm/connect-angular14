import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from 'src/app/core/service/data.service';
import { ResponseList } from 'src/app/core/model/response-list';
import { ResponseObject } from 'src/app/core/model/response-object';

import { RoadAddressResult } from './road-address.model';

@Injectable({
  providedIn: 'root'
})
export class RoadAddressService extends DataService {

  conf: { url: string, key: string } = {
    url: 'https://www.juso.go.kr/addrlink/addrLinkApi.do',
    key: 'devU01TX0FVVEgyMDIyMTEwMTE1MDk1MjExMzE2ODM='
  }

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/api', http, tokenExtractor);
  }

  // RoadAddressResult
  get(keyword: string, currentPage: number): Observable<any> {
    //const url = `${this.API_URL}/address`;
    const url = `http://localhost:8090/sample/getAddrApi.do`;

    //const url = this.conf.url;
    const token = sessionStorage.getItem('token') as string;

    const options = {
      headers: new HttpHeaders()
                  //.set('Access-Control-Allow-Origin','http://localhost:4200')
                  //.set('Access-Control-Request-Method','GET')
                  .set('Content-Type', 'application/json')
                  .set('X-Requested-With', 'XMLHttpRequest')
                  .set('Authorization', token)
                  .set('x-auth-token', token),
      withCredentials: true,
      params: {
      //  confmKey: this.conf.key,
      //  resultType: 'json',
        keyword: keyword,
        currentPage: currentPage
      }
    };

    return this.http.get<any>(url, options).pipe(
      catchError(this.handleError<any>('get', undefined))
    );
  }

}
