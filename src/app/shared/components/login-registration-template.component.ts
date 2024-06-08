import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from "@angular/core";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router, RouterOutlet} from "@angular/router";
import {MatSuffix} from "@angular/material/form-field";

@Component({
    selector: 'bitruby-login-registration-template',
    standalone: true,
    imports: [
        MatButton,
        RouterOutlet,
        MatSuffix
    ],
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-5">
                    Picture
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
        .login-form-bg {
            background-color: #EEEFF2;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh; /* Full height to center vertically */
            position: relative; /* Needed for positioning the close button */
        }

        .login-form-container {
            display: flex;
            flex-direction: column; /* Align items vertically */
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .login-close-button {
            position: absolute; /* Position close button absolutely within container */
            top: 10px; /* Adjust as necessary */
            right: 10px; /* Adjust as necessary */
        }

        .login-form {
            width: 480px;
            height: 562px;
            background-color: #ffffff;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .button-container {
            margin-top: 10px; /* Add margin to create space between form and button */
            text-align: center; /* Center the button */
        }
        `]
})
export class BigRedButtonComponent {

    constructor(
        private router: Router,
    ) {
    }


    goToLanding() {
        this.router.navigate(['/'])
    }

}
