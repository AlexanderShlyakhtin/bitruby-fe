import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'bitruby-login-by-qr',
  standalone: true,
  imports: [
    MatButton,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
  ],
  template: `
    <mat-horizontal-stepper [linear]="true" #stepper>
      <mat-step [stepControl]="firstFormGroup">
        <form [formGroup]="firstFormGroup">
          <ng-template matStepLabel>Step 1</ng-template>
          <div>
            <mat-form-field>
              <mat-label>First Step Input</mat-label>
              <input matInput formControlName="firstCtrl" required>
            </mat-form-field>
          </div>
          <div>
            <button mat-button matStepperNext [disabled]="!firstFormGroup.valid">Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup">
        <form [formGroup]="secondFormGroup">
          <ng-template matStepLabel>Step 2</ng-template>
          <div>
            <mat-form-field>
              <mat-label>Second Step Input</mat-label>
              <input matInput formControlName="secondCtrl" required>
            </mat-form-field>
          </div>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext [disabled]="!secondFormGroup.valid">Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Step 3</ng-template>
        <div>
          <p>You are now done.</p>
        </div>
        <div>
          <button mat-button matStepperPrevious>Back</button>
          <button mat-button (click)="stepper.reset()">Reset</button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `,
  styles: [`

  `]
})
export class LoginByQrComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  @Output()
  otpCodeRequested: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
