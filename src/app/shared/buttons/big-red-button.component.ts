import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'bitruby-big-red-button-component',
    template: `
        <div class="command-panel">
            <button mat-flat-button class="w-100" color="warn" [disabled]="form?.invalid"
                    (click)="outputAction.emit()">{{ text }}
            </button>
        </div>`,
    standalone: true,
    imports: [
        MatButton
    ],
    styles: [`
        .command-panel button {
            border-radius: 8rem;
            background: #E4002B;
            color: white;
        }
    `]
})
export class BigRedButtonComponent {

    @Output()
    outputAction: EventEmitter<void> = new EventEmitter<void>()

    @Input()
    form: FormGroup | undefined;

    @Input()
    text!: string

}
