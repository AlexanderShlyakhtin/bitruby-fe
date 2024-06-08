/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { generateOtpCodeForLogin } from '../fn/otp/generate-otp-code-for-login';
import { GenerateOtpCodeForLogin$Params } from '../fn/otp/generate-otp-code-for-login';
import { generateOtpCodeForRegistration } from '../fn/otp/generate-otp-code-for-registration';
import { GenerateOtpCodeForRegistration$Params } from '../fn/otp/generate-otp-code-for-registration';

@Injectable({ providedIn: 'root' })
export class OtpService extends BaseService {
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
  generateOtpCodeForLogin$Response(params?: GenerateOtpCodeForLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
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
  generateOtpCodeForLogin(params?: GenerateOtpCodeForLogin$Params, context?: HttpContext): Observable<void> {
    return this.generateOtpCodeForLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `generateOtpCodeForRegistration()` */
  static readonly GenerateOtpCodeForRegistrationPath = '/public/generate-otp/registration';

  /**
   * Generate and send OTP code for Registration.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generateOtpCodeForRegistration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateOtpCodeForRegistration$Response(params?: GenerateOtpCodeForRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return generateOtpCodeForRegistration(this.http, this.rootUrl, params, context);
  }

  /**
   * Generate and send OTP code for Registration.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `generateOtpCodeForRegistration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generateOtpCodeForRegistration(params?: GenerateOtpCodeForRegistration$Params, context?: HttpContext): Observable<void> {
    return this.generateOtpCodeForRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
