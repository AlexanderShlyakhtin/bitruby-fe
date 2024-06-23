import {Injectable} from '@angular/core';
import {AuthService} from "../../../core/api/v1/auth/services/auth.service";
import {GrantType} from "../../../core/api/v1/auth/models/grant-type";
import {environment} from "../../../../environments/environment.development";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
      private auth: AuthService,
      private router: Router,
      private _snackBar: MatSnackBar
  ) {
  }

  public login(username: string, password: string, grantType: GrantType, otp: string): void {

    this.auth.getTokenByUserPassword({body: {
      grant_type: grantType,
        password: password,
        username: username,
        scope: environment.auth.scope,
        otp: otp
    }}).subscribe({
      next: value => {
        console.log(value);
        this.router.navigate(['/'])
      },
      error: err => {
        this._snackBar.open(err.message, 'Close', {verticalPosition: 'top', direction: 'rtl'})
      }
    });

  }
}
