import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { ResponseObject } from '../model/response-object';
import { WebResource } from '../../common/webresource/web-resource';
import { WebResourceService } from '../../common/webresource/web-resource.service';
import { AppInjector } from './app-injector.service';

export class AppBase {

  protected appId: string = '';

  //private programService: WebResourceService;

  constructor(protected _location: Location) {
    //this.programService = AppInjector.injector.get(WebResourceService);
  }

  goBack() {
    this._location.back();
  }

  goFoward() {
    this._location.forward();
  }

  //getAppInfo(): Observable<ResponseObject<WebResource>> {
    //return this.programService.getProgram(this.appId);
  //}

}
