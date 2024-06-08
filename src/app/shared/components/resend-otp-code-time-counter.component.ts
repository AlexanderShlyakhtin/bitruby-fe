import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {interval, Subscription} from "rxjs";


@Component({
    selector: 'bitruby-resend-otp-code-time-counter',
    standalone: true,
    imports: [
        MatButton,
        NgIf
    ],
    template: `
        <div *ngIf="countdown > 0">
            {{ textBefore }} {{ countdown }} {{ textAfter }}
        </div>
        <div class="col-md-12" *ngIf="countdown === 0">
            <button mat-button (click)="resendOtpCode()">Отправить еще раз</button>
        </div>
    `,
    styles: [``]
})
export class ResendOtpCodeTimeCounterComponent implements OnInit {

    @Output()
    buttonClicked: EventEmitter<void> = new EventEmitter<void>();

    @Input()
    textBefore: string | null = 'Отправить еще через';

    @Input()
    textAfter: string | null = 'сек';

    countdown: number = 30;
    countdownSubscription!: Subscription;

    ngOnInit(): void {
        this.startCountdown();
    }

    resendOtpCode() {
        this.buttonClicked.emit();
        this.countdown = 30;
        this.startCountdown();
    }

    startCountdown() {
        this.countdownSubscription = interval(1000).subscribe(() => {
            if (this.countdown > 0) {
                this.countdown--;
            } else {
                this.countdownSubscription.unsubscribe();
            }
        });
    }



}
