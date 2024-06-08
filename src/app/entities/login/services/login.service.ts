import { Injectable } from '@angular/core';
import {AuthService} from "../../../core/api/v1/auth/services/auth.service";
import {GrantType} from "../../../core/api/v1/auth/models/grant-type";
import {environment} from "../../../../environments/environment.development";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private auth: AuthService,
      private router: Router
  ) {

  }

  public login(username: string, password: string, grantType: GrantType, otp: string): void {
    this.auth.getTokenByUserPassword({body: {
      grant_type: grantType,
        password: password,
        username: username,
        scope: environment.auth.scope,
        otp: otp
    }}).subscribe(value => {
      console.log(value);
      this.router.navigate(['/'])
    });

  }
}
