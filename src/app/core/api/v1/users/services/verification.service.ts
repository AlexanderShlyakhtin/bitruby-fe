/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {applyUserForm, ApplyUserForm$Params} from '../fn/verification/apply-user-form';
import {Base} from '../models/base';
import {getUserVerificationData, GetUserVerificationData$Params} from '../fn/verification/get-user-verification-data';
import {UserVerification} from '../models/user-verification';

@Injectable({ providedIn: 'root' })
export class VerificationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
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
