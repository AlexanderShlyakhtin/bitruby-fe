/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Base } from '../models/base';
import { checkOtpCodeForRestoringPassword } from '../fn/otp-restore-password/check-otp-code-for-restoring-password';
import { CheckOtpCodeForRestoringPassword$Params } from '../fn/otp-restore-password/check-otp-code-for-restoring-password';
import { generateOtpCodeForRestoringPassword } from '../fn/otp-restore-password/generate-otp-code-for-restoring-password';
import { GenerateOtpCodeForRestoringPassword$Params } from '../fn/otp-restore-password/generate-otp-code-for-restoring-password';

@Injectable({ providedIn: 'root' })
export class OtpRestorePasswordService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
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
  generateOtpCodeForRestoringPassword$Response(params: GenerateOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<StrictHttpResponse<Base>> {
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
  generateOtpCodeForRestoringPassword(params: GenerateOtpCodeForRestoringPassword$Params, context?: HttpContext): Observable<Base> {
    return this.generateOtpCodeForRestoringPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<Base>): Base => r.body)
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
