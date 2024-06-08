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
        path: 'playground',
        loadChildren: () => import('./playground/playground.module').then(m => m.PlaygroundModule),
    },


];
