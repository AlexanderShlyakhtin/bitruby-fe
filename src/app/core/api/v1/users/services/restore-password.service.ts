/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {Base} from '../models/base';
import {
    checkOtpCodeForRestoringPassword,
    CheckOtpCodeForRestoringPassword$Params
} from '../fn/restore-password/check-otp-code-for-restoring-password';
import {
    generateOtpCodeForRestoringPassword,
    GenerateOtpCodeForRestoringPassword$Params
} from '../fn/restore-password/generate-otp-code-for-restoring-password';
import {restorePassword, RestorePassword$Params} from '../fn/restore-password/restore-password';
import {RestorePasswordRequestOtpResult} from '../models/restore-password-request-otp-result';

@Injectable({ providedIn: 'root' })
export class RestorePasswordService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `restorePassword()` */
  static readonly RestorePasswordPath = '/public/restore-password';

  /**
   * Restore forgotten password.
   *
   * Restore forgotten password
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restorePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restorePassword$Response(params: RestorePassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
    return restorePassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Restore forgotten password.
   *
   * Restore forgotten password
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `restorePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  restorePassword(params: RestorePassword$Params, context?: HttpContext): Observable<Base> {
    return this.restorePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<Base>): Base => r.body)
    );
  }

  /** Path part for operation `generateOtpCodeForRestoringPassword()` */
  static readonly GenerateOtpCodeForRestoringPasswordPath = '/public/generate-otp/restore-password';

  /**
   * Generate and send OTP code for Restoring the password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateOtpCodeForRestoringPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateOtpCodeForRestoringPassword$Response(params: GenerateOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<RestorePasswordRequestOtpResult>> {
    return generateOtpCodeForRestoringPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate and send OTP code for Restoring the password.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateOtpCodeForRestoringPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateOtpCodeForRestoringPassword(params: GenerateOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<RestorePasswordRequestOtpResult> {
    return this.generateOtpCodeForRestoringPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<RestorePasswordRequestOtpResult>): RestorePasswordRequestOtpResult => r.body)
    );
  }

  /** Path part for operation `checkOtpCodeForRestoringPassword()` */
  static readonly CheckOtpCodeForRestoringPasswordPath = '/public/generate-otp/restore-password/check';

  /**
   * Check generatred OTP code to Restore user the password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `checkOtpCodeForRestoringPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkOtpCodeForRestoringPassword$Response(params: CheckOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
    return checkOtpCodeForRestoringPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Check generatred OTP code to Restore user the password.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `checkOtpCodeForRestoringPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  checkOtpCodeForRestoringPassword(params: CheckOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<Base> {
    return this.checkOtpCodeForRestoringPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<Base>): Base => r.body)
    );
  }

}
