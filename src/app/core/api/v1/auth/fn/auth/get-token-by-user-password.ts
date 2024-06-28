/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GrantType } from '../../models/grant-type';
import { Token } from '../../models/token';

export interface GetTokenByUserPassword$Params {
  grant_type?: GrantType;
  refresh_token?: string;
  
    /**
     * Get token by grant type and password
     */
    body?: ({
'grant_type': GrantType;
'refresh_token': string;
} | {
'grant_type': GrantType;
'username': string;
'password': string;
'scope': string;
'otp': string;
})
}

export function getTokenByUserPassword(http: HttpClient, rootUrl: string, params?: GetTokenByUserPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Token>> {
  const rb = new RequestBuilder(rootUrl, getTokenByUserPassword.PATH, 'post');
  if (params) {
    rb.query('grant_type', params.grant_type, {});
    rb.query('refresh_token', params.refresh_token, {});
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

getTokenByUserPassword.PATH = '/oauth2/token';
