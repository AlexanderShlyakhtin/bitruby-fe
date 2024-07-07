/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {Base} from '../../models/base';
import {RestorePassword} from '../../models/restore-password';

export interface RestorePassword$Params {
  'x-request-id': string;
  
    /**
     * Restore user password
     */
    body?: RestorePassword
}

export function restorePassword(http: HttpClient, rootUrl: string, params: RestorePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
  const rb = new RequestBuilder(rootUrl, restorePassword.PATH, 'post');
  if (params) {
    rb.header('x-request-id', params['x-request-id'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Base>;
    })
  );
}

restorePassword.PATH = '/public/restore-password';
