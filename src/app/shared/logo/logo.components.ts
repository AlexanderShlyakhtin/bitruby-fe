
import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'bitruby-logo',
    template: `
        <img src="assets/content/images/logo.png"  alt="App Logo" class="app-logo" (click)="goToMainPage()">
    `,
    styles: [`
        .app-logo {
            width: 126px;
            height: 50px;
            position: absolute;
            top: 8px;
            left: 40px;
            gap: 0px;
        }
    
    `]
})
export class LogoComponent {
    constructor(
        private router: Router
    ) {
    }

    goToMainPage(): void {
        this.router.navigate(['/'])
    }
}
