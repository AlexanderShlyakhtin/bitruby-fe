import {Routes} from '@angular/router';
import {RegistrationComponent} from "./registration.component";
import {LoginRegistrationTemplateComponent} from "../../shared/components/login-registration-template.component";
import {LoginComponent} from "../login/login.component";

export const routes: Routes = [
    {
        path: '',
        component: LoginRegistrationTemplateComponent,
        children: [
            {
                path: '',
                component: RegistrationComponent
            }
        ]
    }
];
