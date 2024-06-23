import {ChangeDetectorRef, Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule, MatSuffix} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
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
        <div class="login-form-container">
            <div class="login-form p-5">
                <div class="row">
                    <div class="col-md-3">
                        <h5>{{ mapLabels['title'] }}</h5>
                    </div>
                </div>
                <div class="row mt-2" *ngIf="showSelectOptionsPanel">
                    <div class="col-md-12 text-start">
                        <button mat-button class="no-background" (click)="toggleLogin('phone')"
                                [ngClass]="{'bold': selectedLogin === 'phone'}">
                            {{ mapLabels['login-by-phone'] }}
                        </button>
                        <button mat-button class="no-background" (click)="toggleLogin('email')"
                                [ngClass]="{'bold': selectedLogin === 'email'}">
                            {{ mapLabels['login-by-email'] }}
                        </button>
                    </div>
                </div>
                <div [ngSwitch]="selectedLogin">
                    <div *ngSwitchCase="'phone'">
                        <bitruby-login-by-phone
                                (otpCodeRequested)="toggleSelectOptionPanel($event)"
                        ></bitruby-login-by-phone>
                    </div>
                    <div *ngSwitchCase="'email'">
                        <bitruby-login-by-email
                                (otpCodeRequested)="toggleSelectOptionPanel($event)"
                        ></bitruby-login-by-email>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button class="w-100" mat-button (click)="goToRegistration()"><strong>{{ mapLabels['registration'] }}</strong></button>
            </div>
        </div>
    `,
    styles: [`
    `]
})
export class LoginComponent {

    mapLabels = {
        title: 'Вход',
        'login-by-phone': 'по телефону',
        'login-by-email': 'по email',
        'registration': 'У меня еще нет аккаунта'
    }

    showSelectOptionsPanel = true;
    selectedLogin: 'phone' | 'email' | 'qr' = 'phone'; // Initial selected login

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
    }

    toggleLogin(type: 'phone' | 'email'): void {
        this.selectedLogin = type;
    }

    goToRegistration() {
        this.router.navigate(['/registration'])
    }

    toggleSelectOptionPanel(event: boolean) {
        this.showSelectOptionsPanel = event;

    }
}
