/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { completeRegistration } from '../fn/users/complete-registration';
import { CompleteRegistration$Params } from '../fn/users/complete-registration';
import { registerUser } from '../fn/users/register-user';
import { RegisterUser$Params } from '../fn/users/register-user';
import { testAuth } from '../fn/users/test-auth';
import { TestAuth$Params } from '../fn/users/test-auth';
import { testPublic } from '../fn/users/test-public';
import { TestPublic$Params } from '../fn/users/test-public';

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
  registerUser$Response(params?: RegisterUser$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
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
  registerUser(params?: RegisterUser$Params, context?: HttpContext): Observable<void> {
    return this.registerUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `completeRegistration()` */
  static readonly CompleteRegistrationPath = '/public/registration/complete-registration/{id}';

  /**
   * Complete registration of new user.
   *
   * Complete registration of the user by email confirmation
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `completeRegistration()` instead.
   *
   * This method doesn't expect any request body.
   */
  completeRegistration$Response(params: CompleteRegistration$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
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
   * This method doesn't expect any request body.
   */
  completeRegistration(params: CompleteRegistration$Params, context?: HttpContext): Observable<void> {
    return this.completeRegistration$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `testPublic()` */
  static readonly TestPublicPath = '/public';

  /**
   * Test.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `testPublic()` instead.
   *
   * This method doesn't expect any request body.
   */
  testPublic$Response(params?: TestPublic$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return testPublic(this.http, this.rootUrl, params, context);
  }

  /**
   * Test.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `testPublic$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  testPublic(params?: TestPublic$Params, context?: HttpContext): Observable<void> {
    return this.testPublic$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `testAuth()` */
  static readonly TestAuthPath = '/secured';

  /**
   * Test.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `testAuth()` instead.
   *
   * This method doesn't expect any request body.
   */
  testAuth$Response(params?: TestAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return testAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * Test.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `testAuth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  testAuth(params?: TestAuth$Params, context?: HttpContext): Observable<void> {
    return this.testAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
