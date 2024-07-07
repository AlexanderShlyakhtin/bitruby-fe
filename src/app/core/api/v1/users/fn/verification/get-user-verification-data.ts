/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {UserVerification} from '../../models/user-verification';

export interface GetUserVerificationData$Params {
  'x-request-id': string;
}

export function getUserVerificationData(http: HttpClient, rootUrl: string, params: GetUserVerificationData$Params, context?: HttpContext): Observable<StrictHttpResponse<UserVerification>> {
  const rb = new RequestBuilder(rootUrl, getUserVerificationData.PATH, 'get');
  if (params) {
    rb.header('x-request-id', params['x-request-id'], {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserVerification>;
    })
  );
}

getUserVerificationData.PATH = '/secured/verification';
