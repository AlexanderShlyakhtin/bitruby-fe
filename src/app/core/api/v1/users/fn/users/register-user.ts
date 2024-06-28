/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Base } from '../../models/base';
import { NewUser } from '../../models/new-user';

export interface RegisterUser$Params {
  'x-request-id': string;
  
    /**
     * Registration body of new user"
     */
    body?: NewUser
}

export function registerUser(http: HttpClient, rootUrl: string, params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
  const rb = new RequestBuilder(rootUrl, registerUser.PATH, 'post');
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

registerUser.PATH = '/public/registration';
