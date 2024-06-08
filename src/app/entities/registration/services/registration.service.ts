import { Injectable } from '@angular/core';
import {UsersService} from "../../../core/api/v1/users/services/users.service";
import {RegisterUser$Params} from "../../../core/api/v1/users/fn/users/register-user";
import {RegisterUser} from "../../../core/api/v1/users/models/register-user";
import {Observable, Subscription} from "rxjs";
import {CompleteRegistration$Params} from "../../../core/api/v1/users/fn/users/complete-registration";
import {OtpCodeCheck} from "../../../core/api/v1/users/models/otp-code-check";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
      private userService: UsersService
  ) { }

  registerNewUser(body: RegisterUser): Observable<void> {
    return this.userService.registerUser({body: body})
  }

  completeRegistration(body: OtpCodeCheck): Observable<void> {
    return this.userService.completeRegistration({body: body});
  }


}
