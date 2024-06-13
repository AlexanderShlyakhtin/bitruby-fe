import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginByPhoneComponent} from "../login/login-options/login-by-phone.component";
import {LoginByEmailComponent} from "../login/login-options/login-by-email.component";
import {LoginByQrComponent} from "../login/login-options/login-by-qr.component";
import {Router} from "@angular/router";
import {RegisterOptionComponent} from "./registration-options/register-option.component";

@Component({
  selector: 'bitruby-registration',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatSuffix,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LoginByPhoneComponent,
    LoginByEmailComponent,
    NgClass,
    LoginByQrComponent,
    NgSwitch,
    NgSwitchCase,
    RegisterOptionComponent
  ],
  template: `
        <div class="login-form-container">
            <div class="login-form p-5">
                <div class="row">
                    <div class="col-md-3">
                        <h5>{{ mapLabels['title'] }}</h5>
                    </div>
                </div>
              <bitruby-registration-by-email
                  (otpCodeRequested)="toggleSelectOptionPanel($event)"
              ></bitruby-registration-by-email>
            </div>
            <div class="button-container">
                <button class="w-100" mat-button (click)="goToLogin()"><strong>{{ mapLabels['login'] }}</strong></button>
            </div>
        </div>
    `,
  styles: [`

    .login-form-container {
      display: flex;
      flex-direction: column; /* Align items vertically */
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .login-form {
      width: 480px;
      height: 562px;
      background-color: #ffffff;
      padding: 1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .button-container {
      margin-top: 10px; /* Add margin to create space between form and button */
      text-align: center; /* Center the button */
    }
  `]
})
export class RegistrationComponent {

  mapLabels = {
    title: 'Регистрация',
    // 'login-by-phone': 'по телефону',
    'registration-by-email': 'по email',
    'login': 'У меня есть аккаунт'
    // 'login-by-qr': 'по qr-коду'
  }

  showSelectOptionsPanel = true;

  selectedRegistration = 'email'; // Initial selected login

  constructor(
      private router: Router,
  ) {
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

  toggleSelectOptionPanel(event: boolean) {
    this.showSelectOptionsPanel = event;

  }
}
