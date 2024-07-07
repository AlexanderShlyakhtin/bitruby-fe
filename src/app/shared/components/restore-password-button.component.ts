import {Component} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";


@Component({
    selector: 'bitruby-restore-password-button',
    standalone: true,
    imports: [
        MatButton,
        NgIf
    ],
    template: `
        <div class="col-md-12">
            <button mat-button (click)="goToRestorePassword()">Восстановить пароль</button>
        </div>
    `,
    styles: [``]
})
export class RestorePasswordButtonComponent {

    constructor(
        private router: Router
    ) {
    }

    goToRestorePassword(): void {
        this.router.navigate(['/restore-password'])
    }

}
