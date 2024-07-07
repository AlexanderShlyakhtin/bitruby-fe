/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {generateOtpCodeForLogin, GenerateOtpCodeForLogin$Params} from '../fn/auth/generate-otp-code-for-login';
import {getTokenByUserPassword, GetTokenByUserPassword$Params} from '../fn/auth/get-token-by-user-password';
import {introspectAccessToken, IntrospectAccessToken$Params} from '../fn/auth/introspect-access-token';
import {IntrospectToken} from '../models/introspect-token';
import {OtpLoginResult} from '../models/otp-login-result';
import {Token} from '../models/token';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `introspectAccessToken()` */
  static readonly IntrospectAccessTokenPath = '/oauth2/introspect';

  /**
   * Introspect token access token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `introspectAccessToken()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  introspectAccessToken$Response(params: IntrospectAccessToken$Params, context?: HttpContext): Observable<StrictHttpResponse<IntrospectToken>> {
    return introspectAccessToken(this.http, this.rootUrl, params, context);
  }

  /**
   * Introspect token access token.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `introspectAccessToken$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  introspectAccessToken(params: IntrospectAccessToken$Params, context?: HttpContext): Observable<IntrospectToken> {
    return this.introspectAccessToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<IntrospectToken>): IntrospectToken => r.body)
    );
  }

  /** Path part for operation `getTokenByUserPassword()` */
  static readonly GetTokenByUserPasswordPath = '/oauth2/token';

  /**
   * Get access and refresh token by user password.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTokenByUserPassword()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  getTokenByUserPassword$Response(params: GetTokenByUserPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Token>> {
    return getTokenByUserPassword(this.http, this.rootUrl, params, context);
  }

  /**
   * Get access and refresh token by user password.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTokenByUserPassword$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  getTokenByUserPassword(params: GetTokenByUserPassword$Params, context?: HttpContext): Observable<Token> {
    return this.getTokenByUserPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<Token>): Token => r.body)
    );
  }

  /** Path part for operation `generateOtpCodeForLogin()` */
  static readonly GenerateOtpCodeForLoginPath = '/oauth2/otp';

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
  generateOtpCodeForLogin$Response(params: GenerateOtpCodeForLogin$Params, context?: HttpContext): Observable<StrictHttpResponse<OtpLoginResult>> {
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
  generateOtpCodeForLogin(params: GenerateOtpCodeForLogin$Params, context?: HttpContext): Observable<OtpLoginResult> {
    return this.generateOtpCodeForLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<OtpLoginResult>): OtpLoginResult => r.body)
    );
  }

}
