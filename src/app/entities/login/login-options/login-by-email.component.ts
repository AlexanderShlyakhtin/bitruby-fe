import {ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatHint} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {LoginService} from "../services/login.service";
import {OtpService} from "../../../core/api/v1/users/services/otp.service";
import {GrantType} from "../../../core/api/v1/users/models/grant-type";
import {OtpInputComponent} from "../../../shared/inputs/otp-input.component";
import {SendToOtpCodeButtonComponent} from "../../../shared/components/send-to-otp-code-button.component";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";
import {PasswordInputComponent} from "../../../shared/inputs/password-input.component";

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
    PasswordInputComponent
  ],
  template: `
    <form *ngIf="!isTokenRequestSent" [formGroup]="formByEmail">
      <div class="row mt-2">
        <div class="col-md-12">
          <mat-form-field appearance="fill">
            <input matInput formControlName="email" type="email" placeholder="email">
            <mat-hint *ngIf="formByEmail.controls['email'].touched">введите email</mat-hint>
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
            [diasble]="formByEmail.invalid"
            [text]="'Продолжить'"
            (outputAction)="generateOtpCode()"
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
        ></bitruby-mat-input-otp>
      </div>
      <div class="row">
        <bitruby-big-red-button-component
            [diasble]="otpForm.invalid"
            [text]="'Войти'"
            (outputAction)="login()"
        ></bitruby-big-red-button-component>
      </div>
    </div>

  `,
  styles: [``]
})
export class LoginByEmailComponent {

  formByEmail!: FormGroup;
  pwdHide1 = true;
  isTokenRequestSent = false;
  otpForm!: FormGroup;


  constructor(
      private router: Router,
      private fb: FormBuilder,
      private cd: ChangeDetectorRef,
      private loginService: LoginService,
      private otpService: OtpService
  ) {
    this.formByEmail = this.fb.group({
      email: new FormControl(undefined,  [Validators.required, Validators.email]),
      password: new FormControl(undefined, Validators.required),
    });
    this.otpForm =this.fb.group([])
  }


  generateOtpCode(): void {
    this.otpService.generateOtpCodeForLogin({body: {
      password: this.formByEmail.value.password,
      grant_type: GrantType.EmailPassword,
      sendTo: this.formByEmail.value.email
    }}).subscribe({
      complete: () => {
        this.isTokenRequestSent = true
      }
    })
  }


  login() {
    const arrayOtp = this.otpForm.controls['otp'] as FormArray<FormControl>

    this.loginService.login(
        this.formByEmail.value.email,
        this.formByEmail.value.password,
        GrantType.EmailPassword,
        arrayOtp.controls.map(control => control.value).join('')
    )
  }
  returnToFormHandler($event: void) {
    this.isTokenRequestSent = false;
  }

  get password(): FormControl {
    return this.formByEmail.controls['password'] as FormControl;
  }
}
