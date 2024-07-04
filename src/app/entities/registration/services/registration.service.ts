import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {v4 as uuidv4} from 'uuid';
import {RegisterNewUserResult} from "../../../core/api/v1/users/models/register-new-user-result";
import {CompleteRegistration} from "../../../core/api/v1/users/models/complete-registration";
import {UsersService} from "../../../core/api/v1/users/services/users.service";
import {NewUser} from "../../../core/api/v1/users/models/new-user";
import {Base} from "../../../core/api/v1/users/models/base";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
      private userService: UsersService
  ) { }

  registerNewUser(body: NewUser): Observable<RegisterNewUserResult> {
    return this.userService.registerUser({body: body, "x-request-id": uuidv4()})
  }

  completeRegistration(body: CompleteRegistration): Observable<Base> {
    return this.userService.completeRegistration({body: body, "x-request-id": uuidv4()});
  }


}
