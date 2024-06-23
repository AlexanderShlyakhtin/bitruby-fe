/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {Base} from '../../models/base';
import {OtpCodeCheck} from '../../models/otp-code-check';

export interface CompleteRegistration$Params {
  'x-request-id': string;
  
    /**
     * Generate OTP token for user login
     */
    body?: OtpCodeCheck
}

export function completeRegistration(http: HttpClient, rootUrl: string, params: CompleteRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
  const rb = new RequestBuilder(rootUrl, completeRegistration.PATH, 'post');
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

completeRegistration.PATH = '/public/registration/complete-registration';
