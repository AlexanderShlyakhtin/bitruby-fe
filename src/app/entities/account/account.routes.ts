import {Routes} from '@angular/router';
import {AccountComponent} from "./account.component";
import {authGuard} from "../../core/guards/auth.guard";

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


];
