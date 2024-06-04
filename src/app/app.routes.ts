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


];
