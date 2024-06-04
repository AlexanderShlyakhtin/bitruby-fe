/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Token } from '../../models/token';

export interface GetTokenByUserPassword$Params {
  
    /**
     * Get token by username and password
     */
    body?: {
'grant_type': string;
'username': string;
'password': string;
'scope': string;
}
}

export function getTokenByUserPassword(http: HttpClient, rootUrl: string, params?: GetTokenByUserPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Token>> {
  const rb = new RequestBuilder(rootUrl, getTokenByUserPassword.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Token>;
    })
  );
}

getTokenByUserPassword.PATH = '/auth/oauth2/token';
