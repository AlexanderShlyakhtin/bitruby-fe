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
import {completeRegistration, CompleteRegistration$Params} from '../fn/registration/complete-registration';
import {
    generateOtpCodeForRegistration,
    GenerateOtpCodeForRegistration$Params
} from '../fn/registration/generate-otp-code-for-registration';
import {RegisterNewUserResult} from '../models/register-new-user-result';
import {registerUser, RegisterUser$Params} from '../fn/registration/register-user';

@Injectable({ providedIn: 'root' })
export class RegistrationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerUser()` */
  static readonly RegisterUserPath = '/public/registration';

  /**
   * Register new user.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<RegisterNewUserResult>> {
    return registerUser(this.http, this.rootUrl, params, context);
  }

  /**
   * Register new user.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<RegisterNewUserResult> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<RegisterNewUserResult>): RegisterNewUserResult => r.body)
    );
  }

  /** Path part for operation `completeRegistration()` */
  static readonly CompleteRegistrationPath = '/public/registration/complete-registration';

  /**
   * Complete registration of new user.
   *
   * Complete registration of the user by email confirmation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeRegistration()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeRegistration$Response(params: CompleteRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
    return completeRegistration(this.http, this.rootUrl, params, context);
  }

  /**
   * Complete registration of new user.
   *
   * Complete registration of the user by email confirmation
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `completeRegistration$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  completeRegistration(params: CompleteRegistration$Params, context?: HttpContext): Observable<Base> {
    return this.completeRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<Base>): Base => r.body)
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
  generateOtpCodeForRegistration$Response(params: GenerateOtpCodeForRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
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
  generateOtpCodeForRegistration(params: GenerateOtpCodeForRegistration$Params, context?: HttpContext): Observable<Base> {
    return this.generateOtpCodeForRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<Base>): Base => r.body)
    );
  }

}
