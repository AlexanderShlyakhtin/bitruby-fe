import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatIcon} from "@angular/material/icon";


@Component({
    selector: 'bitruby-send-to-otp-code-button',
    standalone: true,
    template: `
        <div class="custom-button-container">
            <button class="ellipse-button" (click)="buttonClicked.emit()">
                <mat-icon>arrow_back</mat-icon>
            </button>
            <span class="button-text">
                <p>{{ text }}</p>
                <p>{{ sendTo }}</p>
            </span>
        </div>
    `,
    imports: [
        MatIcon
    ],
    styles: [`
        .custom-button-container {
            display: flex;
            align-items: center;
        }

        .ellipse-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f0f0;
            border: none;
            cursor: pointer;
            margin-right: 10px; /* Adjust as needed to space the text */
        }

        .ellipse-button mat-icon {
            color: #000000; /* Change arrow color if needed */
        }

        .button-text {
            font-size: 16px; /* Adjust font size as needed */
            color: #000000; /* Change text color if needed */
        }
    `]
})
export class SendToOtpCodeButtonComponent {

    @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();


    @Input()
    text!: string

    @Input()
    sendTo!: string

    @Input()
    type!: 'number' | 'email'

}
