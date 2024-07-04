import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepper} from "@angular/material/stepper";
import {NgForOf, NgIf} from "@angular/common";
import {OtpCodeNotReceivedButtonComponent} from "../../../shared/components/otp-code-not-received-button.component";
import {OtpInputComponent} from "../../../shared/inputs/otp-input.component";
import {PasswordInputComponent} from "../../../shared/inputs/password-input.component";
import {ResendOtpCodeTimeCounterComponent} from "../../../shared/components/resend-otp-code-time-counter.component";
import {SendToOtpCodeButtonComponent} from "../../../shared/components/send-to-otp-code-button.component";
import {SharedModule} from "../../../shared/shared.module";
import {AuthClientService} from "../../../core/auth/auth-client.service";
import {v4 as uuidv4} from "uuid";
import {Router} from "@angular/router";
import {Base, GrantType} from '../../../core/api/v1/users/models';
import {UsersService} from "../../../core/api/v1/users/services/users.service";
import {OtpRestorePasswordService} from "../../../core/api/v1/users/services/otp-restore-password.service";

@Component({
    selector: 'bitruby-restore-password-by-email',
    standalone: true,
    imports: [
        BigRedButtonComponent,
        FormsModule,
        MatCheckbox,
        MatError,
        MatFormField,
        MatHint,
        MatInput,
        MatOption,
        MatSelect,
        MatStep,
        MatStepper,
        NgForOf,
        NgIf,
        OtpCodeNotReceivedButtonComponent,
        OtpInputComponent,
        PasswordInputComponent,
        ReactiveFormsModule,
        ResendOtpCodeTimeCounterComponent,
        SendToOtpCodeButtonComponent,
        SharedModule
    ],
    template: `
        <mat-horizontal-stepper [linear]="true" #stepper>
            <mat-step [stepControl]="form">
                <form [formGroup]="form">
                    <div class="row">
                        <div class="col-md-12 mt-2">
                            <mat-form-field appearance="fill">
                                <input matInput formControlName="email" type="email" placeholder="email">
                                <mat-hint *ngIf="form.controls['email'].touched">введите email</mat-hint>
                                <mat-error *ngIf="form.controls['email'].invalid">введите email</mat-error>
                            </mat-form-field>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <bitruby-big-red-button-component
                                [diasble]="form.invalid"
                                [text]="'Продолжить'"
                                (outputAction)="requestOtpToRestorePassword()"
                        ></bitruby-big-red-button-component>
                    </div>
                </form>
            </mat-step>
            <mat-step [stepControl]="form">
                <form [formGroup]="form">
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
                                (otpCompleted)="confirmOtpCode()"
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
                </form>
            </mat-step>
            <mat-step [stepControl]="form">
                <form [formGroup]="form">
                    <div class="row">
                        <div class="col-md-12">
                            <bitruby-mat-input-password [formControl]="password"></bitruby-mat-input-password>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <mat-form-field appearance="fill">
                                <input matInput formControlName="confirmPassword" placeholder="confirm password"
                                       type="password">
                                <mat-error
                                        *ngIf="form.controls['confirmPassword'].hasError('passwordsMismatch') && form.controls['confirmPassword'].touched">
                                    Passwords do not match
                                </mat-error>
                            </mat-form-field>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <bitruby-big-red-button-component
                                [diasble]="form.invalid"
                                [text]="'Сохранить'"
                                (outputAction)="confirmNewPassword()"
                        ></bitruby-big-red-button-component>
                    </div>
                </form>
            </mat-step>
        </mat-horizontal-stepper>
    `,
    styles: [`
    `]
})
export class RestorePasswordByEmailComponent {

    form: FormGroup;
    @ViewChild('stepper') stepper!: MatStepper;

    @Output()
    otpCodeRequested: EventEmitter<boolean> = new EventEmitter<boolean>()
    restorePasswordId: string | undefined = undefined;

    constructor(
        private fb: FormBuilder,
        private authClientService: AuthClientService,
        private usersService: UsersService,
        private restorePasswordService: OtpRestorePasswordService,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: new FormControl(undefined, [Validators.required, Validators.email]),
            password: new FormControl(undefined),
            confirmPassword: new FormControl(undefined),
        }, {validators: passwordsMatchValidator()});
    }

    requestOtpToRestorePassword(): void {
        this.authClientService.generateOtpRestorePassword(this.form.controls['email'].value, GrantType.EmailPassword)
            .subscribe({
                next: value => {

                },
                complete: () => {
                    this.stepper.next();
                },
                error: err => {
                    console.error(err)
                }
            })
    }

    returnToFormHandler(): void {
        this.form.controls['otp'].reset()
        this.stepper.previous()
    }

    confirmOtpCode(): void {
        const arrayOtp = this.form.controls['otp'] as FormArray<FormControl>

        this.restorePasswordService.checkOtpCodeForRestoringPassword({
            body: {
                restorePasswordId: this.restorePasswordId!,
                otp: arrayOtp.controls.map(control => control.value).join('')
            },
            "x-request-id": uuidv4()
        })
            .subscribe({
                next: (value: Base) => {
                    if (value.success) {
                        this.stepper.next()
                        this.form.controls['password'].addValidators([Validators.required, Validators.minLength(8)])
                        this.form.controls['confirmPassword'].addValidators([Validators.required, Validators.minLength(8)])
                        this.form.updateValueAndValidity();
                    }
                },
                error: (err: Error) => {
                    console.error(err)
                }
            })
    }

    confirmNewPassword(): void {
        const arrayOtp = this.form.controls['otp'] as FormArray<FormControl>
        this.usersService.restorePassword({
            body: {
                restorePasswordId: this.restorePasswordId!,
                otp: arrayOtp.controls.map(control => control.value).join(''),
                password: this.form.controls['password'].value,
            },
            "x-request-id": uuidv4()
        })
            .subscribe({
                next: value => {
                    this.router.navigate(['/login'])
                }
            })

    }

    generateOtpCode(): void {
        this.authClientService.generateOtpRestorePassword(this.form.controls['email'].value, GrantType.EmailPassword)
            .subscribe({
                next: value => {
                    this.restorePasswordId = value.restorePasswordId;
                },
                error: err => {
                    console.error(err)
                }
            })

    }

    get password(): FormControl {
        return this.form.get('password') as FormControl;
    }
}

export function passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({passwordsMismatch: true});
            return {passwordsMismatch: true};
        } else {
            confirmPassword?.setErrors(null);
            return null;
        }
    };
}
