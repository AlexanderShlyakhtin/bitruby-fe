import {Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from "@angular/core";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PATTERN_ONY_NUMBERS} from "../../app.constants";

@Component({
    selector: 'bitruby-mat-input-otp',
    imports: [
        ReactiveFormsModule,
        NgClass,
        MatFormFieldModule,
        NgForOf,
        MatInputModule
    ],
    standalone: true,
    template: `
        <h5>
            {{ title }}
        </h5>
        <form [formGroup]="form" class="otp-form">
            <div formArrayName="otp" class="otp-inputs">
                <div *ngFor="let control of otpControls.controls; let i = index">
                    <mat-form-field class="otp-input" [ngClass]="{'gap-after': i === 2}">
                        <input
                                #otpInput
                                matInput
                                maxlength="1"
                                [formControlName]="i"
                                (keyup)="onKeyUp($event, i)"
                                (paste)="onPaste($event)"
                                [attr.autocomplete]="i === 0 ? 'one-time-code' : 'off'"
                        >
                    </mat-form-field>
                </div>
            </div>
        </form>
    
    `,
    styles: [`

        .otp-form {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .otp-inputs {
            display: flex;
            gap: 14px; /* Adjust the spacing between the input fields */
        }

        .otp-input {
            width: 40px; /* Adjust the width of each input field */
        }

        .gap-after {
            margin-right: 40px; /* Add a larger gap after the third input */
        }
    `]
})
export class OtpInputComponent implements OnInit {

    @Input()
    form!: FormGroup

    @Input()
    title!: string

    @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

    @Output()
    otpCompleted: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.form.addControl('otp', this.fb.array(this.createOtpControls()))
    }

    createOtpControls(): FormControl[] {
        return Array(6).fill('').map(() => new FormControl('', [Validators.required, Validators.pattern(PATTERN_ONY_NUMBERS)]));
    }

    onKeyUp(event: KeyboardEvent, index: number): void {
        const input = event.target as HTMLInputElement;
        if (input.value.length === 1 && index < 5) {
            const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
            if (nextInput) {
                nextInput.focus();
            }
        }
        if (this.isOtpComplete() && this.form.valid) {
            this.otpCompleted.emit();
        }
    }

    get otpControls(): FormArray {
        return this.form.get('otp') as FormArray;
    }

    onPaste(event: ClipboardEvent): void {
        event.preventDefault();
        const clipboardData = event.clipboardData || (window as any).clipboardData;
        const pastedText = clipboardData.getData('text');

        if (pastedText.length === 6) {
            pastedText.split('').forEach((char: any, index: any) => {
                if (index < this.otpControls.length) {
                    this.otpControls.at(index).setValue(char);
                }
            });
            // Focus the next input element after the last one
            const nextInput = this.otpInputs.toArray()[Math.min(pastedText.length, this.otpControls.length) - 1].nativeElement;
            if (nextInput) {
                nextInput.focus();
            }

            if (this.isOtpComplete() && this.form.valid) {
                this.otpCompleted.emit();
            }
        }
    }

    isOtpComplete(): boolean {
        return this.otpControls.controls.every(control => control.value.length === 1);
    }


}
