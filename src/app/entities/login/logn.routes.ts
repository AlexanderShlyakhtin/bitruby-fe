import {Routes} from '@angular/router';
import {LoginComponent} from "./login.component";
import {LoginRegistrationTemplateComponent} from "../../shared/components/login-registration-template.component";

export const routes: Routes = [
    {
        path: '',
        component: LoginRegistrationTemplateComponent,
        children: [
            {
                path: '',
                component: LoginComponent
            }
        ]
    }
];
