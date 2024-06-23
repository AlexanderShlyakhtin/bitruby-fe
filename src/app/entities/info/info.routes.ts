import {Routes} from '@angular/router';
import {UseTermsComponent} from "./use-terms/use-terms.component";
import {PrivacyTermsComponent} from "./privacy-terms/privacy-terms.component";

export const routes: Routes = [
    {
        path: 'use-terms',
        component: UseTermsComponent
    },
    {
        path: 'privacy-terms',
        component: PrivacyTermsComponent
    }

];
