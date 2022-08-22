import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    headerInfo?: HttpHeaders;

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerName = 'XSRF-TOKEN';
        const token = this.tokenExtractor.getToken() as string;

        if (token !== null && !req.headers.has(headerName)) {
            req = req.clone({ headers: req.headers.set(headerName, token) });
        }

        if (req.url === 'http://localhost:8090/common/user/login') { // 로그인 제외
          return next.handle(req);
        } else if (req.url === 'http://localhost:8090/common/file/') { // 파일업로드 제외
        return next.handle(req);
        }

        if (req.method.toLowerCase() === 'get') {
          req = this.setParamsGET(req);
        } else if (req.method.toLowerCase() === 'post') {
          if (req.body instanceof FormData) {
            req =  this.setFormDataBodyPOST(req);
          } else {
            req = this.setBodyPOST(req);
          }
        }

        return next.handle(req);
    }

    private setParamsGET(req: HttpRequest<any>): HttpRequest<any> {
      return req.clone({
        params: req.params.set('organizationCode', String(sessionStorage.getItem('organizationCode')))
      });
    }

    private setBodyPOST(req: HttpRequest<any>): HttpRequest<any> {
      return req.clone({
        body: { ...req.body, organizationCode: String(sessionStorage.getItem('organizationCode')), appUrl: req.url }
      });
    }

    private setFormDataBodyPOST(req: HttpRequest<any>): HttpRequest<any> {
      return req.clone({
        body: req.body.append('organizationCode', String(sessionStorage.getItem('organizationCode')))
                      .append('appUrl',req.url)
      });
    }

}
