import {ChangeDetectorRef, Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatFormFieldModule, MatHint, MatSuffix} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatInput, MatInputModule} from "@angular/material/input";

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
        ReactiveFormsModule
    ],
    template: `
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5">
            Picture
          </div>
          <div class="col-md-7 login-form-bg">
            <div class="login-form-container">
              <div class="login-form">
                <div class="row">
                  <div class="col-md-3">
                    <h5>{{ mapLabels['title'] }}</h5>
                  </div>
                  <div class="col-md-7"></div>
                  <div class="col-md-1">
                    <button mat-button (click)="goToLanding()">
                      <mat-icon matIconSuffix>clear</mat-icon>
                    </button>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-2">
                  </div>
                  <div class="col-md-4">
                    <button mat-button (click)="toggleLoginByPhone()">
                      <div *ngIf="this.loginByPhone">
                        <strong>
                          {{ mapLabels['login-by-phone'] }}
                        </strong>
                      </div>
                      <div *ngIf="this.loginByEmail">
                        {{ mapLabels['login-by-phone'] }}
                      </div>
                    </button>
                  </div>
                  <div class="col-md-4">
                    <button mat-button (click)="toggleLoginByEmail()">
                      <div *ngIf="this.loginByEmail;">
                        <strong>
                          {{ mapLabels['login-by-email'] }}
                        </strong>
                      </div>
                      <div *ngIf="this.loginByPhone">
                        {{ mapLabels['login-by-email'] }}
                      </div>
                    </button>
                  </div>
                </div>

                <div *ngIf="loginByPhone">
                  <form [formGroup]="formByPhone">
                    <div class="row mt-2">
                      <div class="col-md-2">
                        <mat-form-field appearance="fill">
                          <input matInput formControlName="codeNumber">
                        </mat-form-field>
                      </div>
                      <div class="col-md-8">
                        <mat-form-field appearance="fill">
                          <input matInput formControlName="number">
                          <mat-hint>введите номер</mat-hint>
                        </mat-form-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-10">
                        <mat-form-field appearance="fill">
                          <input matInput formControlName="password">
                          <mat-error *ngIf="formByPhone.controls['password'].invalid">введите пароль
                          </mat-error>
                        </mat-form-field>
                      </div>
                    </div>
                  </form>
                </div>
                
                <div *ngIf="formByEmail">
                  <form [formGroup]="formByEmail">
                    <div class="row mt-2">
                      <div class="col-md-10">
                        <mat-form-field appearance="fill">
                          <input matInput formControlName="email">
                          <mat-hint>введите email</mat-hint>
                        </mat-form-field>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-10">
                        <mat-form-field appearance="fill">
                          <input matInput formControlName="password">
                          <mat-error *ngIf="formByPhone.controls['password'].invalid">введите пароль
                          </mat-error>
                        </mat-form-field>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="row">
                <button mat-button>У меня еще нет аккаунта</button>
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
        }

        .login-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .login-form {
            width: 480px;
            height: 562px;
            background-color: #ffffff;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        mat-form-field {
          width: 100%;
        }
    `]
})
export class LoginComponent {

    mapLabels = {
        title: 'Вход',
        'login-by-phone': 'по телефону',
        'login-by-email': 'по email'
    }

    loginByPhone = true;
    loginByEmail = false;
    formByPhone!: FormGroup;
    formByEmail!: FormGroup;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cd: ChangeDetectorRef
    ) {
        this.formByPhone = this.fb.group({
            codeNumber: new FormControl(undefined, Validators.required),
            number: new FormControl(undefined, Validators.required),
            password: new FormControl(undefined, Validators.required),
        });
        this.formByEmail = this.fb.group({
            email: new FormControl(undefined, [Validators.required, Validators.email]),
            password: new FormControl(undefined, Validators.required),
        });
    }

    toggleLoginByPhone(): void {
      this.loginByEmail = false;
      this.loginByPhone = true;
      this.cd.detectChanges()
    }

    toggleLoginByEmail(): void {
        this.loginByEmail = true;
        this.loginByPhone = false;
        this.cd.detectChanges()
    }

    goToLanding() {
        this.router.navigate(['/'])
    }
}
