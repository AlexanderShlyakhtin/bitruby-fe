import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RegistrationOptionComponent} from "../registration/registration-options/registration-option.component";
import {RestorePasswordByEmailComponent} from "./restore-password-options/restore-password-by-email.component";

@Component({
  selector: 'bitruby-restore-password',
  standalone: true,
  imports: [
    MatButton,
    RegistrationOptionComponent,
    RestorePasswordByEmailComponent
  ],
  template: `
    <div class="login-form-container">
      <div class="login-form p-5">
        <div class="row">
          <div class="col-md-12">
            <h5>{{ mapLabels['title'] }}</h5>
          </div>
        </div>
        <bitruby-restore-password-by-email></bitruby-restore-password-by-email>
      </div>
      
    </div>
  `,
  styles: [`
  `]
})
export class RestorePasswordComponent {

  mapLabels = {
    title: 'Восстановление пароля',
  }

}
