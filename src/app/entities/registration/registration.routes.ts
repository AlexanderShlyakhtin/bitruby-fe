import {Routes} from '@angular/router';
import {RegistrationComponent} from "./registration.component";
import {LoginRegistrationTemplateComponent} from "../../shared/components/login-registration-template.component";

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
