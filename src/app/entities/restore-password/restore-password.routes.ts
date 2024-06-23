import {Routes} from '@angular/router';
import {LoginRegistrationTemplateComponent} from "../../shared/components/login-registration-template.component";
import {RestorePasswordComponent} from "./restore-password.component";

export const routes: Routes = [
    {
        path: '',
        component: LoginRegistrationTemplateComponent,
        children: [
            {
                path: '',
                component: RestorePasswordComponent
            }
        ]
    }
];
