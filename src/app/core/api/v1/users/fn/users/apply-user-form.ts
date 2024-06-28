/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Base } from '../../models/base';
import { UserForm } from '../../models/user-form';

export interface ApplyUserForm$Params {
  'x-request-id': string;
  
    /**
     * Generate OTP token for user login
     */
    body?: UserForm
}

export function applyUserForm(http: HttpClient, rootUrl: string, params: ApplyUserForm$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
  const rb = new RequestBuilder(rootUrl, applyUserForm.PATH, 'post');
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

applyUserForm.PATH = '/secured/verification/form';
