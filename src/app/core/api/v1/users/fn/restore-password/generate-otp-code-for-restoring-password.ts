/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {OtpCode} from '../../models/otp-code';
import {RestorePasswordRequestOtpResult} from '../../models/restore-password-request-otp-result';

export interface GenerateOtpCodeForRestoringPassword$Params {
  'x-request-id': string;
  
    /**
     * Generate OTP token for restoring the password
     */
    body?: OtpCode
}

export function generateOtpCodeForRestoringPassword(http: HttpClient, rootUrl: string, params: GenerateOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<RestorePasswordRequestOtpResult>> {
  const rb = new RequestBuilder(rootUrl, generateOtpCodeForRestoringPassword.PATH, 'post');
  if (params) {
    rb.header('x-request-id', params['x-request-id'], {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RestorePasswordRequestOtpResult>;
    })
  );
}

generateOtpCodeForRestoringPassword.PATH = '/public/generate-otp/restore-password';
