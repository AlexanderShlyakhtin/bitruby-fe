import {ChangeDetectorRef, Component} from '@angular/core';
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
import {SendToOtpCodeButtonComponent} from "../components/send-to-otp-code-button.component";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";

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
    BigRedButtonComponent
  ],
  template: `
    <form *ngIf="!tokenGenerated"  [formGroup]="formByPhone">
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
            <input matInput formControlName="number" appPhoneMask>
            <mat-hint *ngIf="formByPhone.controls['number'].touched">введите номер телефона</mat-hint>
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <mat-form-field appearance="fill">
            <input matInput formControlName="password" type="password">
            <mat-error *ngIf="formByPhone.controls['password'].invalid">введите пароль
            </mat-error>
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <bitruby-big-red-button-component
            [form]="formByPhone"
            [text]="'Продолжить'"
            (outputAction)="generateOtpCode()"
        ></bitruby-big-red-button-component>
      </div>
    </form>
    <form *ngIf="tokenGenerated" [formGroup]="otpForm">
      <div class="row mt-2">
        <bitruby-send-to-otp-code-button
            [text]="'Код отправлен на номер '+formByPhone.value['countryCode']+formByPhone.value['number']"
            (buttonClicked)="returnToFormHandler($event)"
        >
          
        </bitruby-send-to-otp-code-button>
      </div>
      <div class="row mt-2">
        <div class="col-md-12">
          <mat-form-field appearance="fill">
            <input matInput formControlName="otp">
            <mat-hint *ngIf="otpForm.controls['otp'].touched">введите OTP код</mat-hint>
          </mat-form-field>
        </div>
      </div>
      <div class="row">
        <bitruby-big-red-button-component
            [form]="otpForm"
            [text]="'Войти'"
            (outputAction)="login()"
        ></bitruby-big-red-button-component>
      </div>
    </form>
  `,
  styles: [`
  `]
})
export class LoginByPhoneComponent {
  formByPhone!: FormGroup;
  otpForm!: FormGroup;
  tokenGenerated = false;

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
      private otpService: OtpService
  ) {
    this.formByPhone = this.fb.group({
      countryCode: new FormControl(this.countryCodes.at(0)?.dialCode, Validators.required),
      number: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required),
    });
    this.otpForm = this.fb.group({
      otp: new FormControl(undefined, Validators.required)
    })
  }

  login() {
    const arrayOtp = this.otpForm.controls['otp'] as FormArray<FormControl>
    this.loginService.login(
        this.formByPhone.value.countryCode + this.formByPhone.value.number,
        this.formByPhone.value.password,
        GrantType.PhonePassword,
        arrayOtp.controls.map(control => control.value).join('')
        )
  }

  generateOtpCode(): void {
    const number = (this.formByPhone.value.number as string).replace("(", "").replace(")", "").replace("*", "").replace(" ", "").replace(" ", "")

    this.otpService.generateOtpCodeForLogin({body: {
        grant_type: GrantType.EmailPassword,
        sendTo: this.formByPhone.value.countryCode + number
      }}).subscribe({
      next: value => {
        this.tokenGenerated = true;
      }
    })
  }

  returnToFormHandler($event: void) {
    this.tokenGenerated = false;

  }
}

interface CountryCode {
  name: string;
  dialCode: string;
}
