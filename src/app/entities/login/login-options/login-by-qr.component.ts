import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {GrantType} from "../../../core/api/v1/auth/models/grant-type";
import {environment} from "../../../../environments/environment.development";
import {OidcSecurityService} from "angular-auth-oidc-client";

@Component({
  selector: 'bitruby-login-by-qr',
  standalone: true,
  imports: [
    MatButton
  ],
  template: `
    <div class="row">
      <div class="col-md-10 command-panel">
        <button mat-flat-button color="warn" (click)="login()">Продолжить</button>
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class LoginByQrComponent {

  constructor(
      private oidcSecurityService: OidcSecurityService
  ) {
  }


  login(): void {
    this.oidcSecurityService.authorize();

  }

}
