import {Injectable} from '@angular/core';
import {UsersService} from "../../../core/api/v1/users/services/users.service";
import {Observable} from "rxjs";
import {OtpCodeCheck} from "../../../core/api/v1/users/models/otp-code-check";
import {NewUser} from "../../../core/api/v1/users/models/new-user";
import {v4 as uuidv4} from 'uuid';
import {Base} from "../../../core/api/v1/users/models/base";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
      private userService: UsersService
  ) { }

  registerNewUser(body: NewUser): Observable<Base> {
    return this.userService.registerUser({body: body, "x-request-id": uuidv4()})
  }

  completeRegistration(body: OtpCodeCheck): Observable<Base> {
    return this.userService.completeRegistration({body: body, "x-request-id": uuidv4()});
  }


}
