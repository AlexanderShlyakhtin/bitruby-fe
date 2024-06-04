import {Routes} from '@angular/router';
import {MainComponent} from "./main.component";
import {LandingComponent} from "../landing/landing.component";

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: LandingComponent
            }
        ]
    },
];
