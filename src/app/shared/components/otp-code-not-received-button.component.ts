import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatIcon} from "@angular/material/icon";
import {MatPrefix} from "@angular/material/form-field";


@Component({
    selector: 'bitruby-otp-code-not-received-button',
    standalone: true,
    template: `
        <div class="otp-code-not-received-button-container">
            <button (click)="buttonClicked.emit()" class="otp-code-not-received-button"  >
                <mat-icon matPrefix>info</mat-icon>
                <span class="button-text">
                <p>{{ text }}</p>
            </span>
                
            </button>
            
        </div>
    `,
    imports: [
        MatIcon,
        MatPrefix
    ],
    styles: [`
        .otp-code-not-received-button-container {
            display: flex;
            align-items: center;
        }

        .otp-code-not-received-button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            margin-right: 10px; /* Adjust as needed to space the text */
        }

        .otp-code-not-received-button mat-icon {
            color: #000000; /* Change arrow color if needed */
        }

        .button-text {
            font-size: 16px; /* Adjust font size as needed */
            color: #000000; /* Change text color if needed */
        }
        
        :host p {
            margin-bottom: 0;
        }
    `]
})
export class OtpCodeNotReceivedButtonComponent {

    @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    text!: string

}
