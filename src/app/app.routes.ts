import {Routes} from '@angular/router';

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
        path: 'account',
        loadChildren: () => import('./entities/account/account.module').then(m => m.AccountModule),
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
