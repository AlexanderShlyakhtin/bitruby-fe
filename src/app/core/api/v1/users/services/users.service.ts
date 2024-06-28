/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { applyUserForm } from '../fn/users/apply-user-form';
import { ApplyUserForm$Params } from '../fn/users/apply-user-form';
import { Base } from '../models/base';
import { completeRegistration } from '../fn/users/complete-registration';
import { CompleteRegistration$Params } from '../fn/users/complete-registration';
import { getUserVerificationData } from '../fn/users/get-user-verification-data';
import { GetUserVerificationData$Params } from '../fn/users/get-user-verification-data';
import { registerUser } from '../fn/users/register-user';
import { RegisterUser$Params } from '../fn/users/register-user';
import { restorePassword } from '../fn/users/restore-password';
import { RestorePassword$Params } from '../fn/users/restore-password';
import { UserVerification } from '../models/user-verification';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseService {
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
  registerUser$Response(params: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
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
  registerUser(params: RegisterUser$Params, context?: HttpContext): Observable<Base> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<Base>): Base => r.body)
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

  /** Path part for operation `applyUserForm()` */
  static readonly ApplyUserFormPath = '/secured/verification/form';

  /**
   * Apply user form.
   *
   * Apply user form
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `applyUserForm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applyUserForm$Response(params: ApplyUserForm$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
    return applyUserForm(this.http, this.rootUrl, params, context);
  }

  /**
   * Apply user form.
   *
   * Apply user form
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `applyUserForm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  applyUserForm(params: ApplyUserForm$Params, context?: HttpContext): Observable<Base> {
    return this.applyUserForm$Response(params, context).pipe(
      map((r: StrictHttpResponse<Base>): Base => r.body)
    );
  }

  /** Path part for operation `getUserVerificationData()` */
  static readonly GetUserVerificationDataPath = '/secured/verification';

  /**
   * Get user verification data.
   *
   * Get user verification data
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserVerificationData()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserVerificationData$Response(params: GetUserVerificationData$Params, context?: HttpContext): Observable<StrictHttpResponse<UserVerification>> {
    return getUserVerificationData(this.http, this.rootUrl, params, context);
  }

  /**
   * Get user verification data.
   *
   * Get user verification data
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserVerificationData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserVerificationData(params: GetUserVerificationData$Params, context?: HttpContext): Observable<UserVerification> {
    return this.getUserVerificationData$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserVerification>): UserVerification => r.body)
    );
  }

}
