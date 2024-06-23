import {Component} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {MatSuffix} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../shared.module";

@Component({
    selector: 'bitruby-login-registration-template',
    standalone: true,
    imports: [
        MatButton,
        RouterOutlet,
        MatSuffix,
        MatIconModule,
        SharedModule
    ],
    template: `
        <bitruby-logo></bitruby-logo>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-5 bitruby-big-logo-image">
                    <img src="assets/content/images/img.png" alt="App Big Logo">
                </div>
                <div class="col-md-7 login-form-bg">
                    <div class="login-close-button">
                        <button mat-button (click)="goToLanding()">
                            <mat-icon matIconSuffix>clear</mat-icon>
                        </button>
                    </div>
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .bitruby-big-logo-image {
            justify-content: center;
            align-content: center;
            background: #4C1C67;
        }
        .login-form-bg {
            background-color: #EEEFF2;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh; /* Full height to center vertically */
            position: relative; /* Needed for positioning the close button */
        }
        
        .login-close-button {
            position: absolute; /* Position close button absolutely within container */
            top: 10px; /* Adjust as necessary */
            right: 10px; /* Adjust as necessary */
        }
        
        `]
})
export class LoginRegistrationTemplateComponent {

    constructor(
        private router: Router,
    ) {
    }


    goToLanding() {
        this.router.navigate(['/'])
    }

}
