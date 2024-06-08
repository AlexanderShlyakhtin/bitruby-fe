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
import {SendToOtpCodeButtonComponent} from "../components/send-to-otp-code-button.component";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";

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
    BigRedButtonComponent
  ],
  template: `
    <form *ngIf="!tokenGenerated" [formGroup]="formByEmail">
      <div class="row mt-2">
        <div class="col-md-12">
          <mat-form-field appearance="fill">
            <input matInput formControlName="email" type="email">
            <mat-hint *ngIf="formByEmail.controls['email'].touched">введите email</mat-hint>
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <mat-form-field appearance="fill">
            <input matInput formControlName="password" type="password">
            <mat-error *ngIf="formByEmail.controls['password'].invalid">введите пароль
            </mat-error>
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <bitruby-big-red-button-component 
            [form]="formByEmail"
            [text]="'Продолжить'"
            (outputAction)="generateOtpCode()"
        ></bitruby-big-red-button-component>
      </div>
    </form>
    <div *ngIf="tokenGenerated">
      <bitruby-send-to-otp-code-button
      [text]="'Код отправлен на почту '+formByEmail.value['email']"
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
            [form]="otpForm"
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
  tokenGenerated = false;
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
      grant_type: GrantType.EmailPassword,
      sendTo: this.formByEmail.value.email
    }}).subscribe({
      complete: () => {
        this.tokenGenerated = true
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

  getVisibility() {
    return this.pwdHide1 ? 'visibility_off' : 'visibility';
  }

  visibilityToggle() {
    this.pwdHide1 = !this.pwdHide1;
  }

  getIputType() {
    return this.pwdHide1 ? 'password' : 'text';
  }

  returnToFormHandler($event: void) {
    this.tokenGenerated = false;
  }
}
