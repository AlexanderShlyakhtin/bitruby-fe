import {ChangeDetectorRef, Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatHint, MatSuffix} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatInput, MatInputModule} from "@angular/material/input";
import {LoginByPhoneComponent} from "./login-options/login-by-phone.component";
import {LoginByEmailComponent} from "./login-options/login-by-email.component";
import {LoginByQrComponent} from "./login-options/login-by-qr.component";

@Component({
    selector: 'bitruby-login',
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
        NgSwitchCase
    ],
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-5">
                    Picture
                </div>
                <div class="col-md-7 login-form-bg">
                    <div class="login-close-button">
                        <button mat-button (click)="goToLanding()">
                            <mat-icon matIconSuffix>clear</mat-icon>
                        </button>
                    </div>
                    <div class="login-form-container">
                        <div class="login-form p-5">
                            <div class="row">
                                <div class="col-md-3">
                                    <h5>{{ mapLabels['title'] }}</h5>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12 text-start">
                                    <button mat-button class="no-background" (click)="toggleLogin('phone')"
                                            [ngClass]="{'bold': selectedLogin === 'phone'}">
                                        {{ mapLabels['login-by-phone'] }}
                                    </button>
                                    <button mat-button class="no-background" (click)="toggleLogin('email')"
                                            [ngClass]="{'bold': selectedLogin === 'email'}">
                                        {{ mapLabels['login-by-email'] }}
                                    </button>
<!--                                    <button mat-button class="no-background" (click)="toggleLogin('qr')"-->
<!--                                            [ngClass]="{'bold': selectedLogin === 'qr'}">-->
<!--                                        {{ mapLabels['login-by-qr'] }}-->
<!--                                    </button>-->
                                </div>
                            </div>
                            <div [ngSwitch]="selectedLogin">
                                <div *ngSwitchCase="'phone'">
                                    <bitruby-login-by-phone></bitruby-login-by-phone>
                                </div>
                                <div *ngSwitchCase="'email'">
                                    <bitruby-login-by-email></bitruby-login-by-email>
                                </div>
<!--                                <div *ngSwitchCase="'qr'">-->
<!--                                    <bitruby-login-by-qr></bitruby-login-by-qr>-->
<!--                                </div>-->
                            </div>
                        </div>
                        <div class="button-container">
                            <button class="w-100" mat-button (click)="goToRegistration()"><strong>У меня еще нет аккаунта</strong></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .login-form-bg {
            background-color: #EEEFF2;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh; /* Full height to center vertically */
            position: relative; /* Needed for positioning the close button */
        }

        .login-form-container {
            display: flex;
            flex-direction: column; /* Align items vertically */
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .login-close-button {
            position: absolute; /* Position close button absolutely within container */
            top: 10px; /* Adjust as necessary */
            right: 10px; /* Adjust as necessary */
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
export class LoginComponent {

    mapLabels = {
        title: 'Вход',
        'login-by-phone': 'по телефону',
        'login-by-email': 'по email',
        'login-by-qr': 'по qr-коду'
    }

    selectedLogin: 'phone' | 'email' | 'qr' = 'phone'; // Initial selected login

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
    }

    toggleLogin(type: 'phone' | 'email' | 'qr'): void {
        this.selectedLogin = type;
    }

    goToLanding() {
        this.router.navigate(['/'])
    }

    goToRegistration() {
        this.router.navigate(['/registration'])
    }
}
