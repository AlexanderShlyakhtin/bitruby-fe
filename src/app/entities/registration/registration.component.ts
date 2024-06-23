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
import {RegistrationOptionComponent} from "./registration-options/registration-option.component";

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
    RegistrationComponent,
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
              <bitruby-registration-by-phone
                  (otpCodeRequested)="toggleSelectOptionPanel($event)"
              ></bitruby-registration-by-phone>
            </div>
            <div class="button-container">
                <button class="w-100" mat-button (click)="goToLogin()"><strong>{{ mapLabels['login'] }}</strong></button>
            </div>
        </div>
    `,
  styles: [`

    
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
