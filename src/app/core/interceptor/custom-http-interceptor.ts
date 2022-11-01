import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  headerInfo?: HttpHeaders;
  exceptUrls: string[] = [
    'http://localhost:8090/api/system/user/login',      // 로그인페이지 url
    'http://localhost:8090/api/system/file/',           // 파일업로드 url
    'http://localhost:8090/api/system/user/image',      // 프로필 이미지 url
    'http://localhost:8090/api/hrm/staff/changeimage',   // 직원 사진 url
    'http://localhost:8090/api/address'                 // 주소검색 url
  ];

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headerName = 'XSRF-TOKEN';
    const token = this.tokenExtractor.getToken() as string;

    if (token !== null && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, token) });
    }

    if (this.isExceptUrl(req.url)) {
      return next.handle(req);
    } else {
      req = this.setParameters(req);
    }

    return next.handle(req);
  }

  isExceptUrl(url: string): boolean {
    for (const urlString of this.exceptUrls) {
      if (urlString === url) return true;
    }
    return false;
  }

  setParameters(req: HttpRequest<any>): HttpRequest<any> {
    if (req.method.toLowerCase() === 'get' || req.method.toLowerCase() === 'delete') {
      req = this.setParamsGET(req);
    } else if (req.method.toLowerCase() === 'post') {
      if (req.body instanceof FormData) {
        req =  this.setFormDataBodyPOST(req);
      } else {
        req = this.setBodyPOST(req);
      }
    }

    return req;
  }

  private setParamsGET(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      params: req.params.set('organizationCode', String(sessionStorage.getItem('organizationCode')))
    });
  }

  private setBodyPOST(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      body: { ...req.body, organizationCode: String(sessionStorage.getItem('organizationCode')), clientAppUrl: window.location.href }
    });
  }

  private setFormDataBodyPOST(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      body: req.body.append('organizationCode', String(sessionStorage.getItem('organizationCode')))
                    .append('clientAppUrl', window.location.href)
    });
  }

}
