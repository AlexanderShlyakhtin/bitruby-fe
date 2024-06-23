import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RegistrationOptionComponent} from "../registration/registration-options/registration-option.component";

@Component({
  selector: 'bitruby-restore-password',
  standalone: true,
  imports: [
    MatButton,
    RegistrationOptionComponent
  ],
  template: `
    <div class="login-form-container">
      <div class="login-form p-5">
        <div class="row">
          <div class="col-md-3">
            <h5>{{ mapLabels['title'] }}</h5>
          </div>
        </div>
        <bitruby-registration
            (otpCodeRequested)="toggleSelectOptionPanel($event)"
        ></bitruby-registration>
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
