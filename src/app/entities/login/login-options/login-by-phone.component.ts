import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {SharedModule} from "../../../shared/shared.module";
import {LoginService} from "../services/login.service";
import {GrantType} from "../../../core/api/v1/auth/models/grant-type";
import {OtpService} from "../../../core/api/v1/users/services/otp.service";
import {SendToOtpCodeButtonComponent} from "../../../shared/components/send-to-otp-code-button.component";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";
import {PasswordInputComponent} from "../../../shared/inputs/password-input.component";
import {ResendOtpCodeTimeCounterComponent} from "../../../shared/components/resend-otp-code-time-counter.component";
import {OtpCodeNotReceivedButtonComponent} from "../../../shared/components/otp-code-not-received-button.component";
import {OtpInputComponent} from "../../../shared/inputs/otp-input.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'bitruby-login-by-phone',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    MatButton,
    MatSelectModule,
    SharedModule,
    NgForOf,
    SendToOtpCodeButtonComponent,
    BigRedButtonComponent,
    PasswordInputComponent,
    ResendOtpCodeTimeCounterComponent,
    OtpCodeNotReceivedButtonComponent,
    OtpInputComponent
  ],
  template: `
    <form *ngIf="!isTokenRequestSent" [formGroup]="formByPhone">
      <div class="row mt-2">
        <div class="col-md-3">
          <mat-form-field appearance="fill">
            <mat-select formControlName="countryCode">
              <mat-option *ngFor="let code of countryCodes" [value]="code.dialCode">
                {{ code.dialCode }}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="col-md-9">
          <mat-form-field appearance="fill">
            <input matInput formControlName="number" appPhoneInputMask placeholder="phone number">
            <mat-hint *ngIf="formByPhone.controls['number'].touched">введите номер телефона</mat-hint>
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
            [diasble]="formByPhone.invalid"
            [text]="'Продолжить'"
            (outputAction)="generateOtpCode()"
        ></bitruby-big-red-button-component>
      </div>
    </form>
    <form *ngIf="isTokenRequestSent" [formGroup]="otpForm">
      <div class="row mt-2">
        <bitruby-send-to-otp-code-button
            [text]="'Отправили СМС-код на номер'"
            [sendTo]="formByPhone.value['countryCode']+formByPhone.value['number']"
            [type]="'number'"
            (buttonClicked)="returnToFormHandler($event)"
        >
        </bitruby-send-to-otp-code-button>
      </div>
      <div class="row mt-2">
        <bitruby-mat-input-otp
            [form]="otpForm"
            [title]="'Введите код из письма'"
            (otpCompleted)="login()"
        ></bitruby-mat-input-otp>
      </div>
      <div class="row">
        <bitruby-resend-otp-code-time-counter
            (buttonClicked)="generateOtpCode()"
        ></bitruby-resend-otp-code-time-counter>
      </div>
      <div class="row mt-4">
        <bitruby-otp-code-not-received-button
            [text]="'СМС-код не пришел'"
        >
        </bitruby-otp-code-not-received-button>
      </div>
    </form>
  `,
  styles: [`
  `]
})
export class LoginByPhoneComponent {
  formByPhone!: FormGroup;
  otpForm!: FormGroup;
  isTokenRequestSent = false;

  @Output()
  otpCodeRequested: EventEmitter<boolean> = new EventEmitter<boolean>()

  countryCodes: CountryCode[] = [
    {
      name: 'Russia',
      dialCode: '+7'
    },
    {
      name: 'Italy',
      dialCode: '+39'
    }
  ];

  constructor(
      private router: Router,
      private fb: FormBuilder,
      private cd: ChangeDetectorRef,
      private loginService: LoginService,
      private otpService: OtpService,
      private _snackBar: MatSnackBar

  ) {
    this.formByPhone = this.fb.group({
      countryCode: new FormControl(this.countryCodes.at(0)?.dialCode, Validators.required),
      number: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required),
    });
    this.otpForm = this.fb.group([])
  }

  login() {
    const arrayOtp = this.otpForm.controls['otp'] as FormArray<FormControl>
    this.loginService.login(
        this.formByPhone.value.countryCode + this.formByPhone.value.number.replace(/[^+\d]/g, ''),
        this.formByPhone.value.password,
        GrantType.PhonePassword,
        arrayOtp.controls.map(control => control.value).join('')
    )
  }

  generateOtpCode(): void {
    const number = this.formByPhone.value.number.replace(/[^+\d]/g, '');

    this.otpService.generateOtpCodeForLogin({body: {
        password: this.formByPhone.value.password,
        grant_type: GrantType.PhonePassword,
        sendTo: this.formByPhone.value.countryCode + number
      }}).subscribe({
      complete: () => {
        this.isTokenRequestSent = true;
        this.otpCodeRequested.emit(false)
      },
      error: err => {
        this._snackBar.open(err.message, 'Close', {verticalPosition: 'top', direction: 'ltr', horizontalPosition: 'right'})
      }
    })
  }

  returnToFormHandler($event: void) {
    this.isTokenRequestSent = false;
    this.otpCodeRequested.emit(true)
  }

  get password(): FormControl {
    return this.formByPhone.controls['password'] as FormControl;
  }

}

interface CountryCode {
  name: string;
  dialCode: string;
}
