import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {v4 as uuidv4} from "uuid";
import {UserForm} from "../../../core/api/v1/users/models/user-form";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgClass, NgIf} from "@angular/common";
import {BigRedButtonComponent} from "../../../shared/buttons/big-red-button.component";
import {VerificationStatus} from "../../../core/api/v1/users/models/verification-status";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {PipeModule} from "../../../shared/pipe/pipe.module";
import {VerificationService} from "../../../core/api/v1/users/services/verification.service";

@Component({
  selector: 'bitruby-init-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    BigRedButtonComponent,
    MatTooltipModule,
    MatChipsModule,
    PipeModule,
    NgClass
  ],
  template: `
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card p-4">
            <h2>{{ mapLabels['title'] }}</h2>
            <form [formGroup]="form">
              <div class="form-group mt-4">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ mapLabels['firstName'] }}</mat-label>
                  <input matInput formControlName="firstName" type="text">
                </mat-form-field>
              </div>
              <div class="form-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ mapLabels['lastName'] }}</mat-label>
                  <input matInput formControlName="lastName" type="text">
                </mat-form-field>
              </div>
              <div class="form-group">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>{{ mapLabels['address'] }}</mat-label>
                  <input matInput formControlName="address" type="text">
                </mat-form-field>
              </div>
              <div *ngIf="!verificationSession" class="text-center mt-4">
                <bitruby-big-red-button-component
                    [diasble]="form.invalid"
                    [text]="'Продолжить'"
                    (outputAction)="applyUserForm()">
                </bitruby-big-red-button-component>
              </div>
            </form>
            <div *ngIf="verificationSession" class="text-center mt-2">
              <mat-chip
                  class="status-badge"
                  [matTooltip]="statusTooltip[verificationSession.status]"
                  [ngClass]="{'clickable': isClickable(verificationSession.status)}"
                  [disabled]="!isClickable(verificationSession.status)"
                  (click)="navigateToVerification()">
                {{ verificationSession.status | statusTranslate }}
              </mat-chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 100%;
    }
    .full-width {
      width: 100%;
    }
    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .status-badge {
      display: inline-block;
      padding: 0 0;
      border-radius: 16px;
      background-color: #007bff;
      color: white;
      font-size: 16px;
      margin-right: 8px;
      cursor: default;
    }
    .status-badge.clickable {
      cursor: pointer;
      background: #E4002B;
        
    }
  `]
})
export class WelcomeFormComponent implements OnInit {
  mapLabels = {
    title: 'Верификация',
    firstName: 'Имя',
    lastName: 'Фамилия',
    address: 'Адрес',
    verificationUrl: 'Ссылка для верификации',
  };

  form!: FormGroup;
  userForm!: UserForm;
  verificationSession!: { url: string; status: VerificationStatus } | null;

  statusTooltip = {
    [VerificationStatus.WaitingForStart]: 'Нажмите для начала верификации',
    [VerificationStatus.Started]: 'Ожидание прохождения верификации',
    [VerificationStatus.WaitingForReview]: 'Верификация на рассмотрении',
    [VerificationStatus.WaitingForResubmission]: 'Пройдите верификацию повторно',
    [VerificationStatus.FlowFinishedSuccess]: 'Верификация пройдена',
    [VerificationStatus.FlowFinishedRejected]: 'Верификация отклонена. Обратитесь в службу поддержки',
    [VerificationStatus.FlowFinishedError]: 'Ошибка верификации. Обратитесь в службу поддержки'
  };

  constructor(
      private fb: FormBuilder,
      private verificationService: VerificationService
  ) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getUserSession();
  }

  getUserSession(): void {
    this.verificationService.getUserVerificationData({ "x-request-id": uuidv4() })
        .subscribe({
          next: value => {
            this.userForm = value.user;
            this.form.patchValue(value.user);
            if (value.user) {
              this.form.disable();
            }
            this.verificationSession = value.verificationSession;
          }
        });
  }

  applyUserForm(): void {
    if (this.form.invalid) return;

    this.verificationService.applyUserForm({
      "x-request-id": uuidv4(),
      body: this.form.value
    })
        .subscribe({
          next: () => this.getUserSession()
        });
  }

  isClickable(status: VerificationStatus): boolean {
    return status === VerificationStatus.WaitingForStart || status === VerificationStatus.WaitingForResubmission;
  }

  navigateToVerification(): void {
    if (this.verificationSession && this.isClickable(this.verificationSession.status)) {
      window.open(this.verificationSession.url, '_blank');
    }
  }
}
