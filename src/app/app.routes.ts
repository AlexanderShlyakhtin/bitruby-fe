import {Routes} from '@angular/router';
import {userAccountStatusGuard} from "./core/guards/user-account-status.guard";
import {userAccountLevelGuard} from "./core/guards/user-account-level.guard";

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./entities/main/main.module').then(m => m.MainModule),
    },
    {
        path: 'login',
        loadChildren: () => import('./entities/login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'registration',
        loadChildren: () => import('./entities/registration/registration.module').then(m => m.RegistrationModule),
    },
    {
        path: 'restore-password',
        loadChildren: () => import('./entities/restore-password/restore-password.module').then(m => m.RestorePasswordModule),
    },
    {
        path: 'account',
        loadChildren: () => import('./entities/account/account.module').then(m => m.AccountModule),
        canActivate: [ userAccountStatusGuard ]
    },
    {
        path: 'welcome',
        loadChildren: () => import('./entities/welcome/welcome.module').then(m => m.WelcomeModule),
        canActivate: [ userAccountLevelGuard ]
    },
    {
        path: 'info',
        loadChildren: () => import('./entities/info/info.module').then(m => m.InfoModule),
    },
    {
        path: 'playground',
        loadChildren: () => import('./playground/playground.module').then(m => m.PlaygroundModule),
    },


];
