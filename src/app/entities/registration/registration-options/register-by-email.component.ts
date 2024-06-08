import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {OtpService} from "../../../core/api/v1/users/services/otp.service";
import {GrantType} from "../../../core/api/v1/users/models/grant-type";
import {OtpInputComponent} from "../../../shared/inputs/otp-input.component";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";
import {SendToOtpCodeButtonComponent} from '../../../shared/components/send-to-otp-code-button.component';
import {RegistrationService} from "../services/registration.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PasswordInputComponent} from "../../../shared/inputs/password-input.component";
import {ResendOtpCodeTimeCounterComponent} from "../../../shared/components/resend-otp-code-time-counter.component";
import {OtpCodeNotReceivedButtonComponent} from "../../../shared/components/otp-code-not-received-button.component";

@Component({
    selector: 'bitruby-registration-by-email',
    standalone: true,
    imports: [
        MatError,
        MatFormField,
        MatHint,
        MatInput,
        NgIf,
        ReactiveFormsModule,
        MatButton,
        MatIconModule,
        MatIcon,
        NgForOf,
        NgClass,
        OtpInputComponent,
        SendToOtpCodeButtonComponent,
        BigRedButtonComponent,
        MatCheckboxModule,
        MatIconButton,
        PasswordInputComponent,
        ResendOtpCodeTimeCounterComponent,
        OtpCodeNotReceivedButtonComponent,
    ],
    template: `
        <form *ngIf="!isTokenRequestSent" [formGroup]="formByEmail">
            <div class="row mt-2">
                <div class="col-md-12">
                    <mat-form-field appearance="fill">
                        <input matInput formControlName="email" type="email" placeholder="email">
                        <mat-hint *ngIf="formByEmail.controls['email'].touched">введите email</mat-hint>
                        <mat-error *ngIf="formByEmail.controls['email'].invalid">введите email
                        </mat-error>
                    </mat-form-field>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <bitruby-mat-input-password
                            [formControl]="password"
                    ></bitruby-mat-input-password>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <mat-checkbox formControlName="consentTerms">
                        Принимаю
                        <a href="" target="_blank" class="terms-link">
                            <strong>условия обслуживания</strong>
                        </a> и
                        <a href="" target="_blank" class="terms-link">
                            <strong>политику конфиденциальности</strong>
                        </a>
                    </mat-checkbox>
                </div>
            </div>
            <div class="row mt-2">
                <bitruby-big-red-button-component
                        [diasble]="formByEmail.invalid || !formByEmail.controls['consentTerms'].value"
                        [text]="'Продолжить'"
                        (outputAction)="registerNewUser()"
                ></bitruby-big-red-button-component>
            </div>
        </form>
        <div *ngIf="isTokenRequestSent">
            <bitruby-send-to-otp-code-button
                    [text]="'Код отправлен на почту'"
                    [sendTo]="formByEmail.value['email']"
                    [type]="'email'"
                    (buttonClicked)="returnToFormHandler($event)"
            ></bitruby-send-to-otp-code-button>
            <div class="row mt-2">
                <bitruby-mat-input-otp
                        [form]="otpForm"
                        [title]="'Введите код из письма'"
                        (otpCompleted)="completeRegistration()"
                ></bitruby-mat-input-otp>
            </div>
            <div class="row">
                <bitruby-resend-otp-code-time-counter
                        (buttonClicked)="generateOtpCode()"
                ></bitruby-resend-otp-code-time-counter>
            </div>
            <div class="row mt-4">
                <bitruby-otp-code-not-received-button
                        [text]="'Код не пришел'"
                >
                </bitruby-otp-code-not-received-button>
            </div>
        </div>
    `,
    styles: [`
        .terms-link {
            color: #00336c; /* Link color */
            text-decoration: none; /* Remove underline */
        }

        .terms-link:hover {
            text-decoration: underline; /* Underline on hover */
        }
    `]
})
export class RegisterByEmailComponent {

    formByEmail: FormGroup;
    isTokenRequestSent = false;
    otpForm: FormGroup;
    checked = false;

    @Output()
    otpCodeRequested: EventEmitter<boolean> = new EventEmitter<boolean>()

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private registrationService: RegistrationService,
        private otpService: OtpService
    ) {
        this.formByEmail = this.fb.group({
            email: new FormControl(undefined, [Validators.required, Validators.email]),
            password: new FormControl(undefined, Validators.required),
            consentTerms: new FormControl(undefined, Validators.required)
        });
        this.otpForm = this.fb.group([])
    }

    generateOtpCode(): void {
        this.otpService.generateOtpCodeForRegistration({
            body: {
                grant_type: GrantType.EmailPassword,
                sendTo: this.formByEmail.value.email
            }
        })
            .subscribe({
                complete: () => {
                    this.isTokenRequestSent = true;
                    this.otpCodeRequested.emit(false)
                },
                error: err => {
                    console.error(err);
                }
            });
    }

    returnToFormHandler($event: void): void {
        this.isTokenRequestSent = false;
        this.otpCodeRequested.emit(true)
    }

    registerNewUser(): void {
        this.registrationService.registerNewUser({
            email: this.formByEmail.value.email,
            password: this.formByEmail.value.password,
        })
            .subscribe({
                complete: () => {
                    this.generateOtpCode();
                },
                error: err => {
                    console.error(err);
                }
            });
    }
    get password(): FormControl {
      return this.formByEmail.get('password') as FormControl;
    }

    completeRegistration(): void {
        const arrayOtp = this.otpForm.controls['otp'] as FormArray<FormControl>

        this.registrationService.completeRegistration({
            sendTo: this.formByEmail.value.email,
            grant_type: GrantType.EmailPassword,
            otp: arrayOtp.controls.map(control => control.value).join('')
        })
            .subscribe({
                complete: () => {
                    this.router.navigate(['/login']);
                },
                error: err => {
                    console.error(err);
                }
            });
    }

}
