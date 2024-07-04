/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {generateOtpCodeForLogin, GenerateOtpCodeForLogin$Params} from '../fn/otp-login/generate-otp-code-for-login';
import {GenerateOtpCodeLoginResult} from '../models/generate-otp-code-login-result';

@Injectable({ providedIn: 'root' })
export class OtpLoginService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `generateOtpCodeForLogin()` */
  static readonly GenerateOtpCodeForLoginPath = '/public/generate-otp/login';

  /**
   * Generate and send OTP code for login.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateOtpCodeForLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateOtpCodeForLogin$Response(params: GenerateOtpCodeForLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<GenerateOtpCodeLoginResult>> {
    return generateOtpCodeForLogin(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate and send OTP code for login.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateOtpCodeForLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateOtpCodeForLogin(params: GenerateOtpCodeForLogin$Params, context?: HttpContext): Observable<GenerateOtpCodeLoginResult> {
    return this.generateOtpCodeForLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<GenerateOtpCodeLoginResult>): GenerateOtpCodeLoginResult => r.body)
    );
  }

}
