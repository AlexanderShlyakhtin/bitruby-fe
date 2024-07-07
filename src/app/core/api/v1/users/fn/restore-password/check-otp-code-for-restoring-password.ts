/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {Base} from '../../models/base';
import {OtpCodeRestorePassword} from '../../models/otp-code-restore-password';

export interface CheckOtpCodeForRestoringPassword$Params {
  'x-request-id': string;
  
    /**
     * Check OTP token for restoring the password
     */
    body?: OtpCodeRestorePassword
}

export function checkOtpCodeForRestoringPassword(http: HttpClient, rootUrl: string, params: CheckOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
  const rb = new RequestBuilder(rootUrl, checkOtpCodeForRestoringPassword.PATH, 'post');
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

checkOtpCodeForRestoringPassword.PATH = '/public/generate-otp/restore-password/check';
