import {ChangeDetectorRef, Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginByPhoneComponent} from "../login/login-options/login-by-phone.component";
import {LoginByEmailComponent} from "../login/login-options/login-by-email.component";
import {LoginByQrComponent} from "../login/login-options/login-by-qr.component";
import {Router} from "@angular/router";
import {RegisterByEmailComponent} from "./registration-options/register-by-email.component";

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
    RegisterByEmailComponent
  ],
  template: `
        <div class="login-form-container">
            <div class="login-form p-5">
                <div class="row">
                    <div class="col-md-3">
                        <h5>{{ mapLabels['title'] }}</h5>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12 text-start">
<!--                        <button mat-button class="no-background" (click)="toggleLogin('phone')"-->
<!--                                [ngClass]="{'bold': selectedLogin === 'phone'}">-->
<!--                            {{ mapLabels['login-by-phone'] }}-->
<!--                        </button>-->
                        <button mat-button class="no-background" (click)="toggleLogin('email')"
                                [ngClass]="{'bold': selectedRegistration === 'email'}">
                            {{ mapLabels['registration-by-email'] }}
                        </button>
                        <!--                                    <button mat-button class="no-background" (click)="toggleLogin('qr')"-->
                        <!--                                            [ngClass]="{'bold': selectedLogin === 'qr'}">-->
                        <!--                                        {{ mapLabels['login-by-qr'] }}-->
                        <!--                                    </button>-->
                    </div>
                </div>
                <div [ngSwitch]="selectedRegistration">
<!--                    <div *ngSwitchCase="'phone'">-->
<!--                        <bitruby-login-by-phone></bitruby-login-by-phone>-->
<!--                    </div>-->
                    <div *ngSwitchCase="'email'">
                        <bitruby-registration-by-email></bitruby-registration-by-email>
                    </div>
                    <!--                                <div *ngSwitchCase="'qr'">-->
                    <!--                                    <bitruby-login-by-qr></bitruby-login-by-qr>-->
                    <!--                                </div>-->
                </div>
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

  selectedRegistration = 'email'; // Initial selected login

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private cd: ChangeDetectorRef
  ) {
  }

  toggleLogin(type: 'phone' | 'email' | 'qr'): void {
    this.selectedRegistration = type;
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

}
