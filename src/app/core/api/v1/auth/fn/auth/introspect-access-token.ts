/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {IntrospectToken} from '../../models/introspect-token';

export interface IntrospectAccessToken$Params {
  'x-request-id': string;
  
    /**
     * Get token by grant type and password
     */
    body?: {
'token': string;
}
}

export function introspectAccessToken(http: HttpClient, rootUrl: string, params: IntrospectAccessToken$Params, context?: HttpContext): Observable<StrictHttpResponse<IntrospectToken>> {
  const rb = new RequestBuilder(rootUrl, introspectAccessToken.PATH, 'post');
  if (params) {
    rb.header('x-request-id', params['x-request-id'], {});
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<IntrospectToken>;
    })
  );
}

introspectAccessToken.PATH = '/oauth2/introspect';
