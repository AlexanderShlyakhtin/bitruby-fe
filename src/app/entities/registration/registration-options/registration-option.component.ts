import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {OtpInputComponent} from "../../../shared/inputs/otp-input.component";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";
import {SendToOtpCodeButtonComponent} from '../../../shared/components/send-to-otp-code-button.component';
import {RegistrationProxyService} from "../services/registration-proxy.service";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PasswordInputComponent} from "../../../shared/inputs/password-input.component";
import {ResendOtpCodeTimeCounterComponent} from "../../../shared/components/resend-otp-code-time-counter.component";
import {OtpCodeNotReceivedButtonComponent} from "../../../shared/components/otp-code-not-received-button.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AVALIABLE_COUNTRY_CODES} from "../../../app.constants";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {SharedModule} from "../../../shared/shared.module";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {AuthClientService} from "../../../core/auth/auth-client.service";


@Component({
    selector: 'bitruby-registration-by-phone',
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
        MatOption,
        MatSelect,
        SharedModule,
        MatStep,
        MatStepper,
    ],
    template: `

        <mat-horizontal-stepper [linear]="true" #stepper>
            <mat-step [stepControl]="form">
                <form [formGroup]="form">
                    <div class="row mt-2">
                        <div class="col-md-4">
                            <mat-form-field appearance="fill">
                                <mat-select formControlName="countryCode" required="true">
                                    <mat-option *ngFor="let code of countryCodes" [value]="code.value">
                                        {{ code.dialCode }}
                                    </mat-option>
                                </mat-select>
                            </mat-form-field>
                        </div>
                        <div class="col-md-8">
                            <mat-form-field appearance="fill">
                                <input matInput formControlName="number" appPhoneInputMask placeholder="phone number" required="true">
                                <mat-hint *ngIf="form.controls['number'].touched">введите номер телефона</mat-hint>
                            </mat-form-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <mat-form-field appearance="fill">
                                <input matInput formControlName="email" type="email" placeholder="email">
                                <mat-hint *ngIf="form.controls['email'].touched">введите email</mat-hint>
                                <mat-error *ngIf="form.controls['email'].invalid">введите email</mat-error>
                            </mat-form-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <bitruby-mat-input-password [formControl]="password"></bitruby-mat-input-password>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <mat-form-field appearance="fill">
                                <input matInput formControlName="confirmPassword" placeholder="confirm password" type="password">
                                <mat-error *ngIf="form.controls['confirmPassword'].hasError('passwordsMismatch') && form.controls['confirmPassword'].touched">
                                    Passwords do not match
                                </mat-error>
                            </mat-form-field>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <mat-checkbox formControlName="consentTerms">
                                Принимаю
                                <a href="/info/use-terms" target="_blank" class="terms-link">
                                    <strong>условия обслуживания</strong>
                                </a> и
                                <a href="/info/privacy-terms" target="_blank" class="terms-link">
                                    <strong>политику конфиденциальности</strong>
                                </a>
                            </mat-checkbox>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <bitruby-big-red-button-component
                                [diasble]="form.invalid || !form.controls['consentTerms'].value"
                                [text]="'Продолжить'"
                                (outputAction)="registerNewUser()"
                        ></bitruby-big-red-button-component>
                    </div>
                </form>
            </mat-step>
            <mat-step [stepControl]="form">
                <form [formGroup]="form" >
                    <bitruby-send-to-otp-code-button
                            [text]="'Код отправлен на почту'"
                            [sendTo]="form.value['email']"
                            [type]="'email'"
                            (buttonClicked)="returnToFormHandler()"
                    ></bitruby-send-to-otp-code-button>
                    <div class="row mt-2">
                        <bitruby-mat-input-otp
                                [form]="form"
                                [title]="'Введите код из письма'"
                                (otpCompleted)="completeRegistration()"
                        ></bitruby-mat-input-otp>
                    </div>
                    <div class="row">
                        <bitruby-resend-otp-code-time-counter
                                (buttonClicked)="resendOtpToken()"
                        ></bitruby-resend-otp-code-time-counter>
                    </div>
                    <div class="row mt-4">
                        <bitruby-otp-code-not-received-button
                                [text]="'Код не пришел'"
                        >
                        </bitruby-otp-code-not-received-button>
                    </div>
                </form>
            </mat-step>
        </mat-horizontal-stepper>
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
export class RegistrationOptionComponent {

    form: FormGroup;
    countryCodes = AVALIABLE_COUNTRY_CODES;

    @ViewChild('stepper') stepper!: MatStepper;
    @Output()
    otpCodeRequested: EventEmitter<boolean> = new EventEmitter<boolean>()
    registrationId: string | undefined = undefined;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private authClientService: AuthClientService,
        private _snackBar: MatSnackBar,
        private registrationService: RegistrationProxyService,
    ) {
        this.form = this.fb.group({
            countryCode: new FormControl(this.countryCodes.at(0)?.value, Validators.required),
            number: new FormControl(undefined, [Validators.required]),
            email: new FormControl(undefined, [Validators.required, Validators.email]),
            password: new FormControl(undefined, [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl(undefined, Validators.required),
            consentTerms: new FormControl(undefined, Validators.required)
        }, { validators: passwordsMatchValidator() });
    }

    resendOtpToken(): void {
        this.form.controls['otp'].reset()
        this.generateOtpCode()
    }
    generateOtpCode(): void {
        this.authClientService.generateOtpRegistration(
            this.registrationId!,
        )
            .subscribe({
                complete: () => {
                    this.otpCodeRequested.emit(false)
                    this.stepper.next()
                },
                error: (err: any) => {
                    console.error(err);
                }
            });
    }

    returnToFormHandler(): void {
        this.form.controls['otp'].reset()
        this.otpCodeRequested.emit(true)
        this.stepper.previous()
    }

    registerNewUser(): void {
        this.registrationService.registerNewUser({
            phone: this.getFormatedPhoneNumber(),
            email: this.form.value.email,
            password: this.form.value.password,
        })
            .subscribe({
                next: value => {
                    this.registrationId = value.registrationId;
                },
                complete: () => {
                    this.generateOtpCode();
                },
                error: err => {
                    console.error(err);
                    this._snackBar.open(err.message, 'Close', {verticalPosition: 'top', direction: 'rtl'})
                }
            });
    }
    get password(): FormControl {
        return this.form.get('password') as FormControl;
    }

    completeRegistration(): void {
        const arrayOtp = this.form.controls['otp'] as FormArray<FormControl>
        this.registrationService.completeRegistration({
            registrationId: this.registrationId!,
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

    getFormatedPhoneNumber(): string {
        return this.form.value.countryCode + this.form.value.number.replace(/[^+\d]/g, '');
    }
}

export function passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordsMismatch: true });
            return { passwordsMismatch: true };
        } else {
            confirmPassword?.setErrors(null);
            return null;
        }
    };
}
