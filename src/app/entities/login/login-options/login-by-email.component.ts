import {ChangeDetectorRef, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {GrantType} from "../../../core/api/v1/users/models/grant-type";
import {OtpInputComponent} from "../../../shared/inputs/otp-input.component";
import {SendToOtpCodeButtonComponent} from "../../../shared/components/send-to-otp-code-button.component";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";
import {PasswordInputComponent} from "../../../shared/inputs/password-input.component";
import {ResendOtpCodeTimeCounterComponent} from "../../../shared/components/resend-otp-code-time-counter.component";
import {OtpCodeNotReceivedButtonComponent} from "../../../shared/components/otp-code-not-received-button.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OtpLoginService} from "../../../core/api/v1/users/services/otp-login.service";
import {v4 as uuidv4} from 'uuid';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {AuthClientService} from "../../../core/auth/auth-client.service";


@Component({
  selector: 'bitruby-login-by-email',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    MatButton,
    MatIconButton,
    MatIcon,
    NgForOf,
    NgClass,
    OtpInputComponent,
    SendToOtpCodeButtonComponent,
    BigRedButtonComponent,
    PasswordInputComponent,
    ResendOtpCodeTimeCounterComponent,
    OtpCodeNotReceivedButtonComponent,
    MatLabel,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    MatStepperPrevious
  ],
  template: `

    <mat-horizontal-stepper [linear]="true" #stepper>
      <mat-step [stepControl]="form">
        <form [formGroup]="form">
          <div class="row mt-2">
            <div class="col-md-12">
              <mat-form-field appearance="fill">
                <input matInput formControlName="email" type="email" placeholder="email">
                <mat-hint *ngIf="form.controls['email'].touched">введите email</mat-hint>
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
            <bitruby-big-red-button-component
                [diasble]="form.invalid"
                [text]="'Продолжить'"
                (outputAction)="generateOtpCode()"
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
                (otpCompleted)="login()"
            ></bitruby-mat-input-otp>
          </div>
          <div class="row">
            <bitruby-resend-otp-code-time-counter
                (buttonClicked)="resendOtpCode()"
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
  styles: [``]
})
export class LoginByEmailComponent {

  form!: FormGroup;

  @ViewChild('stepper') stepper!: MatStepper;
  @Output()
  otpCodeRequested: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private cd: ChangeDetectorRef,
      private otpService: OtpLoginService,
      private _snackBar: MatSnackBar,
      private authClientService: AuthClientService
  ) {
    this.form = this.fb.group({
      email: new FormControl(undefined, [Validators.required, Validators.email]),
      password: new FormControl(undefined, Validators.required),
    });
  }

  generateOtpCode(): void {
    this.authClientService.generateOtpLogin(
        this.form.value.email, this.form.value.password,GrantType.EmailPassword
    ).subscribe({
      complete: () => {
        this.otpCodeRequested.emit(false)
        this.stepper.next();
      },
      error: err => {
        this._snackBar.open(err.message, 'Close', {verticalPosition: 'top', direction: 'rtl'})
      }
    })
  }

  resendOtpCode(): void {
    this.form.controls['otp'].reset()
    this.generateOtpCode()
  }

  login() {
    const arrayOtp = this.form.controls['otp'] as FormArray<FormControl>
    this.authClientService.authorize(
        this.form.value.email,
        this.form.value.password,
        arrayOtp.controls.map(control => control.value).join(''),
        GrantType.EmailPassword
    );
  }

  returnToFormHandler() {
    this.form.controls['otp'].reset()
    this.otpCodeRequested.emit(true)
    this.stepper.previous();
  }

  get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }
}
