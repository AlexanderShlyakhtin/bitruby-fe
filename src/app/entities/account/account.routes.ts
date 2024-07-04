import {Routes} from '@angular/router';
import {AccountComponent} from "./account.component";
import {authGuard} from "../../core/guards/auth.guard";
import {WelcomeFormComponent} from "./form/welcome-form.component";

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: AccountComponent
            },
        ]
    },
    {
        path: 'welcome',
        component: WelcomeFormComponent
    }


];
