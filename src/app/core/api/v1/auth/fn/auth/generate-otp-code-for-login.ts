/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {OtpLogin} from '../../models/otp-login';
import {OtpLoginResult} from '../../models/otp-login-result';

export interface GenerateOtpCodeForLogin$Params {
  'x-request-id': string;
  
    /**
     * Generate OTP token for user login
     */
    body?: OtpLogin
}

export function generateOtpCodeForLogin(http: HttpClient, rootUrl: string, params: GenerateOtpCodeForLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<OtpLoginResult>> {
  const rb = new RequestBuilder(rootUrl, generateOtpCodeForLogin.PATH, 'post');
  if (params) {
    rb.header('x-request-id', params['x-request-id'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OtpLoginResult>;
    })
  );
}

generateOtpCodeForLogin.PATH = '/oauth2/otp';
