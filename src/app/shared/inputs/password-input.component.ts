import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
    selector: 'bitruby-mat-input-password',
    template: `
        <mat-form-field appearance="fill">
            <input matInput [formControl]="formControl" [type]="getInputType()" [placeholder]="placeholder">
            <mat-icon matSuffix (click)="changeVisibility()">{{ getVisibility() }}</mat-icon>
            <mat-error *ngIf="formControl.hasError('minlength')">пароль должен быть больше 8 символов</mat-error>
        </mat-form-field>
    `,
    styles: [`
        /* Add your styles here */
    `],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PasswordInputComponent),
        multi: true
    }],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgClass,
        MatFormFieldModule,
        NgForOf,
        MatInputModule,
        MatIconModule,
        NgIf
    ]
})
export class PasswordInputComponent implements ControlValueAccessor {
    @Input()
    formControl!: FormControl;

    @Input()
    placeholder = 'password';

    pwdHide1 = true;

    private onChange = (value: any) => {
        value
    };
    private onTouched = () => {};

    changeVisibility() {
        this.pwdHide1 = !this.pwdHide1;
    }

    getVisibility() {
        return this.pwdHide1 ? 'visibility_off' : 'visibility';
    }

    getInputType() {
        return this.pwdHide1 ? 'password' : 'text';
    }

    writeValue(value: any): void {
        if (this.formControl) {
            this.formControl.setValue(value);
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        if (this.formControl) {
            if (isDisabled) {
                this.formControl.disable();
            } else {
                this.formControl.enable();
            }
        }
    }
}
